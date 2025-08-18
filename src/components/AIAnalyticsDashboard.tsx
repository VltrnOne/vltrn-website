import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Brain, 
  Lightbulb, 
  Target, 
  BarChart3, 
  PieChart, 
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Calendar
} from 'lucide-react';

interface AIAnalyticsDashboardProps {
  projectData?: any;
  userData?: any;
}

interface AIInsight {
  id: string;
  type: 'positive' | 'warning' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action?: string;
}

const AIAnalyticsDashboard: React.FC<AIAnalyticsDashboardProps> = ({ 
  projectData, 
  userData 
}) => {
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [predictedMetrics, setPredictedMetrics] = useState<any>({});

  useEffect(() => {
    generateAIInsights();
  }, [projectData, userData, selectedTimeframe]);

  const generateAIInsights = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const insights: AIInsight[] = [];
    
    // Project Performance Insights
    insights.push({
      id: '1',
      type: 'positive',
      title: 'Project Completion Rate Improving',
      description: 'Your project completion rate has increased by 23% over the last 30 days. This suggests improved project management practices and team efficiency.',
      impact: 'high',
      confidence: 87
    });
    
    insights.push({
      id: '2',
      type: 'recommendation',
      title: 'Resource Allocation Optimization',
      description: 'Based on current project timelines, consider reallocating 2 team members from Project Alpha to Project Beta to meet the upcoming deadline.',
      impact: 'medium',
      confidence: 92,
      action: 'Review resource allocation'
    });
    
    insights.push({
      id: '3',
      type: 'prediction',
      title: 'Q4 Performance Forecast',
      description: 'Based on current trends, your Q4 project delivery rate is predicted to be 15% higher than Q3, with an estimated 8 projects completed on time.',
      impact: 'high',
      confidence: 78
    });
    
    insights.push({
      id: '4',
      type: 'warning',
      title: 'Budget Risk Alert',
      description: 'Project Gamma is currently 12% over budget. At this rate, it may exceed the allocated budget by 18% by completion. Consider cost optimization strategies.',
      impact: 'high',
      confidence: 85,
      action: 'Review project budget'
    });
    
    insights.push({
      id: '5',
      type: 'recommendation',
      title: 'Team Productivity Enhancement',
      description: 'Your development team shows 40% higher productivity on Tuesdays and Wednesdays. Consider scheduling critical tasks during these peak performance days.',
      impact: 'medium',
      confidence: 89,
      action: 'Optimize task scheduling'
    });
    
    insights.push({
      id: '6',
      type: 'positive',
      title: 'Client Satisfaction Trending Up',
      description: 'Client satisfaction scores have improved by 31% this quarter. This correlates with faster project delivery and improved communication.',
      impact: 'medium',
      confidence: 91
    });
    
    setAiInsights(insights);
    
    // Generate predicted metrics
    setPredictedMetrics({
      projectCompletion: 87,
      budgetEfficiency: 92,
      teamProductivity: 89,
      clientSatisfaction: 94,
      resourceUtilization: 85
    });
    
    setIsAnalyzing(false);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'recommendation':
        return <Lightbulb size={16} className="text-blue-400" />;
      case 'prediction':
        return <TrendingUp size={16} className="text-purple-400" />;
      default:
        return <Brain size={16} className="text-[#FE02A1]" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-green-400/30 bg-green-400/10';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/10';
      case 'recommendation':
        return 'border-blue-400/30 bg-blue-400/10';
      case 'prediction':
        return 'border-purple-400/30 bg-purple-400/10';
      default:
        return 'border-[#FE02A1]/30 bg-[#FE02A1]/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-400 bg-red-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/20';
      default:
        return 'text-[#FE02A1] bg-[#FE02A1]/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#FE02A1] rounded-full flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Analytics Dashboard</h2>
            <p className="text-white/60">Intelligent insights powered by artificial intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FE02A1]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button
            onClick={generateAIInsights}
            disabled={isAnalyzing}
            className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 disabled:bg-[#FE02A1]/50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap size={16} />
                <span>Refresh Insights</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Lightbulb size={20} className="text-[#FE02A1]" />
            <h3 className="text-lg font-semibold text-white">AI-Generated Insights</h3>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <span className="text-white font-medium text-sm">{insight.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()}
                    </span>
                    <span className="text-white/60 text-xs">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm mb-3">{insight.description}</p>
                
                {insight.action && (
                  <button className="text-[#FE02A1] hover:text-[#FE02A1]/80 text-xs font-medium transition-colors">
                    {insight.action} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Predicted Metrics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} className="text-[#FE02A1]" />
            <h3 className="text-lg font-semibold text-white">AI Predictions</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Project Completion Rate</span>
                <span className="text-[#FE02A1] font-semibold">{predictedMetrics.projectCompletion}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
                <div 
                  className="bg-[#FE02A1] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${predictedMetrics.projectCompletion}%` }}
                />
              </div>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Budget Efficiency</span>
                <span className="text-green-400 font-semibold">{predictedMetrics.budgetEfficiency}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${predictedMetrics.budgetEfficiency}%` }}
                />
              </div>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Team Productivity</span>
                <span className="text-blue-400 font-semibold">{predictedMetrics.teamProductivity}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${predictedMetrics.teamProductivity}%` }}
                />
              </div>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Client Satisfaction</span>
                <span className="text-purple-400 font-semibold">{predictedMetrics.clientSatisfaction}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${predictedMetrics.clientSatisfaction}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-[rgba(254,2,161,0.05)] border border-[rgba(254,2,161,0.3)] rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target size={20} className="text-[#FE02A1]" />
          <h3 className="text-lg font-semibold text-white">AI Strategic Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="w-12 h-12 bg-[#FE02A1] rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-white" />
            </div>
            <h4 className="text-white font-medium mb-2">Team Optimization</h4>
            <p className="text-white/60 text-sm">Consider cross-training team members to improve project flexibility and reduce bottlenecks.</p>
          </div>
          
          <div className="text-center p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="w-12 h-12 bg-[#FE02A1] rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign size={24} className="text-white" />
            </div>
            <h4 className="text-white font-medium mb-2">Budget Planning</h4>
            <p className="text-white/60 text-sm">Implement quarterly budget reviews to identify cost-saving opportunities early.</p>
          </div>
          
          <div className="text-center p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
            <div className="w-12 h-12 bg-[#FE02A1] rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar size={24} className="text-white" />
            </div>
            <h4 className="text-white font-medium mb-2">Timeline Management</h4>
            <p className="text-white/60 text-sm">Use AI-powered scheduling to optimize task allocation and reduce project delays.</p>
          </div>
        </div>
      </div>

      {/* AI Status */}
      <div className="text-center text-white/60 text-sm">
        <div className="flex items-center justify-center space-x-2">
          <Brain size={16} className="text-[#FE02A1]" />
          <span>AI Analytics Engine • Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        <p className="mt-1">Powered by advanced machine learning algorithms analyzing your project data</p>
      </div>
    </div>
  );
};

export default AIAnalyticsDashboard;
