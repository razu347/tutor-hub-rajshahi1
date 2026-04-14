import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home({ students }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [filteredStudents, setFilteredStudents] = useState(students);

  // সার্চ এবং ফিল্টারিং লজিক
  useEffect(() => {
    const results = students.filter(student => {
      const matchesSearch = student.school.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = filterClass === 'All' || student.studentClass === filterClass;
      return matchesSearch && matchesClass;
    });
    setFilteredStudents(results);
  }, [searchTerm, filterClass, students]);

  // ড্রপডাউনের জন্য ইউনিক ক্লাস লিস্ট বের করা
  const classes = ['All', ...new Set(students.map(s => s.studentClass).filter(Boolean))].sort((a, b) => a - b);

  return (
    <div className="container">
      <Head>
        <title>Tutor Hub</title>
  <meta name="description" content="রাজশাহীতে RU, RUET, Medical ও RC শিক্ষার্থীদের মাধ্যমে সেরা টিউটর সেবা।" />
  
  {/* Link Preview (Open Graph) Meta Tags */}
  <meta property="og:title" content="Tutor Hub - Student Management" />
  <meta property="og:description" content="রাজশাহীতে দক্ষ ও অভিজ্ঞ টিউটর খুঁজে পেতে আমাদের এই প্ল্যাটফর্মটি ব্যবহার করুন।" />
  
  {/* এখানে আপনার আপলোড করা ছবির ডিরেক্ট লিঙ্ক দিন */}
  <meta property="og:image" content="https://tutor-hub-rajshahi.vercel.app/banner.jpeg" /> 
  
  <meta property="og:url" content="https://tutor-hub-rajshahi.vercel.app" />
  <meta property="og:type" content="website" />
  
  {/* WhatsApp স্পেসিফিক থাম্বনেইল নিশ্চিত করতে */}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="1200" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Hind+Siliguri:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <h1>Tutor Hub</h1>
        <p>All Student Management</p>
      </header>

      <div className="controls">
        <input 
          type="text" 
          placeholder="🔍 Search by School..." 
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select" onChange={(e) => setFilterClass(e.target.value)}>
          {classes.map(cls => (
            <option key={cls} value={cls}>
              {cls === 'All' ? 'All Classes' : `Class ${cls}`}
            </option>
          ))}
        </select>
      </div>

      <main className="grid">
        {filteredStudents.length > 0 ? filteredStudents.map((student, index) => {
          
          // আপনার দেওয়া পূর্ণাঙ্গ হোয়াটসঅ্যাপ মেসেজ টেমপ্লেট
          const waMessage = `প্রিয় ${student.name}, Tutor Hub এর পক্ষ থেকে শুভেচ্ছা রইলো। আমরা আপনার শহর রাজশাহীতে RU, Medical, RUET, Rajshahi College এর স্টুডেন্টদের সমন্বয়ে টিউটর সেবা প্রদান করছি।

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
          const cleanNumber = student.number.replace(/[^0-9]/g, '');
          const waNumber = cleanNumber.startsWith('0') ? `88${cleanNumber}` : cleanNumber;

          return (
            <div className="card" key={index}>
              <div className="card-body">
                <h3>{student.name}</h3>
                <div className="info">
                  <p><strong>School:</strong> {student.school}</p>
                  <p><strong>Class:</strong> {student.studentClass}</p>
                  <p><strong>Mobile:</strong> {student.number}</p>
                </div>
              </div>
              <div className="btn-group">
                <a href={`tel:${student.number}`} className="btn btn-call">📞 Call Now</a>
                <a href={`https://wa.me/${waNumber}?text=${encodedMsg}`} target="_blank" rel="noreferrer" className="btn btn-wa">💬 WhatsApp</a>
              </div>
            </div>
          );
        }) : <p className="no-results">No students found!</p>}
      </main>

      <style jsx global>{`
        body { 
          font-family: 'Hind Siliguri', sans-serif; 
          background: #fdf2e9; 
          margin: 0; 
          color: #333;
        }
        header { 
          background: #FF8C00; 
          color: white; 
          text-align: center; 
          padding: 50px 20px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
        }
        h1 { 
          font-family: 'Bree Serif', serif; 
          margin: 0; 
          font-size: 3.5rem; 
          letter-spacing: 1px;
        }
        header p { font-size: 1.2rem; margin-top: 10px; opacity: 0.9; }
        
        .container { max-width: 1200px; margin: auto; }
        
        .controls { 
          display: flex; 
          gap: 15px; 
          padding: 30px 20px; 
          flex-wrap: wrap; 
          justify-content: center; 
          margin-top: -30px;
        }
        .search-input, .filter-select { 
          padding: 15px; 
          border-radius: 10px; 
          border: none; 
          width: 320px; 
          font-family: 'Hind Siliguri';
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          font-size: 1rem;
        }
        
        .grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
          gap: 25px; 
          padding: 20px; 
        }
        
        .card { 
          background: white; 
          border-radius: 15px; 
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
          border-bottom: 5px solid #FF8C00;
          box-shadow: 0 6px 15px rgba(0,0,0,0.05);
        }
        .card:hover { transform: translateY(-8px); }
        .card-body { padding: 25px; flex-grow: 1; }
        
        h3 { 
          font-family: 'Bree Serif', serif; 
          color: #FF8C00; 
          margin: 0 0 15px 0; 
          font-size: 1.6rem; 
        }
        .info p { margin: 8px 0; font-size: 1rem; color: #555; }
        
        .btn-group { display: flex; padding: 15px; gap: 10px; background: #fafafa; }
        .btn { 
          flex: 1; 
          text-align: center; 
          padding: 12px; 
          border-radius: 8px; 
          text-decoration: none; 
          color: white; 
          font-weight: 600; 
          font-size: 0.9rem;
          transition: opacity 0.2s;
        }
        .btn:hover { opacity: 0.85; }
        .btn-call { background: #28a745; }
        .btn-wa { background: #25D366; }
        
        .no-results { text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #888; margin-top: 50px; }

        @media (max-width: 600px) {
          h1 { font-size: 2.5rem; }
          .search-input, .filter-select { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// Google Sheet থেকে ডেটা ফেচ করার অংশ
export async function getServerSideProps() {
  const sheetId = "1ojX3FtBGyS_gCxGBEoeV2X6x7SjZLowFB8rjiH3ygqI";
  // 'Tutor Hub' শিটের নাম ব্যবহার করা হয়েছে
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Tutor Hub`;
  
  try {
    const res = await fetch(url);
    const text = await res.text();
    // Google Visualization API এর JSON থেকে ডেটা ক্লিন করা
    const json = JSON.parse(text.substring(47, text.length - 2));
    
    const students = json.table.rows.map(row => ({
      name: row.c[1]?.v || 'Unknown',
      school: row.c[2]?.v || 'Not Specified',
      number: row.c[3]?.v?.toString() || '',
      studentClass: row.c[4]?.v?.toString() || 'N/A',
    }));

    return { props: { students } };
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return { props: { students: [] } };
  }
}