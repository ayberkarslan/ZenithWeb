import { Mail, Link2, User } from 'lucide-react'
import './Team.css'

const teamData = {
  electronics: [
    { name: "", role: "Takım Kaptanı", dept: "Elektronik ve Haberleşme Müh. / 2. Sınıf" },
    { name: "", role: "Elektronik Ekip Üyesi", dept: "Elektronik ve Haberleşme Müh. / 2. Sınıf" }
  ],
  software: [
    { name: "", role: "Yazılım Ekip Üyesi", dept: "Harita Müh. / 2. Sınıf" },
    { name: "", role: "Yazılım Ekip Üyesi", dept: "Mekatronik Müh. / 1. Sınıf" },
    { name: "", role: "Yazılım Ekip Üyesi", dept: "Kontrol ve Otomasyon Müh. / Hazırlık" }
  ],
  mechanics: [
    { name: "", role: "Mekanik Tasarım Ekip Üyesi", dept: "Makine Müh. / 1. Sınıf" },
    { name: "", role: "Mekanik Tasarım Ekip Üyesi", dept: "Makine Müh. / 1. Sınıf" }
  ],
  organization: [
    { name: "", role: "Organizasyon Sorumlusu", dept: "Departman / Sınıf" }
  ]
}

function TeamSection({ title, members }: { title: string, members: any[] }) {
  return (
    <section className="team-section">
      <h2 className="team-section-title">{title}</h2>
      <div className="team-grid">
        {members.map((member, index) => (
          <div key={index} className="team-card glass">
            <div className="team-image-placeholder">
              <User size={48} opacity={0.2} />
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <div className="team-role">{member.role}</div>
              <div className="team-dept">{member.dept}</div>
              
              <div className="team-socials">
                <a href="#" className="social-link" title="Email"><Mail size={16} /></a>
                <a href="#" className="social-link" title="LinkedIn"><Link2 size={16} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Team() {
  return (
    <div className="team-page page-container">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">OUR TEAM</h1>
          <p className="page-subtitle text-muted">
            Talented students from different engineering disciplines united to pioneer autonomous UAV systems.
          </p>
        </header>

        <div className="team-content">
          <TeamSection title="Electronics Team" members={teamData.electronics} />
          <TeamSection title="Software Team" members={teamData.software} />
          <TeamSection title="Mechanics & Design Team" members={teamData.mechanics} />
          <TeamSection title="Organization Team" members={teamData.organization} />
        </div>
      </div>
    </div>
  )
}
