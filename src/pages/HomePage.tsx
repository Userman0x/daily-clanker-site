import React from 'react';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
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

// REMOVE the searchQuery and selectedCategory props from this interface
interface HomePageProps {
  articles: Article[];
  loading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  articles,
  loading
}) => {
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.id}`);
  };

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="min-h-screen  bg-cream-200">
      {/* The Header component has been removed from here */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-black mb-2">No articles found</h3>
                <p className="text-gray-700">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Featured Article */}
                {featuredArticle && (
                  <section className="border-b border-gray-800 pb-8">
                    <div 
                      className="grid lg:grid-cols-2 gap-8 cursor-pointer group"
                      onClick={() => handleArticleClick(featuredArticle)}
                    >
                      <div className="order-2 lg:order-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-2 py-1 bg-black text-cream-50 rounded text-xs font-semibold uppercase tracking-wide">
                            {featuredArticle.category}
                          </span>
                          <span className="text-xs text-gray-600 uppercase tracking-wide">
                            {new Date(featuredArticle.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 font-serif leading-tight group-hover:text-gray-700 transition-colors">
                          {featuredArticle.title}
                        </h1>
                        
                        <div className="text-lg text-gray-800 mb-4 leading-relaxed">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ children }) => <>{children}</>,
                              }}
                            >
                              {featuredArticle.excerpt}
                            </ReactMarkdown>
                        </div>
                        
                        <p className="text-sm text-gray-600 font-medium">
                          By {featuredArticle.author}
                        </p>
                      </div>
                      <div className="order-1 lg:order-2">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={featuredArticle.image} 
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Regular Articles Grid */}
                {regularArticles.length > 0 && (
                  <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                      {regularArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onClick={handleArticleClick}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-cream-50 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold font-serif mb-4">Daily Clanker</h3>
              <p className="text-sm text-cream-100 leading-relaxed">
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
            <p className="text-xs text-cream-200">
              © 2025 Daily Clanker. Robots were harmed in the making of this satire.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;