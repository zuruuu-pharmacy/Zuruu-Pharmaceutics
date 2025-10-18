"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, FlaskConical, Heart, Zap, TrendingUp } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'drug' | 'disease' | 'mechanism' | 'interaction';
  description: string;
  relevance: number;
  source: string;
}

export function SmartSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches] = useState([
    'Metformin mechanism of action',
    'Diabetes management guidelines',
    'CYP3A4 inhibitors',
    'Drug interactions with warfarin',
    'Hypertension treatment protocols'
  ]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate AI search
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Metformin',
          type: 'drug',
          description: 'Biguanide antidiabetic medication that decreases hepatic glucose production and intestinal glucose absorption',
          relevance: 95,
          source: 'DrugBank Database'
        },
        {
          id: '2',
          title: 'Type 2 Diabetes Mellitus',
          type: 'disease',
          description: 'Chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency',
          relevance: 88,
          source: 'Medical Encyclopedia'
        },
        {
          id: '3',
          title: 'AMPK Activation',
          type: 'mechanism',
          description: 'Mechanism by which metformin activates AMP-activated protein kinase to improve glucose uptake',
          relevance: 82,
          source: 'Pharmacology Research'
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drug': return <FlaskConical className="w-4 h-4" />;
      case 'disease': return <Heart className="w-4 h-4" />;
      case 'mechanism': return <Zap className="w-4 h-4" />;
      case 'interaction': return <TrendingUp className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'drug': return 'bg-blue-100 text-blue-800';
      case 'disease': return 'bg-red-100 text-red-800';
      case 'mechanism': return 'bg-green-100 text-green-800';
      case 'interaction': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center space-x-3">
        <Search className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Search</h2>
          <p className="text-gray-600">AI-powered search for medical terms and concepts</p>
        </div>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search for drugs, diseases, mechanisms, or any medical term..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <button
              onClick={() => handleSearch(searchQuery)}
              disabled={isSearching}
              className="absolute right-3 top-2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Recent Searches */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Searches</h4>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    handleSearch(search);
                  }}
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">AI Suggestions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Drug interactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Mechanism of action</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Side effects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Dosage guidelines</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <motion.div
                key={result.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(result.type)}
                    <h4 className="font-medium text-gray-900">{result.title}</h4>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${result.relevance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{result.relevance}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                <p className="text-xs text-gray-500">Source: {result.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access Tools */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <FlaskConical className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Drug Database</span>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-red-50 transition-colors">
            <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Disease Info</span>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-green-50 transition-colors">
            <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Mechanisms</span>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Interactions</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmartSearch;
