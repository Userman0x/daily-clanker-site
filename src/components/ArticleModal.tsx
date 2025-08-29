import React from 'react';
import { X, Calendar, User, Share2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8">
        <div className="relative max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <div className="aspect-video sm:aspect-[16/9] overflow-hidden rounded-t-lg">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200';
              }}
            />
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {article.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={16} />
                  <span>By {article.author}</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors self-start sm:self-auto">
                <Share2 size={16} />
                <span className="text-sm">Share</span>
              </button>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-serif leading-tight">
              {article.title}
            </h1>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;