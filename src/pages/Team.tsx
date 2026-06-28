import { motion } from 'framer-motion'
import { Mail, Link2, User, Crown, Cpu, Code, Settings, Users } from 'lucide-react'
import './Team.css'

const teamData = {
  electronics: [
    { name: "Ahmet Yılmaz", role: "Elektronik ve Haberleşme Müh. / 2. Sınıf", isLeader: true },
    { name: "Mehmet Demir", role: "Elektronik ve Haberleşme Müh. / 2. Sınıf", isLeader: false }
  ],
  software: [
    { name: "Ayşe Kaya", role: "Harita Müh. / 2. Sınıf", isLeader: false },
    { name: "Fatma Çelik", role: "Mekatronik Müh. / 1. Sınıf", isLeader: false },
    { name: "Ali Yıldız", role: "Kontrol ve Otomasyon Müh. / Hazırlık", isLeader: false }
  ],
  mechanics: [
    { name: "Veli Şahin", role: "Makine Müh. / 1. Sınıf", isLeader: false },
    { name: "Hasan Öz", role: "Makine Müh. / 1. Sınıf", isLeader: false }
  ],
  organization: [
    { name: "Zeynep Arslan", role: "Departman / Sınıf", isLeader: false }
  ]
}

function TeamSection({ title, members, icon: Icon }: { title: string, members: any[], icon: any }) {
  return (
    <div className="mb-20">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Icon className="text-accent opacity-80" size={32} />
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-wider">{title}</h2>
        <Icon className="text-accent opacity-80" size={32} />
      </div>
      <div className="team-grid">
        {members.map((member, idx) => (
          <div key={idx} className="team-card glass p-6 relative flex flex-col items-center">
            {member.isLeader && (
              <div className="leader-badge absolute top-3 right-3 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(10,132,255,0.5)]">
                <Crown size={12} /> LİDER
              </div>
            )}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-secondary flex items-center justify-center mb-4 overflow-hidden shadow-inner border border-accent/20">
               <User size={40} className="text-muted opacity-40" />
            </div>
            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
            <p className="text-muted text-xs text-center mb-4 min-h-[34px]">{member.role}</p>
            <div className="flex gap-4 mt-auto w-full justify-center pt-4 border-t border-border">
              <a href="#" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted hover:text-white hover:bg-accent transition-colors"><Mail size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted hover:text-white hover:bg-accent transition-colors"><Link2 size={16} /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <div className="pt-24 pb-16 container min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-center">OUR TEAM</h1>
        <p className="text-lg text-muted max-w-2xl mb-16 mx-auto text-center">
          YTU UASK - ZENITH Döner Kanat İHA Takımı
        </p>

        <TeamSection title="Electronics" members={teamData.electronics} icon={Cpu} />
        <TeamSection title="Software" members={teamData.software} icon={Code} />
        <TeamSection title="Mechanics" members={teamData.mechanics} icon={Settings} />
        <TeamSection title="Organization" members={teamData.organization} icon={Users} />
      </motion.div>
    </div>
  )
}
