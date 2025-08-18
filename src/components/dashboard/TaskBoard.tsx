import React from 'react';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignee: string;
}

const tasks: Task[] = [
  { id: '1', title: 'Review Project Proposal', status: 'todo', assignee: 'John D.' },
  { id: '2', title: 'Update Documentation', status: 'in-progress', assignee: 'Sarah M.' },
  { id: '3', title: 'Client Meeting', status: 'completed', assignee: 'Mike R.' },
  { id: '4', title: 'Design Review', status: 'in-progress', assignee: 'Emma L.' },
];

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
];

const TaskBoard = () => {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-['Exo_2'] font-bold text-white">Task Board</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
          <Plus size={16} />
          Add Task
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <h4 className="text-white font-montserrat mb-2">{task.title}</h4>
                  <div className="text-sm text-[#E0E0E0]">Assigned to: {task.assignee}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;