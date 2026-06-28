import { motion } from 'framer-motion'
import { Mail, Link2, User, Crown, Cpu, Code, Settings, Users } from 'lucide-react'
import './Team.css'

const teamData = {
  electronics: [
    { name: "Ahmet Yılmaz", role: "Elektronik ve Haberleşme Müh. / 2. Sınıf", image: "/team/ahmet.jpg", isLeader: true },
    { name: "Mehmet Demir", role: "Elektronik ve Haberleşme Müh. / 2. Sınıf", image: "/team/mehmet.jpg", isLeader: false }
  ],
  software: [
    { name: "Ayşe Kaya", role: "Harita Müh. / 2. Sınıf", image: "/team/ayse.jpg", isLeader: false },
    { name: "Fatma Çelik", role: "Mekatronik Müh. / 1. Sınıf", image: "/team/fatma.jpg", isLeader: false },
    { name: "Ali Yıldız", role: "Kontrol ve Otomasyon Müh. / Hazırlık", image: "/team/ali.jpg", isLeader: false }
  ],
  mechanics: [
    { name: "Veli Şahin", role: "Makine Müh. / 1. Sınıf", image: "/team/veli.jpg", isLeader: false },
    { name: "Hasan Öz", role: "Makine Müh. / 1. Sınıf", image: "/team/hasan.jpg", isLeader: false }
  ],
  organization: [
    { name: "Zeynep Arslan", role: "Departman / Sınıf", image: "/team/zeynep.jpg", isLeader: false }
  ]
}

function TeamSection({ title, members, icon: Icon, align = "right" }: { title: string, members: any[], icon: any, align?: "left" | "right" }) {
  return (
    <div className="mb-32 relative overflow-visible">
      {/* Floating Graphic Background */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${align === "right" ? "-right-10 md:-right-32" : "-left-10 md:-left-32"} opacity-[0.04] text-accent pointer-events-none select-none z-0 transform ${align === "right" ? "rotate-12" : "-rotate-12"}`}>
        <Icon size={400} />
      </div>

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
    <div className="pt-24 pb-16 container min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-center">OUR TEAM</h1>
        <p className="text-xl text-muted max-w-2xl mb-24 mx-auto text-center">
          YTU UASK - ZENITH Döner Kanat İHA Takımı
        </p>

        <TeamSection title="Electronics" members={teamData.electronics} icon={Cpu} align="left" />
        <TeamSection title="Software" members={teamData.software} icon={Code} align="right" />
        <TeamSection title="Mechanics" members={teamData.mechanics} icon={Settings} align="left" />
        <TeamSection title="Organization" members={teamData.organization} icon={Users} align="right" />
      </motion.div>
    </div>
  )
}
