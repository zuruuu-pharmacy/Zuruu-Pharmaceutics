// AI Analytics Service for real-time data integration
export interface AdherenceData {
  date: string;
  taken: number;
  missed: number;
  adherence: number;
  medication: string;
}

export interface HealthMetrics {
  date: string;
  bloodPressure: { systolic: number; diastolic: number };
  glucose: number;
  weight: number;
  heartRate: number;
}

export interface RefillData {
  id: string;
  medication: string;
  date: string;
  status: 'completed' | 'late' | 'missed';
  delay: number;
  source: 'app' | 'manual' | 'in-person';
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'success' | 'info' | 'critical';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  action?: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  reason: string;
  applied: boolean;
  category: 'adherence' | 'refill' | 'health' | 'lifestyle';
  priority: 'low' | 'medium' | 'high';
}

export interface PatientKPIs {
  adherence: number;
  missedDoses: number;
  refillDelay: number;
  riskScore: 'Low' | 'Moderate' | 'High';
  healthTrend: 'improving' | 'stable' | 'declining';
}

class AIAnalyticsService {
  private baseUrl: string;
  private patientId: string;

  constructor(patientId: string) {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    this.patientId = patientId;
  }

  // Fetch real-time adherence data
  async getAdherenceData(timeframe: '7d' | '30d' | '90d'): Promise<AdherenceData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/adherence/${this.patientId}?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Failed to fetch adherence data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching adherence data:', error);
      // Return mock data as fallback
      return this.getMockAdherenceData(timeframe);
    }
  }

  // Fetch health metrics
  async getHealthMetrics(timeframe: '7d' | '30d' | '90d'): Promise<HealthMetrics[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/health/${this.patientId}?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Failed to fetch health metrics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching health metrics:', error);
      return this.getMockHealthMetrics(timeframe);
    }
  }

  // Fetch refill data
  async getRefillData(): Promise<RefillData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/refills/${this.patientId}`);
      if (!response.ok) throw new Error('Failed to fetch refill data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching refill data:', error);
      return this.getMockRefillData();
    }
  }

  // Fetch AI insights
  async getAIInsights(): Promise<AIInsight[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/insights/${this.patientId}`);
      if (!response.ok) throw new Error('Failed to fetch AI insights');
      return await response.json();
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      return this.getMockAIInsights();
    }
  }

  // Fetch AI recommendations
  async getAIRecommendations(): Promise<AIRecommendation[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/recommendations/${this.patientId}`);
      if (!response.ok) throw new Error('Failed to fetch AI recommendations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      return this.getMockAIRecommendations();
    }
  }

  // Get patient KPIs
  async getPatientKPIs(): Promise<PatientKPIs> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/kpis/${this.patientId}`);
      if (!response.ok) throw new Error('Failed to fetch patient KPIs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching patient KPIs:', error);
      return this.getMockPatientKPIs();
    }
  }

  // Apply AI recommendation
  async applyRecommendation(recommendationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/recommendations/${this.patientId}/${recommendationId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error applying recommendation:', error);
      return false;
    }
  }

  // Export analytics data
  async exportAnalytics(format: 'pdf' | 'csv' | 'json'): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/export/${this.patientId}?format=${format}`);
      if (!response.ok) throw new Error('Failed to export analytics');
      return await response.blob();
    } catch (error) {
      console.error('Error exporting analytics:', error);
      throw error;
    }
  }

  // Mock data methods for development/fallback
  private getMockAdherenceData(timeframe: string): AdherenceData[] {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const data: AdherenceData[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        taken: Math.floor(Math.random() * 3) + 1,
        missed: Math.random() > 0.8 ? 1 : 0,
        adherence: Math.floor(Math.random() * 40) + 60,
        medication: 'Metformin'
      });
    }
    
    return data;
  }

  private getMockHealthMetrics(timeframe: string): HealthMetrics[] {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const data: HealthMetrics[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        bloodPressure: {
          systolic: Math.floor(Math.random() * 30) + 120,
          diastolic: Math.floor(Math.random() * 20) + 75
        },
        glucose: Math.floor(Math.random() * 50) + 120,
        weight: Math.floor(Math.random() * 10) + 170,
        heartRate: Math.floor(Math.random() * 30) + 65
      });
    }
    
    return data;
  }

  private getMockRefillData(): RefillData[] {
    return [
      {
        id: '1',
        medication: 'Metformin',
        date: '2024-01-15',
        status: 'completed',
        delay: 0,
        source: 'app'
      },
      {
        id: '2',
        medication: 'Insulin',
        date: '2024-01-22',
        status: 'late',
        delay: 2,
        source: 'manual'
      },
      {
        id: '3',
        medication: 'Metformin',
        date: '2024-01-29',
        status: 'completed',
        delay: 0,
        source: 'app'
      },
      {
        id: '4',
        medication: 'Insulin',
        date: '2024-02-05',
        status: 'missed',
        delay: 5,
        source: 'in-person'
      }
    ];
  }

  private getMockAIInsights(): AIInsight[] {
    return [
      {
        id: '1',
        type: 'warning',
        title: 'Weekend Adherence Drop Detected',
        description: 'Adherence has dropped 15% during weekends. Possible cause: irregular routine.',
        confidence: 87,
        timestamp: new Date().toISOString(),
        severity: 'medium'
      },
      {
        id: '2',
        type: 'info',
        title: 'Refill Delay Prediction',
        description: 'System predicts refill delay in next 5 days — send reminder?',
        confidence: 92,
        timestamp: new Date().toISOString(),
        severity: 'low'
      }
    ];
  }

  private getMockAIRecommendations(): AIRecommendation[] {
    return [
      {
        id: '1',
        title: 'Switch Evening Reminder Time',
        description: 'Change evening dose reminder to 8:30 PM — higher success likelihood.',
        confidence: 78,
        reason: 'Based on historical data showing better adherence at this time',
        applied: false,
        category: 'adherence',
        priority: 'medium'
      },
      {
        id: '2',
        title: 'Enable Voice Reminders',
        description: 'Activate voice reminders for better elderly patient engagement.',
        confidence: 85,
        reason: 'Voice reminders show 23% higher adherence in similar demographics',
        applied: false,
        category: 'adherence',
        priority: 'high'
      }
    ];
  }

  private getMockPatientKPIs(): PatientKPIs {
    return {
      adherence: 87,
      missedDoses: 3,
      refillDelay: 1.2,
      riskScore: 'Moderate',
      healthTrend: 'improving'
    };
  }
}

export default AIAnalyticsService;
