import React, { useState } from 'react';
import { Book, Download, FileUp, Filter, ThumbsDown, ThumbsUp, Upload } from 'lucide-react';
import clsx from 'clsx';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'whitepaper' | 'tool' | 'template';
  thumbnail: string;
  downloads: number;
  dateAdded: string;
  topic: string;
  official: boolean;
  votes: {
    up: number;
    down: number;
  };
  author?: {
    name: string;
    avatar: string;
  };
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Growth Strategies Guide',
    description: 'Comprehensive guide for scaling your business effectively',
    type: 'ebook',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop',
    downloads: 1234,
    dateAdded: '2024-03-01',
    topic: 'Business',
    official: true,
    votes: { up: 156, down: 12 }
  },
  {
    id: '2',
    title: 'Tech Stack Analysis',
    description: 'In-depth analysis of modern tech stacks',
    type: 'whitepaper',
    thumbnail: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=500&h=300&fit=crop',
    downloads: 856,
    dateAdded: '2024-02-28',
    topic: 'Technology',
    official: true,
    votes: { up: 89, down: 5 }
  },
  {
    id: '3',
    title: 'Marketing Templates',
    description: 'Ready-to-use marketing campaign templates',
    type: 'template',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    downloads: 2341,
    dateAdded: '2024-02-25',
    topic: 'Marketing',
    official: false,
    votes: { up: 234, down: 18 },
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  }
];

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState<'curated' | 'community'>('curated');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const handleUpload = () => {
    // Implement file upload logic
    console.log('Upload triggered');
  };

  const handleVote = (resourceId: string, voteType: 'up' | 'down') => {
    // Implement voting logic
    console.log('Vote:', resourceId, voteType);
  };

  const handleDownload = (resourceId: string) => {
    // Implement download logic
    console.log('Download:', resourceId);
  };

  const handleReport = (resourceId: string) => {
    // Implement report logic
    console.log('Report:', resourceId);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Exo_2'] font-bold text-white mb-8 [text-shadow:0_0_15px_#FE02A1]">
          Resource Library
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('curated')}
            className={clsx(
              'px-6 py-3 rounded-lg transition-all duration-300',
              activeTab === 'curated'
                ? 'bg-[#FE02A1] text-white'
                : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(254,2,161,0.2)]'
            )}
          >
            Curated Resources
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={clsx(
              'px-6 py-3 rounded-lg transition-all duration-300',
              activeTab === 'community'
                ? 'bg-[#FE02A1] text-white'
                : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(254,2,161,0.2)]'
            )}
          >
            Community Resources
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="all">All Types</option>
              <option value="ebook">eBooks</option>
              <option value="whitepaper">Whitepapers</option>
              <option value="tool">Tools</option>
              <option value="template">Templates</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="all">All Topics</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="recent">Most Recent</option>
              <option value="downloads">Most Downloaded</option>
              <option value="votes">Most Voted</option>
            </select>
          </div>
          {activeTab === 'community' && (
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
            >
              <Upload className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResources.map((resource) => (
            <div
              key={resource.id}
              className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl overflow-hidden hover:border-[#FE02A1] transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {resource.official ? (
                    <span className="px-3 py-1 bg-[#FE02A1] rounded-full text-white text-sm">
                      Official
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-[rgba(255,255,255,0.2)] rounded-full text-white text-sm">
                      Community
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                  <span className="text-sm text-white/60">{resource.type}</span>
                </div>
                <p className="text-white/80 mb-4 line-clamp-2">{resource.description}</p>
                {resource.author && (
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={resource.author.avatar}
                      alt={resource.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-white/60">{resource.author.name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleVote(resource.id, 'up')}
                      className="text-white/60 hover:text-[#FE02A1] transition-colors duration-300"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <span className="text-white/60">
                      {resource.votes.up - resource.votes.down}
                    </span>
                    <button
                      onClick={() => handleVote(resource.id, 'down')}
                      className="text-white/60 hover:text-[#FE02A1] transition-colors duration-300"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDownload(resource.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;