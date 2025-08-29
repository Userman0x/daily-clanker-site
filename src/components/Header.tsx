import React from 'react';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery, selectedCategory, onCategorySelect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  const categories = [
    { id: 'all', label: 'Latest' },
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'politics', label: 'Politics' },
    { id: 'opinion', label: 'Opinion' }
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
    <header className="bg-white border-b-2 border-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="./images/logo.png" 
              alt="Daily Clanker" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
            <span className="ml-2 sm:ml-3 px-2 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-wide rounded hidden sm:inline">
              Robo-Satire
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <button 
              onClick={toggleMobileSearch}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <nav className={`bg-gray-900 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-8 md:h-12 md:items-center">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left font-medium py-3 md:py-0 transition-colors ${
                  index < categories.length - 1 ? 'border-b border-gray-700 md:border-none' : ''
                } ${
                  selectedCategory === category.id
                    ? 'text-blue-400 bg-gray-800 md:bg-transparent px-4 md:px-0'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;