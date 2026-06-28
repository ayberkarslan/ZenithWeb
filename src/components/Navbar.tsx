import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Moon, Sun, Menu, X } from 'lucide-react'
import './Navbar.css'

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Search functionality for: ${searchQuery}. To be connected to Algolia or local index.`)
    setSearchQuery('')
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
          
          <form className="search-form" onSubmit={handleSearch} role="search">
            <label htmlFor="site-search" className="sr-only">Search the site</label>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} aria-hidden="true" />
              <input 
                type="search" 
                id="site-search"
                placeholder="Search specs, logs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search through site content"
              />
            </div>
          </form>

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
