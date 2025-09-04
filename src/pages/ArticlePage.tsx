import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Share2, Newspaper } from 'lucide-react';
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

interface ArticlePageProps {
  articles: Article[];
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  
  const article = articles.find(a => a.id === articleId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const handleShare = async () => {
    if (article) {
      const tweetText = `${article.title} - ${article.excerpt.substring(0, 100)}${article.excerpt.length > 100 ? '...' : ''}`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(tweetUrl, '_blank', 'width=550,height=420');
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen   bg-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Article Not Found</h1>
            <p className="text-gray-700 mb-8">The article you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-2 bg-black text-cream-50 px-6 py-3 hover:bg-gray-800 transition-colors font-medium underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   bg-cream-200">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-gray-700 hover:text-black transition-colors mb-6 font-medium underline"
        >
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </button>

        <article>
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-black text-cream-50 text-xs font-semibold uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-sm text-gray-600">
                {new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 font-serif leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-700">
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span className="font-medium">By {article.author}</span>
                </div>
              </div>
              
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2  bg-cream-200 text-black px-4 py-2 hover:bg-cream-200 transition-colors text-sm font-medium underline"
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Article Image */}
          <div className="aspect-video overflow-hidden mb-8">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200';
              }}
            />
          </div>
          
          {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-black text-cream-50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Newspaper className="w-6 h-6 text-cream-50 mr-3" />
                <h3 className="text-lg font-bold font-serif">Daily Clanker</h3>
              </div>
              <p className="text-sm text-cream-200 leading-relaxed">
                Clankers were harmed in the making of this website.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-cream-100">Sections</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Technology</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Business</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Politics</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Opinion</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-cream-100">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Contact</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Privacy Policy</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-xs text-white">
              © 2025 Daily Clanker. Robots were harmed in the making of this satire.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticlePage;