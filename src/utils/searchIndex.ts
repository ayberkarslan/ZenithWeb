export type SearchCategory = 'Blog' | 'Vehicle Design' | 'Team' | 'Page';

export interface SearchRecord {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
}

// Vite glob import for blogs
const blogModules = import.meta.glob('../pages/blog/*.ts', { eager: true });

export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  // 1. Add static pages
  records.push({
    id: 'page-home',
    title: 'Home',
    description: 'YTU UASK Zenith X1 Next-Generation Autonomous Aerial System',
    category: 'Page',
    url: '/',
  });
  records.push({
    id: 'page-sponsors',
    title: 'Sponsors & Partners',
    description: 'The companies and institutions supporting our SUAS 2026 journey.',
    category: 'Page',
    url: '/sponsors',
  });
  records.push({
    id: 'page-team',
    title: 'Meet the Team',
    description: 'The engineering minds behind the machine.',
    category: 'Team',
    url: '/team',
  });

  const teamMembers = [
    { name: "Huzeyfe Fazıl Koç", role: "Elektronik ve Haberleşme Müh. / Electronics Team Leader" },
    { name: "Yusuf Yasir İncal", role: "Elektronik ve Haberleşme Müh. / Electronics Team" },
    { name: "Muharrem Sait Çoktaş", role: "Harita Müh. / Software Team" },
    { name: "Muhammet Ayberk Arslan", role: "Kontrol ve Otomasyon Müh. / Software Team" },
    { name: "Yusuf Kamil Turan", role: "Mekatronik Müh. / Software Team" },
    { name: "Selim Keleşoğlu", role: "Makine Müh. / Mechanics Team" },
    { name: "Ayaz Şenol", role: "Makine Müh. / Mechanics Team" }
  ];

  teamMembers.forEach((m, idx) => {
    records.push({
      id: `member-${idx}`,
      title: m.name,
      description: m.role,
      category: 'Team',
      url: '/team' // Will jump to them if ?search=name is passed
    });
  });

  // 2. Add Vehicle Design Sections
  records.push({
    id: 'vd-airframe',
    title: 'Carbon Fiber Rigidity (Airframe)',
    description: 'Mechanical design, aluminum vs carbon fiber trade-off, and vibration rejection.',
    category: 'Vehicle Design',
    url: '/vehicle-design#airframe',
  });
  records.push({
    id: 'vd-avionics',
    title: 'Pixhawk & Jetson Synergy (Avionics)',
    description: 'Triple redundant state estimation, high-bandwidth telemetry, and hardware architecture.',
    category: 'Vehicle Design',
    url: '/vehicle-design#avionics',
  });
  records.push({
    id: 'vd-software',
    title: 'Visual Node-Based Mission Planner',
    description: 'Custom drag-and-drop mission generation software for SUAS.',
    category: 'Vehicle Design',
    url: '/vehicle-design#software',
  });
  records.push({
    id: 'vd-yolo',
    title: 'Custom Trained YOLO Architecture',
    description: 'Computer vision model trained on 10,000 images running at 45 FPS on Jetson Orin.',
    category: 'Vehicle Design',
    url: '/vehicle-design#cv',
  });

  // 3. Dynamically Add Blogs
  Object.keys(blogModules).forEach((path) => {
    const mod = blogModules[path] as any;
    if (mod.post) {
      // path is like '../pages/blog/1.ts'
      const match = path.match(/\/(\d+)\.ts$/);
      const postId = match ? match[1] : '';
      
      // We take the excerpt or first 80 chars of the content for search preview
      const plainContent = mod.post.content.replace(/<[^>]+>/g, '').trim();
      const desc = plainContent.substring(0, 80) + '...';

      records.push({
        id: `blog-${postId}`,
        title: mod.post.title,
        description: desc,
        category: 'Blog',
        url: `/dev-log?post=${postId}`,
      });
    }
  });

  return records;
}
