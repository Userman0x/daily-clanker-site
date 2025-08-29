import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import LoadingSpinner from './components/LoadingSpinner';
import useGitHubContent from './hooks/useGitHubContent';

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

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { articles, loading, error } = useGitHubContent({
  url: 'https://raw.githubusercontent.com/Userman0x/daily-clanker/main/articles.json'
});

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    
    // Filter by category first
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article =>
        article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Then filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [articles, searchQuery, selectedCategory]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when changing category
  };
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <p className="text-sm text-gray-500">
              Make sure to update the GitHub configuration in useGitHubContent.ts with your repository details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch} 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            {selectedCategory === 'all' ? 'Latest News' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {selectedCategory === 'all' 
              ? 'Daily Clanker commentary on the latest Clanker News.'
              : `Latest ${selectedCategory} articles from our robotic correspondents.`
            }
          </p>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Showing results for "{searchQuery}" ({filteredArticles.length} articles)
            </p>
          )}
          {selectedCategory !== 'all' && !searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {filteredArticles.length} {selectedCategory} articles
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms.' : 'No articles available at the moment.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={handleArticleClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <ArticleModal
        article={selectedArticle}
        onClose={handleCloseModal}
      />

      <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-4">Daily Clanker</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              Where AI meets satire, one clanker at a time
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Daily Clanker. All rights reserved. Robots were harmed in the making of these articles.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;