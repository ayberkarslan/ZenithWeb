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
            <p className="text-muted text-xs mt-3 opacity-70">
              *Zenith is the official SUAS competition team operating under the Space and Avionics Systems Club (UASK) at YTU.
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
              <li><a href="mailto:yildizuask@gmail.com" className="flex items-center gap-2"><Mail size={16}/> yildizuask@gmail.com</a></li>
              <li><span>Yildiz Technical University</span></li>
              <li><span>Davutpasa Campus</span></li>
              <li><span>Istanbul, Turkey</span></li>
            </ul>
            <div className="social-links mt-4 flex gap-4">
              <a href="https://www.linkedin.com/company/yt%C3%BC-uzay-ve-aviyonik-sistemler-kul%C3%BCb%C3%BC/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex items-center gap-1 hover:text-accent transition-colors"><Link2 size={20} /> LinkedIn</a>
              <a href="https://www.instagram.com/ytuuask/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex items-center gap-1 hover:text-accent transition-colors"><Link2 size={20} /> Instagram</a>
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
