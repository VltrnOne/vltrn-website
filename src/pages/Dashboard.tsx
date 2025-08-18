import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { MessageSquare, Plus, Users, TrendingUp, Calendar, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectTracking from '../components/dashboard/ProjectTracking';
import DeliverablesList from '../components/dashboard/DeliverablesList';
import FeedbackModal from '../components/dashboard/FeedbackModal';
import KPICard from '../components/dashboard/KPICard';
import TaskBoard from '../components/dashboard/TaskBoard';
import SharedResources from '../components/dashboard/SharedResources';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Project Progress',
        data: [25, 45, 75, 85],
        borderColor: '#FE02A1',
        backgroundColor: 'rgba(254, 2, 161, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#FE02A1',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  const handleAddNewProject = () => {
    navigate('/client-intakes');
  };

  const handleQuickActions = (action: string) => {
    switch (action) {
      case 'tasks':
        navigate('/tasks');
        break;
      case 'resources':
        navigate('/resources');
        break;
      case 'analytics':
        navigate('/performance-analytics');
        break;
      case 'community':
        navigate('/community');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-[#0A0A0A] to-black pt-24 pb-16 px-4">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-['Exo_2'] font-bold text-white mb-4 [text-shadow:0_0_15px_#FE02A1]">
          Tracking and Collaboration Dashboard
        </h1>
        <p className="text-[#E0E0E0] text-lg md:text-xl font-montserrat max-w-3xl mx-auto">
          Real-time insights into milestones, analytics, and timelines
        </p>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 mb-8">
        <button 
          onClick={handleAddNewProject}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
        >
          <Plus size={20} />
          Add New Project
        </button>
        
        <button 
          onClick={() => handleQuickActions('tasks')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300"
        >
          <Calendar size={20} />
          View Tasks
        </button>
        
        <button 
          onClick={() => handleQuickActions('resources')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300"
        >
          <Users size={20} />
          Manage Resources
        </button>
        
        <button 
          onClick={() => handleQuickActions('analytics')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300"
        >
          <TrendingUp size={20} />
          View Analytics
        </button>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KPICard
          title="Active Projects"
          value="12"
          change="+2"
          changeType="positive"
          icon={<Target size={24} />}
          color="pink"
        />
        <KPICard
          title="Tasks Completed"
          value="89"
          change="+12"
          changeType="positive"
          icon={<Calendar size={24} />}
          color="blue"
        />
        <KPICard
          title="Team Members"
          value="24"
          change="+3"
          changeType="positive"
          icon={<Users size={24} />}
          color="green"
        />
        <KPICard
          title="Success Rate"
          value="94%"
          change="+2%"
          changeType="positive"
          icon={<TrendingUp size={24} />}
          color="purple"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Project Progress Chart */}
        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Project Progress Overview</h3>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-[rgba(254,2,161,0.1)] rounded-lg">
              <div className="w-2 h-2 bg-[#FE02A1] rounded-full"></div>
              <span className="text-white/80 text-sm">New project "E-commerce Platform" created</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[rgba(0,255,255,0.1)] rounded-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Task "User Authentication" completed</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[rgba(255,193,7,0.1)] rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Resource "Design System" updated</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[rgba(76,175,80,0.1)] rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Team meeting scheduled for tomorrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Tracking */}
      <div className="max-w-7xl mx-auto mb-12">
        <ProjectTracking />
      </div>

      {/* Task Board and Deliverables */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <TaskBoard />
        </div>
        <div>
          <DeliverablesList />
        </div>
      </div>

      {/* Shared Resources */}
      <div className="max-w-7xl mx-auto mb-12">
        <SharedResources />
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;