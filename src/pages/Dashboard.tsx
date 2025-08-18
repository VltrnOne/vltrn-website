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
import { MessageSquare, Plus, Users } from 'lucide-react';
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
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
          <Plus size={20} />
          Add New Project
        </button>
        <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
          <Users size={20} />
          Invite Partner
        </button>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Revenue Growth"
          value="$125,000"
          change={12.5}
          timeframe="last month"
        />
        <KPICard
          title="Active Projects"
          value="8"
          change={33.3}
          timeframe="last quarter"
        />
        <KPICard
          title="Team Efficiency"
          value="94%"
          change={5.2}
          timeframe="last week"
        />
        <KPICard
          title="Partner Satisfaction"
          value="4.8/5"
          change={0.3}
          timeframe="last month"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Tracking Section */}
        <div className="space-y-8">
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-6">Project Progress</h2>
            <div className="h-[300px] mb-6">
              <Line data={chartData} options={chartOptions} />
            </div>
            <ProjectTracking />
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="w-full mt-6 px-6 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg text-white flex items-center justify-center gap-2 hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300"
            >
              <MessageSquare size={20} />
              Submit Feedback
            </button>
          </div>
          <DeliverablesList />
        </div>

        {/* Partner Interaction Section */}
        <div className="space-y-8">
          <TaskBoard />
          <SharedResources />
        </div>
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