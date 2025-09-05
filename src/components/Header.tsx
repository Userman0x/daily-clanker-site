import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

interface ArticleHeadline {
  id: string;
  title: string;
}

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  latestHeadlines?: ArticleHeadline[];
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  selectedCategory,
  onCategorySelect,
  latestHeadlines,
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  const categories = [
  { id: 'all', label: 'Latest' },      // default
  { id: 'news', label: 'News' },
  { id: 'sports', label: 'Sports' },
  { id: 'technology', label: 'Tech' },
  { id: 'business', label: 'Business' },
  { id: 'politics', label: 'Politics' },
  { id: 'gaming', label: 'Gaming' },
];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="  bg-cream-200 border-b border-gray-800 sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-black text-cream-50 text-center py-1 text-xs font-medium">
        ROBOT NEWS ONLY A HUMAN COULD BELIEVE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header */}
        <div className="relative flex items-center justify-between py-4">
          {/* Logo */}
          <button
            onClick={() => onCategorySelect('all')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src={`${import.meta.env.BASE_URL}/images/logo.png`}
              alt="Daily Clanker Logo"
              className="w-12 h-12 mr-3"
            />
          </button>

          {/* Centered title */}
          <button
            onClick={() => onCategorySelect('all')}
            className="absolute left-1/2 transform -translate-x-1/2 hover:opacity-80 transition-opacity"
          >
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-serif tracking-tight">
                Daily Clanker
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 font-medium tracking-wide uppercase">
                The Future is Tomorrow
              </p>
            </div>
          </button>

          {/* Search / menu */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-48 pl-8 pr-4 py-2 border border-gray-800 rounded text-sm focus:ring-1 focus:ring-black focus:border-black   bg-cream-200"
              />
              <Search
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-600"
                size={14}
              />
            </div>

            <button onClick={toggleMobileSearch} className="lg:hidden p-2 hover: bg-cream-200 rounded">
              <Search size={18} />
            </button>

            <button onClick={toggleMobileMenu} className="lg:hidden p-2 hover: bg-cream-200 rounded">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isMobileSearchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-8 pr-10 py-2 border border-gray-800 rounded text-sm focus:ring-1 focus:ring-black focus:border-black   bg-cream-200"
                autoFocus
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <nav className={`${isMobileMenuOpen ? 'block' : 'hidden lg:block'} bg-cream-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center font-medium text-sm font-semibold uppercase tracking-wide px-6 py-3 transition-all
                  ${
                    selectedCategory === category.id
                      ? 'underline underline-offset-4 decoration-2 font-bold text-black'
                      : 'text-black hover:underline underline-offset-4'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </nav>


      {/* Headlines ticker */}
      {latestHeadlines && latestHeadlines.length > 0 && (
        <div className="overflow-hidden bg-black border-t border-gray-800">
          <div className="flex animate-marquee">
            {/* Map over the array twice to create a continuous scroll effect */}
            {[...latestHeadlines, ...latestHeadlines].map((headline, index) => (
              <Link
                key={index}
                to={`/article/${headline.id}`}
                className="flex-shrink-0 mx-8 py-2.5 lg:py-3 text-sm font-medium text-cream-200 cursor-pointer hover:underline flex items-center"
              >
                {headline.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Marquee CSS */}
      <style>
      {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
      `}
      </style>
    </header>
  );
};

export default Header;