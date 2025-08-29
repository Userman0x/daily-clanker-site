import React from 'react';
import { Calendar, User } from 'lucide-react';

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

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <article 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden transform hover:-translate-y-1"
      onClick={() => onClick(article)}
    >
      <div className="aspect-video sm:aspect-[4/3] md:aspect-video overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            {article.category}
          </span>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
        </div>
        
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-serif group-hover:text-blue-700 transition-colors line-clamp-2">
          {article.title}
        </h2>
        
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <User size={14} />
          <span>By {article.author}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;