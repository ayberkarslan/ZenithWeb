import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Moon, Sun, Menu, X, FileText, Cpu, Users, FileIcon } from 'lucide-react'
import Fuse from 'fuse.js'
import { buildSearchIndex } from '../utils/searchIndex'
import './Navbar.css'

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search when route changes
  useEffect(() => {
    setSearchQuery('')
    setIsSearchFocused(false)
  }, [location.pathname])

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])

  // Build index and Fuse instance only once
  const searchIndex = useMemo(() => buildSearchIndex(), [])
  const fuse = useMemo(() => new Fuse(searchIndex, {
    keys: [
      { name: 'title', weight: 3.0 },
      { name: 'description', weight: 2.0 },
      { name: 'category', weight: 1.0 }
    ],
    threshold: 0.2, // Strict typo tolerance to avoid garbage subsequence matches
    ignoreLocation: false, 
    distance: 10000, // Look anywhere in the string without penalizing location, but enforce contiguous-like matching
    useExtendedSearch: true,
    includeScore: true,
  }), [searchIndex])

  const results = useMemo(() => {
    if (!searchQuery.trim()) return []
    // Allow fuzzy logic but prioritize words being present
    // Simple trick: prepend single quote to make it require exact substring match if they type multiple words
    // Or just let Fuse do its magic with ignoreLocation.
    return fuse.search(searchQuery).slice(0, 5) // Show top 5 results
  }, [searchQuery, fuse])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      const result = results[0];
      const urlParts = result.item.url.split('#');
      const basePath = urlParts[0];
      const hash = urlParts[1] ? `#${urlParts[1]}` : '';
      const finalUrl = `${basePath}${basePath.includes('?') ? '&' : '?'}search=${encodeURIComponent(searchQuery)}${hash}`;
      navigate(finalUrl);
      setSearchQuery('')
      setIsSearchFocused(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Blog': return <FileText size={14} className="text-blue-400" />
      case 'Vehicle Design': return <Cpu size={14} className="text-emerald-400" />
      case 'Team': return <Users size={14} className="text-purple-400" />
      default: return <FileIcon size={14} className="text-gray-400" />
    }
  }

// Helper to highlight matching text
const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: 'rgba(10, 132, 255, 0.2)', color: '#5AC8FA', fontWeight: 700, padding: '0 2px', borderRadius: '4px' }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

  return (
    <header className="navbar glass" role="banner">
      <div className="container navbar-content">
        <Link to="/" className="brand" aria-label="YTU Zenith Home">
          <span className="brand-text">YTU ZENITH</span>
        </Link>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} role="navigation" aria-label="Main Navigation">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/vehicle-design" onClick={() => setIsMenuOpen(false)}>Vehicle Design</Link>
          <Link to="/dev-log" onClick={() => setIsMenuOpen(false)}>Dev Log</Link>
          <Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link>
          <Link to="/sponsors" onClick={() => setIsMenuOpen(false)}>Sponsors</Link>
          
          <div className="relative w-full max-w-[500px]" ref={searchRef}>
            <form className="search-form m-0" onSubmit={handleSearch} role="search">
              <label htmlFor="site-search" className="sr-only">Search the site</label>
              <div className={`search-input-wrapper transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-accent bg-black/40' : ''}`}>
                <Search className="search-icon" size={18} aria-hidden="true" />
                <input 
                  type="search" 
                  id="site-search"
                  placeholder="Search specs, logs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  aria-label="Search through site content"
                  autoComplete="off"
                />
              </div>
            </form>

            {/* Smart Search Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div 
                className="absolute top-full left-0 right-0 w-full mt-4 overflow-hidden z-50 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(10, 132, 255, 0.4)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                  borderRadius: '28px',
                  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {results.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.08)] flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-widest font-bold" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <span>Top Results</span>
                      <span>{results.length} found</span>
                    </div>
                    {results.map((result, idx) => {
                      const urlParts = result.item.url.split('#');
                      const basePath = urlParts[0];
                      const hash = urlParts[1] ? `#${urlParts[1]}` : '';
                      const finalUrl = `${basePath}${basePath.includes('?') ? '&' : '?'}search=${encodeURIComponent(searchQuery)}${hash}`;
                      
                      return (
                        <Link 
                          key={result.item.id} 
                          to={finalUrl}
                          className={`block px-7 py-6 hover:bg-[rgba(255,255,255,0.03)] transition-colors ${idx !== results.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''} group`}
                          onClick={() => {
                            setIsSearchFocused(false)
                            setSearchQuery('')
                          }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-[#0A84FF] text-[17px] font-semibold tracking-tight">
                              <HighlightText text={result.item.title} highlight={searchQuery} />
                            </h4>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-300" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                              {getCategoryIcon(result.item.category)}
                              {result.item.category}
                            </span>
                          </div>
                          <p className="text-[14px] text-gray-400 leading-relaxed tracking-wide">
                            <HighlightText text={result.item.description} highlight={searchQuery} />
                          </p>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="py-16 px-8 text-center text-gray-500" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Search className="mx-auto mb-5 opacity-30 text-[#0A84FF]" size={48} />
                    <p className="text-[17px] text-gray-300 font-semibold tracking-tight">No results for "{searchQuery}"</p>
                    <p className="text-[14px] mt-3 text-gray-500 tracking-wide">Make sure all words are spelled correctly.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
