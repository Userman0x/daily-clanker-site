import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X as XIcon, ChevronDown } from 'lucide-react';

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
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const categories = [
    { id: 'news', label: 'News' },
    { id: 'sports', label: 'Sports' },
    { id: 'technology', label: 'Tech' },
    { id: 'business', label: 'Business' },
    { id: 'politics', label: 'Politics' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'opinion', label: 'Opinion' }
  ];

  const mainMenuItems = [
    {
      id: 'latest',
      label: 'Latest',
      action: () => onCategorySelect('all')
    },
    {
      id: 'categories',
      label: 'Categories',
      hasSubmenu: true,
      submenu: categories.map(cat => ({
        ...cat,
        action: () => onCategorySelect(cat.id)
      }))
    },
    {
      id: 'cword',
      label: '$CWORD',
      action: () => navigate('/cword')
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenSubmenu(null);
  };

  const handleSubmenuToggle = (menuId: string) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.action) {
      item.action();
      setIsMobileMenuOpen(false);
      setOpenSubmenu(null);
    }
  };

  return (
    <header className="bg-cream-200 border-b border-gray-800 sticky top-0 z-50">
      <div className="bg-black text-cream-50 text-center py-1 text-xs font-medium">
        ROBOT NEWS ONLY A HUMAN COULD BELIEVE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-4">
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

          <div className="flex items-center space-x-4">
            <a
              href="https://x.com/DailyClanker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 hover:bg-cream-300 rounded transition-colors"
              aria-label="Follow us on X"
            >
              <span className="text-2xl font-extrabold text-black lg:hidden">𝕏</span>
              <span className="hidden lg:flex items-center space-x-2">
                <span className="text-sm font-medium text-black">Follow on</span>
                <span className="text-3xl font-extrabold text-black leading-none">𝕏</span>
              </span>
            </a>

            <button onClick={toggleMobileMenu} className="lg:hidden p-2 hover:bg-cream-300 rounded">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-cream-200 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop menu */}
          <div className="hidden lg:flex justify-center items-center">
            {mainMenuItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.hasSubmenu ? (
                  <>
                    <button
                      className="flex items-center justify-center font-medium text-sm font-semibold uppercase tracking-wide px-6 py-3 transition-all text-black hover:underline underline-offset-4 text-center"
                    >
                      {item.label}
                      <ChevronDown size={14} className="ml-1" />
                    </button>

                    <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-full">
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleMenuItemClick(subItem)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-cream-100 transition-colors ${
                            selectedCategory === subItem.id ? 'bg-cream-200 font-semibold' : ''
                          }`}
                        >
                          {subItem.label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className="flex items-center justify-center font-medium text-sm font-semibold uppercase tracking-wide px-6 py-3 transition-all text-black hover:underline underline-offset-4 text-center"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>


          {/* Mobile menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden flex flex-col`}>
            {mainMenuItems.map((item) => (
              <div key={item.id} className="w-full">
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => handleSubmenuToggle(item.id)}
                      className="flex items-center w-full font-medium text-sm font-semibold uppercase tracking-wide px-6 py-3 transition-all text-black"
                    >
                      <span className="flex-1">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openSubmenu === item.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openSubmenu === item.id && (
                      <div className="bg-cream-100 border-t border-gray-300 flex flex-col w-full">
                        {item.submenu?.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleMenuItemClick(subItem)}
                            className={`block w-full text-center px-6 py-3 text-sm hover:bg-cream-200 transition-colors ${
                              selectedCategory === subItem.id ? 'bg-cream-200 font-semibold' : ''
                            }`}
                          >
                            {subItem.label.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className="flex justify-center w-full font-medium text-sm font-semibold uppercase tracking-wide px-6 py-3 text-black text-center"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>


      {/* Headlines ticker */}
      {latestHeadlines && latestHeadlines.length > 0 && (
        <div className="overflow-hidden bg-black border-t border-gray-800">
          <div className="flex animate-marquee">
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
