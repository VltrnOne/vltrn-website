import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Download, Users, MessageSquare, Activity, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('day');
  const [userGroup, setUserGroup] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock data - replace with real-time data
  const mockData = {
    activeUsers: 342,
    uniqueVisitors: 1256,
    newRegistrations: 45,
    peakUsers: 567,
    retentionRate: 78,
    messagesLastHour: 892,
    avgResponseTime: '2.5m',
    engagementRate: 64,
  };

  const activityData = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        label: 'User Activity',
        data: [120, 90, 60, 180, 240, 280, 300, 220],
        borderColor: '#FE02A1',
        backgroundColor: 'rgba(254, 2, 161, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const roomActivityData = {
    labels: ['Tech Talk', 'Startup Hub', 'Design Lab', 'Marketing', 'General'],
    datasets: [
      {
        label: 'Messages per Minute',
        data: [45, 32, 28, 24, 18],
        backgroundColor: [
          'rgba(254, 2, 161, 0.8)',
          'rgba(254, 2, 161, 0.6)',
          'rgba(254, 2, 161, 0.4)',
          'rgba(254, 2, 161, 0.3)',
          'rgba(254, 2, 161, 0.2)',
        ],
        borderWidth: 0,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    // Implement CSV export logic
    console.log('Exporting data...');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-['Exo_2'] font-bold text-white [text-shadow:0_0_15px_#FE02A1]">
            Community Analytics
          </h2>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
          >
            <option value="hour">Last Hour</option>
            <option value="day">24 Hours</option>
            <option value="week">7 Days</option>
            <option value="month">30 Days</option>
          </select>
          <select
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value)}
            className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
          >
            <option value="all">All Users</option>
            <option value="new">New Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#FE02A1]" />
              <h3 className="text-lg font-semibold text-white">Active Users</h3>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{mockData.activeUsers}</div>
            <div className="text-sm text-white/60">Currently Online</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-[#FE02A1]" />
              <h3 className="text-lg font-semibold text-white">Messages</h3>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{mockData.messagesLastHour}</div>
            <div className="text-sm text-white/60">Last Hour</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-[#FE02A1]" />
              <h3 className="text-lg font-semibold text-white">Engagement</h3>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{mockData.engagementRate}%</div>
            <div className="text-sm text-white/60">Average Rate</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#FE02A1]" />
              <h3 className="text-lg font-semibold text-white">Response Time</h3>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{mockData.avgResponseTime}</div>
            <div className="text-sm text-white/60">Average</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Timeline */}
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">24-Hour Activity</h3>
            <div className="h-[300px]">
              <Line data={activityData} options={chartOptions} />
            </div>
          </div>

          {/* Room Activity */}
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Top Active Rooms</h3>
            <div className="h-[300px]">
              <Bar data={roomActivityData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;