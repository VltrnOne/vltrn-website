import React, { useState } from 'react';
import { File, Upload, Download, Search, Tag, Clock, User, FileText } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'document' | 'template' | 'tool' | 'link';
  category: string;
  description: string;
  fileSize: string;
  uploadDate: string;
  author: {
    name: string;
    avatar: string;
  };
  downloads: number;
}

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Project Plan Template',
    type: 'template',
    category: 'Project Management',
    description: 'Comprehensive project planning template with timeline and resource allocation',
    fileSize: '245 KB',
    uploadDate: '2024-03-15',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    downloads: 234
  },
  {
    id: '2',
    name: 'API Documentation',
    type: 'document',
    category: 'Technical',
    description: 'Complete API reference guide with examples and best practices',
    fileSize: '1.2 MB',
    uploadDate: '2024-03-14',
    author: {
      name: 'Michael Torres',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    downloads: 156
  },
  {
    id: '3',
    name: 'Design System Guidelines',
    type: 'document',
    category: 'Design',
    description: 'Brand guidelines and design system documentation',
    fileSize: '3.5 MB',
    uploadDate: '2024-03-13',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    downloads: 89
  }
];

const categories = [
  'All',
  'Project Management',
  'Technical',
  'Design',
  'Marketing',
  'Legal',
  'Finance'
];

const resourceTypes = [
  'All Types',
  'document',
  'template',
  'tool',
  'link'
];

const SharedResourceManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [sortBy, setSortBy] = useState<'date' | 'downloads'>('date');

  const handleUpload = () => {
    // Implement file upload logic
    console.log('Upload triggered');
  };

  const handleDownload = (resourceId: string) => {
    // Implement download logic
    console.log('Download:', resourceId);
  };

  const filteredResources = mockResources
    .filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchesType = selectedType === 'All Types' || resource.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      return b.downloads - a.downloads;
    });

  return (
    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-['Exo_2'] font-bold text-white">Shared Resources</h2>
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 px-4 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
        >
          <Upload className="w-4 h-4" />
          Upload Resource
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white placeholder-white/60 focus:border-[#FE02A1] transition-colors duration-300"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
        >
          {resourceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'downloads')}
          className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
        >
          <option value="date">Sort by Date</option>
          <option value="downloads">Sort by Downloads</option>
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg p-4 hover:border-[#FE02A1] transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-[rgba(254,2,161,0.1)] rounded-lg">
                <FileText className="w-6 h-6 text-[#FE02A1]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{resource.name}</h3>
                <p className="text-white/60 text-sm line-clamp-2">{resource.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/60 mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {resource.category}
              </div>
              <div className="flex items-center gap-2">
                <File className="w-4 h-4" />
                {resource.fileSize}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {resource.uploadDate}
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {resource.downloads}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={resource.author.avatar}
                  alt={resource.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-white/60">{resource.author.name}</span>
              </div>
              <button
                onClick={() => handleDownload(resource.id)}
                className="flex items-center gap-2 px-3 py-1 bg-[rgba(254,2,161,0.1)] rounded-lg text-[#FE02A1] hover:bg-[#FE02A1] hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedResourceManager;