import { motion } from 'framer-motion'
import { Mail, Link2, User, Crown } from 'lucide-react'
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

function TeamSection({ title, members }: { title: string, members: any[] }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="team-grid">
        {members.map((member, idx) => (
          <div key={idx} className="team-card glass p-4 relative flex flex-col items-center">
            {member.isLeader && (
              <div className="leader-badge absolute top-3 right-3 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(10,132,255,0.5)]">
                <Crown size={12} /> LİDER
              </div>
            )}
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3 overflow-hidden shadow-inner border border-border">
               <User size={28} className="text-muted opacity-40" />
            </div>
            <h3 className="text-base font-bold mb-1">{member.name}</h3>
            <p className="text-muted text-[11px] text-center mb-3 min-h-[30px]">{member.role}</p>
            <div className="flex gap-3 mt-auto w-full justify-center pt-3 border-t border-border">
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted hover:text-white hover:bg-accent transition-colors"><Mail size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted hover:text-white hover:bg-accent transition-colors"><Link2 size={14} /></a>
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
        <h1 className="text-4xl font-bold mb-2 text-center">OUR TEAM</h1>
        <p className="text-base text-muted max-w-2xl mb-10 mx-auto text-center">
          YTU UASK - ZENITH Döner Kanat İHA Takımı
        </p>

        <TeamSection title="Electronics Team" members={teamData.electronics} />
        <TeamSection title="Software Team" members={teamData.software} />
        <TeamSection title="Mechanics & Design Team" members={teamData.mechanics} />
        <TeamSection title="Organization Team" members={teamData.organization} />
      </motion.div>
    </div>
  )
}
