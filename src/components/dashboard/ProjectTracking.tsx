import React from 'react';

interface Milestone {
  name: string;
  progress: number;
  dueDate: string;
}

const milestones: Milestone[] = [
  { name: 'Project Planning', progress: 100, dueDate: '2024-03-15' },
  { name: 'Design Phase', progress: 75, dueDate: '2024-03-30' },
  { name: 'Development', progress: 45, dueDate: '2024-04-15' },
  { name: 'Testing', progress: 20, dueDate: '2024-04-30' },
];

const ProjectTracking = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-['Exo_2'] font-semibold text-white mb-4">Milestones</h3>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.name}
            className="group bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] rounded-lg p-4 hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-montserrat">{milestone.name}</span>
              <span className="text-sm text-[#E0E0E0]">Due: {milestone.dueDate}</span>
            </div>
            <div className="relative h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#FE02A1] rounded-full transition-all duration-500 group-hover:shadow-[0_0_10px_#FE02A1]"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
            <div className="mt-1 text-right">
              <span className="text-sm text-[#E0E0E0]">{milestone.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTracking;