import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const { articles, loading, error } = useGitHubContent({
    url: 'https://raw.githubusercontent.com/Userman0x/daily-clanker/main/articles.json'
  });

  const latestHeadlines = useMemo(() => {
    if (articles && articles.length > 0) {
      return articles.slice(0, 10).map(article => ({
        id: article.id,
        title: article.title,
      }));
    }
    return [];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article =>
        article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    navigate('/');
  };

  return (
    <>
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        latestHeadlines={latestHeadlines}
      />

      {error ? (
        <div className="min-h-screen bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-black mb-4">Oops! Something went wrong</h2>
              <p className="text-gray-700 mb-8">{error}</p>
              <p className="text-sm text-gray-600">
                Make sure to update the GitHub configuration in useGitHubContent.ts with your repository details.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                articles={filteredArticles}
                loading={loading}
              />
            }
          />
          <Route
            path="/article/:articleId"
            element={<ArticlePage articles={articles} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;