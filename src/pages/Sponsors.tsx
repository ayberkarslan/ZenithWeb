import { motion } from 'framer-motion'
import './Sponsors.css'

export default function Sponsors() {
  const sponsors = [
    { name: "Sponsor 1", tier: "Platinum", link: "#", logo: "/sponsor.jpg" },
    { name: "Sponsor 2", tier: "Gold", link: "#", logo: "/sponsor.jpg" },
    { name: "Sponsor 3", tier: "Gold", link: "#", logo: "/sponsor.jpg" },
    { name: "YTU", tier: "University", link: "#", logo: "/sponsor.jpg" },
  ]

  return (
    <div className="pt-32 pb-24 container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl mb-4">Our Sponsors</h1>
        <p className="text-xl text-muted max-w-3xl mb-12">
          The engineering excellence of YTU Zenith is made possible by the generous support and partnerships of these industry leaders.
        </p>

        <div className="sponsors-grid">
          {sponsors.map((sponsor, idx) => (
            <a 
              key={idx} 
              href={sponsor.link} 
              className={`card sponsor-card tier-${sponsor.tier.toLowerCase()}`}
              aria-label={`Visit ${sponsor.name} website`}
            >
              <div className="sponsor-logo-wrapper">
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="sponsor-logo" />
              </div>
              <div className="sponsor-info mt-4 text-center border-t border-border pt-4">
                <h3 className="font-bold">{sponsor.name}</h3>
                <span className="text-accent text-sm uppercase tracking-wider font-bold">{sponsor.tier} Partner</span>
              </div>
            </a>
          ))}
        </div>

        <div className="card mt-16 text-center py-12">
          <h2 className="text-3xl mb-4">Become a Partner</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Join us in shaping the future of autonomous systems. Partnering with YTU Zenith provides your company with access to top engineering talent and global brand visibility at the SUAS competition.
          </p>
          <a href="mailto:contact@ytuzenith.com" className="btn btn-primary">Download Sponsorship Package</a>
        </div>
      </motion.div>
    </div>
  )
}
