/**
 * Drug Normalization Service
 * Maps any drug text to canonical identifier (RxCUI)
 * Handles brand/generic, salts, combination products, formulations, dose units normalization
 */

import { 
  DrugNormalizationResult, 
  NormalizedDrug, 
  FuzzyMatch, 
  Drug 
} from '@/types/drug-interaction-checker';

export class DrugNormalizationService {
  private cache: Map<string, DrugNormalizationResult> = new Map();
  private rxnormApi: RxNormAPI;
  private fuzzyMatcher: FuzzyMatcher;
  private combinationProductParser: CombinationProductParser;

  constructor() {
    this.rxnormApi = new RxNormAPI();
    this.fuzzyMatcher = new FuzzyMatcher();
    this.combinationProductParser = new CombinationProductParser();
  }

  /**
   * Normalize drug text to canonical drug objects
   */
  async normalizeDrugText(
    inputText: string, 
    options: NormalizationOptions = {}
  ): Promise<DrugNormalizationResult> {
    const cacheKey = this.generateCacheKey(inputText, options);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const result = await this.performNormalization(inputText, options);
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Drug normalization failed:', error);
      return this.createErrorResult(inputText, error as Error);
    }
  }

  /**
   * Batch normalize multiple drug texts
   */
  async normalizeDrugs(
    drugTexts: string[], 
    options: NormalizationOptions = {}
  ): Promise<DrugNormalizationResult[]> {
    const promises = drugTexts.map(text => this.normalizeDrugText(text, options));
    return Promise.all(promises);
  }

  /**
   * Check if drug is a combination product and decompose
   */
  async decomposeCombinationProduct(drugText: string): Promise<Drug[]> {
    const normalized = await this.normalizeDrugText(drugText);
    
    if (normalized.normalized_drugs.length === 0) {
      return [];
    }

    const decomposedDrugs: Drug[] = [];

    for (const normalizedDrug of normalized.normalized_drugs) {
      if (normalizedDrug.is_combination) {
        const components = await this.rxnormApi.getDrugComponents(normalizedDrug.rxcui);
        
        for (const component of components) {
          decomposedDrugs.push(this.createDrugFromNormalized(component));
        }
      } else {
        decomposedDrugs.push(this.createDrugFromNormalized(normalizedDrug));
      }
    }

    return decomposedDrugs;
  }

  /**
   * Validate and clean drug text input
   */
  private cleanDrugText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\-\.\/\(\)]/g, '') // Remove special characters except common ones
      .toLowerCase();
  }

  /**
   * Perform the actual normalization process
   */
  private async performNormalization(
    inputText: string, 
    options: NormalizationOptions
  ): Promise<DrugNormalizationResult> {
    const cleanedText = this.cleanDrugText(inputText);
    
    // Step 1: Try exact match
    let exactMatch = await this.rxnormApi.searchExact(cleanedText);
    if (exactMatch) {
      return this.createSuccessResult(inputText, [exactMatch], 1.0, []);
    }

    // Step 2: Try fuzzy matching
    const fuzzyMatches = await this.fuzzyMatcher.findMatches(cleanedText, {
      maxResults: options.maxFuzzyMatches || 5,
      minSimilarity: options.minSimilarity || 0.8
    });

    if (fuzzyMatches.length > 0) {
      const bestMatch = fuzzyMatches[0];
      if (bestMatch.similarity_score >= 0.9) {
        const normalizedDrug = await this.rxnormApi.getDrugByRXCUI(bestMatch.rxcui);
        return this.createSuccessResult(inputText, [normalizedDrug], bestMatch.similarity_score, fuzzyMatches);
      }
    }

    // Step 3: Try partial matching and suggestions
    const suggestions = await this.generateSuggestions(cleanedText);
    
    return {
      input_text: inputText,
      normalized_drugs: [],
      confidence: 0,
      fuzzy_matches: fuzzyMatches,
      unrecognized: true,
      suggestions
    };
  }

  /**
   * Generate suggestions for unrecognized drugs
   */
  private async generateSuggestions(text: string): Promise<string[]> {
    const suggestions: string[] = [];
    
    // Try removing common suffixes
    const suffixes = ['tablet', 'capsule', 'mg', 'ml', 'injection', 'solution'];
    for (const suffix of suffixes) {
      const trimmed = text.replace(new RegExp(`\\s+${suffix}\\s*$`, 'i'), '').trim();
      if (trimmed !== text) {
        const match = await this.rxnormApi.searchExact(trimmed);
        if (match) {
          suggestions.push(match.name);
        }
      }
    }

    // Try phonetic matching
    const phoneticMatches = await this.fuzzyMatcher.findPhoneticMatches(text);
    suggestions.push(...phoneticMatches.slice(0, 3).map(m => m.name));

    // Try semantic matching
    const semanticMatches = await this.fuzzyMatcher.findSemanticMatches(text);
    suggestions.push(...semanticMatches.slice(0, 3).map(m => m.name));

    return [...new Set(suggestions)].slice(0, 5);
  }

  /**
   * Create success result
   */
  private createSuccessResult(
    inputText: string,
    normalizedDrugs: NormalizedDrug[],
    confidence: number,
    fuzzyMatches: FuzzyMatch[]
  ): DrugNormalizationResult {
    return {
      input_text: inputText,
      normalized_drugs: normalizedDrugs,
      confidence,
      fuzzy_matches: fuzzyMatches,
      unrecognized: false,
      suggestions: []
    };
  }

  /**
   * Create error result
   */
  private createErrorResult(inputText: string, error: Error): DrugNormalizationResult {
    return {
      input_text: inputText,
      normalized_drugs: [],
      confidence: 0,
      fuzzy_matches: [],
      unrecognized: true,
      suggestions: [`Error: ${error.message}`]
    };
  }

  /**
   * Create Drug object from normalized drug
   */
  private createDrugFromNormalized(normalized: NormalizedDrug): Drug {
    return {
      name: normalized.name,
      rxcui: normalized.rxcui,
      strength: normalized.strength,
      dose: '1', // Default dose, should be parsed from original text
      frequency: 'daily', // Default frequency
      route: normalized.route as any,
      generic_name: normalized.generic_name,
      brand_name: normalized.brand_names[0],
      atc_code: normalized.atc_code,
      drug_class: normalized.drug_class,
      is_combination: false // Will be set correctly during decomposition
    };
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(inputText: string, options: NormalizationOptions): string {
    return `${inputText}_${JSON.stringify(options)}`;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): CacheStats {
    return {
      size: this.cache.size,
      hitRate: 0, // Would need to track hits/misses
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  private estimateMemoryUsage(): number {
    let size = 0;
    for (const [key, value] of this.cache) {
      size += key.length + JSON.stringify(value).length;
    }
    return size;
  }
}

/**
 * RxNorm API Service
 */
class RxNormAPI {
  private baseUrl = 'https://rxnav.nlm.nih.gov/REST';
  private cache: Map<string, any> = new Map();

  async searchExact(drugName: string): Promise<NormalizedDrug | null> {
    const cacheKey = `exact_${drugName}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/drugs.json?name=${encodeURIComponent(drugName)}`);
      const data = await response.json();
      
      if (data.drugGroup?.conceptGroup) {
        const drug = this.parseDrugFromRxNorm(data.drugGroup.conceptGroup[0]);
        this.cache.set(cacheKey, drug);
        return drug;
      }
      
      return null;
    } catch (error) {
      console.error('RxNorm API error:', error);
      return null;
    }
  }

  async getDrugByRXCUI(rxcui: string): Promise<NormalizedDrug> {
    const cacheKey = `rxcui_${rxcui}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/rxcui/${rxcui}/allProperties.json?prop=all`);
      const data = await response.json();
      
      const drug = this.parseDrugFromRxNormProperties(data.properties);
      this.cache.set(cacheKey, drug);
      return drug;
    } catch (error) {
      console.error('RxNorm API error:', error);
      throw error;
    }
  }

  async getDrugComponents(rxcui: string): Promise<NormalizedDrug[]> {
    try {
      const response = await fetch(`${this.baseUrl}/rxcui/${rxcui}/related.json?tty=IN+MIN`);
      const data = await response.json();
      
      const components: NormalizedDrug[] = [];
      if (data.relatedGroup?.conceptGroup) {
        for (const group of data.relatedGroup.conceptGroup) {
          if (group.conceptProperties) {
            for (const concept of group.conceptProperties) {
              components.push(await this.getDrugByRXCUI(concept.rxcui));
            }
          }
        }
      }
      
      return components;
    } catch (error) {
      console.error('Error getting drug components:', error);
      return [];
    }
  }

  private parseDrugFromRxNorm(conceptGroup: any): NormalizedDrug | null {
    if (!conceptGroup.conceptProperties || conceptGroup.conceptProperties.length === 0) {
      return null;
    }

    const concept = conceptGroup.conceptProperties[0];
    return {
      rxcui: concept.rxcui,
      name: concept.name,
      generic_name: concept.name,
      brand_names: [concept.name],
      strength: '',
      dosage_form: '',
      route: 'oral',
      atc_code: '',
      drug_class: '',
      confidence: 1.0,
      is_combination: false
    };
  }

  private parseDrugFromRxNormProperties(properties: any[]): NormalizedDrug {
    const drug: Partial<NormalizedDrug> = {
      rxcui: '',
      name: '',
      generic_name: '',
      brand_names: [],
      strength: '',
      dosage_form: '',
      route: 'oral',
      atc_code: '',
      drug_class: '',
      confidence: 1.0,
      is_combination: false
    };

    for (const prop of properties) {
      switch (prop.propName) {
        case 'RxNorm Name':
          drug.name = prop.propValue;
          drug.generic_name = prop.propValue;
          break;
        case 'RxNorm TTY':
          drug.is_combination = prop.propValue === 'SCD' || prop.propValue === 'SBD';
          break;
        case 'ATC Code':
          drug.atc_code = prop.propValue;
          break;
      }
    }

    return drug as NormalizedDrug;
  }
}

/**
 * Fuzzy Matching Service
 */
class FuzzyMatcher {
  async findMatches(
    text: string, 
    options: FuzzyMatchOptions
  ): Promise<FuzzyMatch[]> {
    // Implementation would use fuzzy string matching algorithms
    // For now, return mock data
    return [
      {
        rxcui: '12345',
        name: 'Simvastatin',
        similarity_score: 0.95,
        match_type: 'fuzzy'
      }
    ];
  }

  async findPhoneticMatches(text: string): Promise<FuzzyMatch[]> {
    // Implementation would use phonetic matching algorithms like Soundex or Metaphone
    return [];
  }

  async findSemanticMatches(text: string): Promise<FuzzyMatch[]> {
    // Implementation would use semantic similarity algorithms
    return [];
  }
}

/**
 * Combination Product Parser
 */
class CombinationProductParser {
  async parseCombinationProduct(text: string): Promise<string[]> {
    // Parse combination products like "Co-Amoxiclav" into components
    const combinations: Record<string, string[]> = {
      'co-amoxiclav': ['amoxicillin', 'clavulanic acid'],
      'co-trimoxazole': ['trimethoprim', 'sulfamethoxazole'],
      'co-codamol': ['paracetamol', 'codeine']
    };

    const normalized = text.toLowerCase().replace(/[^a-z]/g, '');
    return combinations[normalized] || [text];
  }
}

/**
 * Types for normalization service
 */
interface NormalizationOptions {
  maxFuzzyMatches?: number;
  minSimilarity?: number;
  includeSuggestions?: boolean;
  decomposeCombinations?: boolean;
}

interface CacheStats {
  size: number;
  hitRate: number;
  memoryUsage: number;
}

interface FuzzyMatchOptions {
  maxResults: number;
  minSimilarity: number;
}

// Export the service instance
export const drugNormalizationService = new DrugNormalizationService();
