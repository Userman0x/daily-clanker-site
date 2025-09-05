import React, { useEffect, useRef } from 'react';
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

interface HomePageProps {
  articles: Article[];
  loading: boolean;
  selectedCategory: string;
  scrollToTop: boolean;
  setScrollToTop: (value: boolean) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onCategorySelect: (category: string) => void; // <-- add this
}

const ARTICLES_PER_PAGE = 15;

const HomePage: React.FC<HomePageProps> = ({
  articles,
  loading,
  selectedCategory,
  scrollToTop,
  setScrollToTop,
  page,
  setPage,
  onCategorySelect,
}) => {
  const navigate = useNavigate();
  const featuredRef = useRef<HTMLElement>(null);
  const articlesTopRef = useRef<HTMLDivElement>(null); // ref for regular articles

  const handleArticleClick = (article: Article) => navigate(`/article/${article.id}`);
  const isAll = selectedCategory === 'all';

  let featuredArticle: Article | null = null;
  let regularArticles: Article[] = [];

  if (isAll && articles.length > 0) {
    featuredArticle = articles[0];
    regularArticles = articles.slice(1);
  } else {
    regularArticles = articles;
  }

  const totalPages = Math.ceil(regularArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const pageArticles = regularArticles.slice(startIndex, endIndex);

  useEffect(() => {
  if (!scrollToTop) return;

  const header = document.querySelector('header') as HTMLElement | null;
  const headerHeight = header?.getBoundingClientRect().height || 0;

  const container = document.querySelector('main') as HTMLElement | null;
  const containerPaddingTop = container ? parseFloat(getComputedStyle(container).paddingTop) || 0 : 0;

  let scrollTarget = 0;

  if (isAll) {
    // Latest / Home page
    if (page === 1 && featuredRef.current) {
      scrollTarget = featuredRef.current.offsetTop - (headerHeight + containerPaddingTop);
    } else if (articlesTopRef.current) {
      scrollTarget = articlesTopRef.current.offsetTop - (headerHeight + containerPaddingTop);
    }
  } else if (articlesTopRef.current) {
    scrollTarget = articlesTopRef.current.offsetTop - (headerHeight + containerPaddingTop);
  }

  window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  setScrollToTop(false);

}, [scrollToTop, isAll, page, selectedCategory, setScrollToTop]);


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setScrollToTop(true); // trigger scroll
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-black mb-2">No articles found</h3>
            <p className="text-gray-700">Try adjusting your search terms or selecting a different category.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Article */}
            {isAll && featuredArticle && (
              <section
                ref={featuredRef}
                className="border-b border-gray-800 pb-8 cursor-pointer"
                onClick={() => handleArticleClick(featuredArticle)}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span
                        className="px-2 py-1 bg-black text-cream-50 rounded text-xs font-semibold uppercase tracking-wide cursor-pointer hover:opacity-80"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent navigating to article
                          onCategorySelect(featuredArticle.category);
                        }}
                      >
                        {featuredArticle.category}
                      </span>
                      <span className="text-xs text-gray-600 uppercase tracking-wide">
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 font-serif leading-tight">
                      {featuredArticle.title}
                    </h1>
                    <div className="text-lg text-gray-800 mb-4 leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {featuredArticle.excerpt}
                      </ReactMarkdown>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">By {featuredArticle.author}</p>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Regular Articles */}
            {pageArticles.length > 0 && (
              <section ref={articlesTopRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {pageArticles.map(article => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      onClick={handleArticleClick} 
                      onCategorySelect={onCategorySelect} // pass down from props
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-3 mt-8">
                  <button disabled={page === 1} onClick={() => handlePageChange(1)} className="px-3 py-1 bg-black text-cream-50 rounded disabled:opacity-50">&laquo;</button>
                  <button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className="px-3 py-1 bg-black text-cream-50 rounded disabled:opacity-50">&lt;</button>
                  <span className="px-3 py-1">Page {page} of {totalPages}</span>
                  <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} className="px-3 py-1 bg-black text-cream-50 rounded disabled:opacity-50">&gt;</button>
                  <button disabled={page === totalPages} onClick={() => handlePageChange(totalPages)} className="px-3 py-1 bg-black text-cream-50 rounded disabled:opacity-50">&raquo;</button>
                </div>
              </section>
            )}
          </div>
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
