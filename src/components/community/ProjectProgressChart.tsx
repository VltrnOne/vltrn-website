import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Filter, SortAsc, Calendar } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    progress: 75,
    status: 'in-progress',
    priority: 'high',
    deadline: '2024-04-15'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    progress: 30,
    status: 'in-progress',
    priority: 'medium',
    deadline: '2024-05-01'
  },
  {
    id: '3',
    name: 'Data Migration',
    progress: 100,
    status: 'completed',
    priority: 'high',
    deadline: '2024-03-30'
  },
  {
    id: '4',
    name: 'API Integration',
    progress: 0,
    status: 'not-started',
    priority: 'low',
    deadline: '2024-05-15'
  }
];

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'not-started':
      return 'rgba(255, 255, 255, 0.3)';
    case 'in-progress':
      return '#FE02A1';
    case 'completed':
      return '#4CAF50';
  }
};

const ProjectProgressChart = () => {
  const [sortBy, setSortBy] = useState<'deadline' | 'progress' | 'priority'>('deadline');
  const [filterStatus, setFilterStatus] = useState<Project['status'] | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Project['priority'] | 'all'>('all');

  const filteredProjects = mockProjects
    .filter(project => filterStatus === 'all' || project.status === filterStatus)
    .filter(project => filterPriority === 'all' || project.priority === filterPriority)
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'progress':
          return b.progress - a.progress;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const chartData = {
    labels: filteredProjects.map(project => project.name),
    datasets: [
      {
        label: 'Progress',
        data: filteredProjects.map(project => project.progress),
        backgroundColor: filteredProjects.map(project => getStatusColor(project.status)),
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#FE02A1',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-['Exo_2'] font-bold text-white">Project Progress</h2>
        <div className="flex gap-4">
          {/* Sort Controls */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="progress">Sort by Progress</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          {/* Filter Controls */}
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)}
              className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Project List */}
      <div className="mt-8">
        <div className="grid grid-cols-4 gap-4 mb-4 text-white/60 text-sm">
          <div>Project</div>
          <div>Status</div>
          <div>Priority</div>
          <div>Deadline</div>
        </div>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="grid grid-cols-4 gap-4 py-3 border-t border-[rgba(255,255,255,0.1)]"
          >
            <div className="text-white">{project.name}</div>
            <div>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {project.status}
              </span>
            </div>
            <div className="text-white/80 capitalize">{project.priority}</div>
            <div className="text-white/80">{project.deadline}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgressChart;