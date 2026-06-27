import { Link } from 'react-router-dom'
import { Mail, Link2 } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">YTU ZENITH</h3>
            <p className="text-muted text-sm mt-4">
              Pioneering autonomous aerial systems for the SUAS 2026 competition. 
              Engineering the future of flight at Yildiz Technical University.
            </p>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Documentation</h4>
            <ul className="footer-links">
              <li><Link to="/vehicle-design">Vehicle Design</Link></li>
              <li><Link to="/dev-log">Development Log</Link></li>
              <li><Link to="/sponsors">Sponsors</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li><a href="mailto:contact@ytuzenith.com" className="flex items-center gap-2"><Mail size={16}/> contact@ytuzenith.com</a></li>
              <li><span>Yildiz Technical University</span></li>
              <li><span>Istanbul, Turkey</span></li>
            </ul>
            <div className="social-links mt-4">
              <a href="#" aria-label="GitHub"><Link2 size={20} /> GitHub</a>
              <a href="#" aria-label="LinkedIn"><Link2 size={20} /> LinkedIn</a>
              <a href="#" aria-label="Instagram"><Link2 size={20} /> Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} YTU Zenith. All rights reserved for SUAS 2026.
          </p>
          <p className="text-sm text-muted">
            Last Updated: June 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
