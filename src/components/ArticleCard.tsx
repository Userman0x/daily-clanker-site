import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      className="cursor-pointer group"
      onClick={() => onClick(article)}
    >
      <div className="aspect-[4/3] overflow-hidden mb-4">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
      </div>
      
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs text-black font-semibold uppercase tracking-wide">
            {article.category}
          </span>
          <span className="text-xs text-gray-600">
            {new Date(article.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
        
        <h2 className="text-lg sm:text-xl font-bold text-black mb-2 font-serif leading-tight group-hover:text-gray-700 transition-colors line-clamp-3">
          {article.title}
        </h2>
        
        {/* Manually style the links and apply line-clamp */}
        <div className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ children }) => <>{children}</>, // strip links
            }}
          >
            {article.excerpt}
          </ReactMarkdown>
        </div>

      </div>
    </article>
  );
};

export default ArticleCard;