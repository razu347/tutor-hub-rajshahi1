import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home({ students }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    const results = students.filter(student => {
      const matchesSearch = student.school.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = filterClass === 'All' || student.studentClass === filterClass;
      return matchesSearch && matchesClass;
    });
    setFilteredStudents(results);
  }, [searchTerm, filterClass, students]);

  const classes = ['All', ...new Set(students.map(s => s.studentClass).filter(Boolean))].sort((a, b) => a - b);

  return (
    <div className="container">
      <Head>
        <title>Tutor Hub - Student Management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* CRITICAL: Link Preview Meta Tags */}
 
  <title>Tutor Hub - Student Management</title>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="রাজশাহীতে দক্ষ ও অভিজ্ঞ টিউটর খুঁজে পেতে আমাদের এই প্ল্যাটফর্মটি ব্যবহার করুন।" />

  {/* CRITICAL: Link Preview Meta Tags */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tutor-hub-rajshahi1.vercel.app" />
  <meta property="og:title" content="Tutor Hub" />
  <meta property="og:description" content="RU, RUET ও মেডিকেল শিক্ষার্থীদের মাধ্যমে সেরা টিউটর সেবা।" />
  
  {/* Image URL with standard aspect ratio */}
  <meta property="og:image" content="https://tutor-hub-rajshahi1.vercel.app/banner.jpeg" />
  <meta property="og:image:secure_url" content="https://tutor-hub-rajshahi1.vercel.app/banner.jpeg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* WhatsApp/Telegram Specific */}
  <meta property="og:site_name" content="Tutor Hub Rajshahi" />

  <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Hind+Siliguri:wght@400;600&display=swap" rel="stylesheet" />

      </Head>

      <header>
        <h1>Tutor Hub</h1>
        <p>All Student Management</p>
      </header>

      <div className="search-section">
        <div className="controls">
          <input 
            type="text" 
            placeholder="🔍 Search by School..." 
            className="search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="class-filter" onChange={(e) => setFilterClass(e.target.value)}>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls === 'All' ? 'Select Class' : `Class ${cls}`}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="grid">
        {filteredStudents.map((student, index) => {
          const waMessage = `প্রিয় ${student.name}, 

Tutor Hub এর পক্ষ থেকে শুভেচ্ছা রইলো। আমরা আপনার শহর রাজশাহীতে RU, Medical, RUET, Rajshahi College এর স্টুডেন্টদের সমন্বয়ে টিউটর সেবা প্রদান করছি।

আমাদের সার্ভিস সমূহ:
১. প্লে থেকে দ্বাদশ শ্রেণি পর্যন্ত একাডেমিক কার্যক্রম।
২. বিভিন্ন প্রতিযোগিতামূলক বা এডমিশন (Admission) পরীক্ষার জন্য স্পেশাল শিক্ষক প্রদান।
৩. অভিভাবকদের চাহিদা অনুযায়ী শিক্ষক প্রদান।
৪. দক্ষ‚ মেধাবী ও অভিজ্ঞ টিউটর প্যানেল।
৫. সাবজেক্ট ভিত্তিক অথবা একাধিক সাবজেক্ট ভিত্তিক টিউটর প্রদান।
৬. সিঙ্গেল অথবা গ্রুপভিত্তিক (৪/৫ জন একসাথে) টিউটর প্রদান।
৭. আপনার সুবিধামতো টিউটর বাছাই।
৮. বাসায় গিয়ে যত্ন সহকারে পড়ানো হয়।

যোগাযোগ: 
Facebook: www.facebook.com/TutorHubRajshahi
Mobile: 01611-305692`;

          const encodedMsg = encodeURIComponent(waMessage);
          const cleanPhone = student.number.replace(/[^0-9]/g, '');
          const waPhone = cleanPhone.startsWith('0') ? `88${cleanPhone}` : cleanPhone;

          return (
            <div className="card" key={index}>
              <h3>{student.name}</h3>
              <div className="details">
                <p><strong>School:</strong> {student.school}</p>
                <p><strong>Class:</strong> {student.studentClass}</p>
                <p><strong>Mobile:</strong> {student.number}</p>
              </div>
              <div className="actions">
                <a href={`tel:${student.number}`} className="btn call-btn">📞 Call</a>
                <a href={`https://wa.me/${waPhone}?text=${encodedMsg}`} target="_blank" rel="noreferrer" className="btn wa-btn">💬 SMS</a>
              </div>
            </div>
          );
        })}
      </main>

      <style jsx global>{`
        body { font-family: 'Hind Siliguri', sans-serif; margin: 0; background-color: #FFF5E6; color: #333; }
        header { background: #FF8C00; color: white; text-align: center; padding: 60px 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { font-family: 'Bree Serif', serif; font-size: 3.5rem; margin: 0; }
        header p { font-size: 1.2rem; opacity: 0.9; margin-top: 10px; }
        
        .search-section { display: flex; justify-content: center; margin-top: -35px; padding: 0 20px; }
        .controls { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); display: flex; gap: 15px; width: 100%; max-width: 800px; flex-wrap: wrap; }
        .search-bar, .class-filter { flex: 1; padding: 12px 15px; border: 2px solid #FFE0B3; border-radius: 8px; font-size: 1rem; outline: none; transition: 0.3s; font-family: 'Hind Siliguri'; min-width: 200px; }
        .search-bar:focus { border-color: #FF8C00; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; padding: 40px 20px; max-width: 1200px; margin: auto; }
        .card { background: white; padding: 25px; border-radius: 18px; border-left: 6px solid #FF8C00; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        h3 { font-family: 'Bree Serif', serif; margin: 0 0 15px 0; color: #E67E00; font-size: 1.5rem; }
        .details p { margin: 8px 0; font-size: 0.95rem; }
        
        .actions { display: flex; gap: 10px; margin-top: 25px; }
        .btn { flex: 1; text-align: center; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: 600; color: white; font-size: 0.9rem; transition: 0.2s; }
        .call-btn { background-color: #28a745; }
        .wa-btn { background-color: #25D366; }
        .btn:hover { opacity: 0.85; transform: scale(1.02); }

        @media (max-width: 600px) {
          h1 { font-size: 2.5rem; }
          .controls { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const sheetId = "1ojX3FtBGyS_gCxGBEoeV2X6x7SjZLowFB8rjiH3ygqI";
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Tutor Hub`;
  
  try {
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substring(47, text.length - 2));
    
    const students = json.table.rows.map(row => ({
      name: row.c[1]?.v || 'N/A',
      school: row.c[2]?.v || 'N/A',
      number: row.c[3]?.v?.toString() || '',
      studentClass: row.c[4]?.v?.toString() || 'N/A',
    }));

    return { props: { students } };
  } catch (error) {
    return { props: { students: [] } };
  }
}