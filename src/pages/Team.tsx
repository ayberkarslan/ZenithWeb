import { motion } from 'framer-motion'
import { Mail, Link2, User, Crown } from 'lucide-react'
import './Team.css'

const teamData = {
  electronics: [
    { name: "Huzeyfe Fazıl Koç", role: "Electronics & Communications Eng. / 2nd Year", image: "/team/fazil.jpg", isLeader: true },
    { name: "Yusuf Yasir İncal", role: "Electronics & Communications Eng. / 2nd Year", image: "/team/yusuf.jpg", isLeader: false }
  ],
  software: [
    { name: "Muharrem Sait Çoktaş", role: "Geomatics Eng. / 2nd Year", image: "/team/sait.jpg", isLeader: false },
    { name: "Muhammet Ayberk Arslan", role: "Control & Automation Eng. / Prep Year", image: "/team/ayberk.jpeg", isLeader: false },
    { name: "Yusuf Kamil Turan", role: "Mechatronics Eng. / 1st Year", image: "/team/kamil.jpg", isLeader: false }
  ],
  mechanics: [
    { name: "Selim Keleşoğlu", role: "Mechanical Eng. / 1st Year", image: "/team/selim.jpg", isLeader: false },
    { name: "Ayaz Şenol", role: "Mechanical Eng. / 1st Year", image: "/team/ayaz.png", isLeader: false }
  ]
}

function TeamSection({ title, members }: { title: string, members: any[] }) {
  return (
    <div className="mb-32 mt-16 relative">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center tracking-wider">{title}</h2>
        <div className="team-grid">
          {members.map((member, idx) => (
            <div key={idx} className="team-card glass p-8 relative flex flex-col items-center">
              {member.isLeader && (
                <div className="leader-badge">
                  <Crown size={14} /> TEAM LEAD
                </div>
              )}
              {/* Photo Area */}
              <div className="team-photo-container group">
                 <User size={48} className="text-muted opacity-30 absolute" />
                 <img 
                   src={member.image} 
                   alt={member.name} 
                   className="team-photo"
                   onError={(e) => { e.currentTarget.style.display='none' }} 
                 />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-muted text-sm text-center mb-6 min-h-[40px] leading-relaxed">{member.role}</p>
              <div className="flex gap-4 mt-auto w-full justify-center pt-5 border-t border-border/50">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted hover:text-white hover:bg-accent transition-colors"><Mail size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted hover:text-white hover:bg-accent transition-colors"><Link2 size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  return (
      <div 
        className="pt-32 min-h-screen relative"
        style={{ 
          backgroundColor: '#000000',
          paddingBottom: '12rem'
        }}
      >
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-center">OUR TEAM</h1>
          <p className="text-xl text-muted max-w-2xl mb-32 mx-auto text-center">
            YILDIZ TECHNICAL UNIVERSITY UASK - ZENITH Rotary Wing UAV Team
          </p>
          <TeamSection title="Electronics" members={teamData.electronics} />
          <TeamSection title="Software" members={teamData.software} />
          <TeamSection title="Mechanics" members={teamData.mechanics} />
        </motion.div>
      </div>
    </div>
  )
}
