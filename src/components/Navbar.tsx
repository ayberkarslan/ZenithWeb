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
      { name: 'title', weight: 2.0 },
      { name: 'category', weight: 1.5 },
      { name: 'description', weight: 1.0 }
    ],
    threshold: 0.4,
    includeScore: true,
  }), [searchIndex])

  const results = useMemo(() => {
    if (!searchQuery.trim()) return []
    return fuse.search(searchQuery).slice(0, 5) // Show top 5 results
  }, [searchQuery, fuse])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      navigate(results[0].item.url)
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
          
          <div className="relative" ref={searchRef}>
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
              <div className="absolute top-full right-0 mt-4 w-[400px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                {results.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="px-4 py-3 bg-gray-900/50 border-b border-gray-800 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-bold">
                      <span>Top Results</span>
                      <span>{results.length} found</span>
                    </div>
                    {results.map((result, idx) => (
                      <Link 
                        key={result.item.id} 
                        to={result.item.url}
                        className={`block p-4 hover:bg-gray-800/50 transition-colors ${idx !== results.length - 1 ? 'border-b border-gray-800/30' : ''} group`}
                        onClick={() => {
                          setIsSearchFocused(false)
                          setSearchQuery('')
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white font-bold group-hover:text-accent transition-colors">{result.item.title}</h4>
                          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs font-medium text-gray-300">
                            {getCategoryIcon(result.item.category)}
                            {result.item.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                          {result.item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="mx-auto mb-3 opacity-20" size={32} />
                    <p>No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-1">Try searching for "YOLO", "Pixhawk", or "Flight"</p>
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
