import { motion } from 'framer-motion'
import { Mail, Link2, User, Crown } from 'lucide-react'
import './Team.css'

const teamData = {
  electronics: [
    { name: "Ahmet Yılmaz", role: "Elektronik ve Haberleşme Müh. / 2. Sınıf", image: "/team/placeholder.jpg", isLeader: true },
    { name: "Mehmet Demir", role: "Elektronik ve Haberleşme Müh. / 2. Sınıf", image: "/team/placeholder.jpg", isLeader: false }
  ],
  software: [
    { name: "Ayşe Kaya", role: "Harita Müh. / 2. Sınıf", image: "/team/placeholder.jpg", isLeader: false },
    { name: "Fatma Çelik", role: "Mekatronik Müh. / 1. Sınıf", image: "/team/placeholder.jpg", isLeader: false },
    { name: "Ali Yıldız", role: "Kontrol ve Otomasyon Müh. / Hazırlık", image: "/team/placeholder.jpg", isLeader: false }
  ],
  mechanics: [
    { name: "Veli Şahin", role: "Makine Müh. / 1. Sınıf", image: "/team/placeholder.jpg", isLeader: false },
    { name: "Hasan Öz", role: "Makine Müh. / 1. Sınıf", image: "/team/placeholder.jpg", isLeader: false }
  ],
  organization: [
    { name: "Zeynep Arslan", role: "Departman / Sınıf", image: "/team/placeholder.jpg", isLeader: false }
  ]
}

function TeamSection({ title, members }: { title: string, members: any[] }) {
  return (
    <div className="mb-32 relative overflow-visible">
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-wider">{title}</h2>
        <div className="team-grid">
          {members.map((member, idx) => (
            <div key={idx} className="team-card glass p-8 relative flex flex-col items-center">
              {member.isLeader && (
                <div className="leader-badge absolute top-4 right-4 bg-accent text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(10,132,255,0.6)] z-20">
                  <Crown size={14} /> LİDER
                </div>
              )}
              {/* Photo Area */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary/50 flex items-center justify-center mb-6 overflow-hidden shadow-[0_0_20px_rgba(10,132,255,0.15)] border-2 border-accent/20 relative group">
                 <User size={48} className="text-muted opacity-30 absolute" />
                 <img 
                   src={member.image} 
                   alt={member.name} 
                   className="w-full h-full object-cover z-10 relative bg-secondary"
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
      className="pt-24 pb-32 min-h-screen relative"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(/blueprint.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-center">OUR TEAM</h1>
          <p className="text-xl text-muted max-w-2xl mb-24 mx-auto text-center">
            YTU UASK - ZENITH Döner Kanat İHA Takımı
          </p>

          <TeamSection title="Electronics" members={teamData.electronics} />
          <TeamSection title="Software" members={teamData.software} />
          <TeamSection title="Mechanics" members={teamData.mechanics} />
          <TeamSection title="Organization" members={teamData.organization} />
        </motion.div>
      </div>
    </div>
  )
}
