import React from 'react';
import { File, Upload } from 'lucide-react';

interface Resource {
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
}

const resources: Resource[] = [
  {
    name: 'Project Brief.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'John D.',
    date: '2024-03-14',
  },
  {
    name: 'Design Assets.zip',
    type: 'ZIP',
    size: '15.7 MB',
    uploadedBy: 'Sarah M.',
    date: '2024-03-13',
  },
  {
    name: 'Meeting Notes.docx',
    type: 'DOCX',
    size: '542 KB',
    uploadedBy: 'Mike R.',
    date: '2024-03-12',
  },
];

const SharedResources = () => {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-['Exo_2'] font-bold text-white">Shared Resources</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300">
          <Upload size={16} />
          Upload
        </button>
      </div>
      
      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="flex items-center justify-between bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 hover:border-[#FE02A1] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <File className="text-[#FE02A1]" size={24} />
              <div>
                <h4 className="text-white font-montserrat">{resource.name}</h4>
                <div className="text-sm text-[#E0E0E0]">
                  {resource.size} • Uploaded by {resource.uploadedBy}
                </div>
              </div>
            </div>
            <div className="text-sm text-[#E0E0E0]">{resource.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedResources;