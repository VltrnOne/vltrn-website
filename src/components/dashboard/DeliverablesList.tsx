import React from 'react';
import { Eye } from 'lucide-react';

interface Deliverable {
  name: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

const deliverables: Deliverable[] = [
  { name: 'Project Requirements Document', dueDate: '2024-03-20', status: 'Completed' },
  { name: 'Design System Implementation', dueDate: '2024-03-25', status: 'In Progress' },
  { name: 'Frontend Development', dueDate: '2024-04-05', status: 'In Progress' },
  { name: 'Backend API Integration', dueDate: '2024-04-10', status: 'Pending' },
  { name: 'User Testing Phase', dueDate: '2024-04-20', status: 'Pending' },
];

const getStatusColor = (status: Deliverable['status']) => {
  switch (status) {
    case 'Completed':
      return 'text-green-400';
    case 'In Progress':
      return 'text-yellow-400';
    case 'Pending':
      return 'text-[#E0E0E0]';
  }
};

const DeliverablesList = () => {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
      <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-6">Deliverables</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.1)]">
              <th className="text-left py-3 px-4 text-[#E0E0E0] font-montserrat">Deliverable</th>
              <th className="text-left py-3 px-4 text-[#E0E0E0] font-montserrat">Due Date</th>
              <th className="text-left py-3 px-4 text-[#E0E0E0] font-montserrat">Status</th>
              <th className="text-right py-3 px-4 text-[#E0E0E0] font-montserrat">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliverables.map((deliverable) => (
              <tr
                key={deliverable.name}
                className="group border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
              >
                <td className="py-4 px-4 text-white font-montserrat">{deliverable.name}</td>
                <td className="py-4 px-4 text-[#E0E0E0] font-montserrat">{deliverable.dueDate}</td>
                <td className="py-4 px-4">
                  <span className={`font-montserrat ${getStatusColor(deliverable.status)}`}>
                    {deliverable.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg text-white hover:bg-[#FE02A1] hover:border-transparent transition-all duration-300"
                    aria-label={`View details for ${deliverable.name}`}
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliverablesList;