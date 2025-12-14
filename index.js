import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

export default function Home() {
  const [motionLib, setMotionLib] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const loadMotion = async () => {
      try { const mod = await import('framer-motion'); setMotionLib(mod); } 
      catch { console.warn('Framer Motion failed to load.'); }
    };
    loadMotion();
  }, []);

  const MotionDiv = motionLib ? motionLib.motion.div : 'div';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/submit-lead', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ ...formData, site: 'Welsh Mole Catcher' }) 
      });
      setSubmitStatus(res.ok ? 'success' : 'error');
      if(res.ok) setFormData({ name: '', email: '', message: '' });
    } catch { setSubmitStatus('error'); }
  };

  return (
    <div>
      <Head>
        <title>Welsh Mole Catcher | Traditional Poison-Free Mole Control Wales</title>
        <meta name="description" content="Expert traditional mole catching in Brecon, Merthyr, and Neath. 100% poison-free trapping for gardens and farms. Call the specialist at 07375 303124." />
        <link rel="icon" href="/favicon.ico" />
        {/* FAQ Schema for SEO boost */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do you catch moles without poison?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use traditional professional trapping methods (Duffus and claw traps) which are 100% poison-free and safe for pets and livestock."
                }
              },
              {
                "@type": "Question",
                "name": "What areas of Wales do you cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide mole catching services across Brecon, Merthyr Tydfil, Glynneath, Ammanford, and the surrounding rural areas."
                }
              }
            ]
          })}
        </script>
      </Head>

      {/* Navbar */}
      <nav className="bg-[#1a1c14] text-[#f5e8c7] p-4 sticky top-0 z-50 shadow-xl border-b border-[#a8c686]/30">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"><a className="text-xl md:text-2xl font-heading font-bold tracking-tight">Welsh Mole Catcher</a></Link>
          <div className="hidden lg:flex space-x-8 font-semibold">
            {['Home','Services','Gallery','Contact'].map(section => (
              <Link key={section} href={`#${section.toLowerCase()}`}>
                <a className="hover:text-[#a8c686] transition-colors">{section}</a>
              </Link>
            ))}
          </div>
          <a href="tel:07375303124" className="bg-[#a8c686] text-[#1a1c14] px-5 py-2 rounded-full font-bold shadow-md hover:bg-[#8ba567] transition-all">
            07375 303124
          </a>
        </div>
      </nav>

      {/* Hero */}
      <MotionDiv 
        className="relative h-[85vh] bg-fixed bg-cover bg-center text-[#f5e8c7]" 
        style={{ backgroundImage: "url('/moles_collage.jpg')" }} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 p-1 rounded-full bg-[#a8c686]/20 animate-pulse">
             <Image src="/logo.png" alt="Welsh Mole Catcher Logo" width={140} height={140} className="rounded-full border-2 border-[#a8c686]" />
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-bold leading-none mb-4">Master Mole Catcher</h1>
          <p className="text-xl md:text-3xl font-light italic text-[#a8c686] max-w-3xl">
            "No Mole, No Fee" - Traditional Trapping for the Welsh Countryside
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-5">
            <Link href="#contact"><a className="bg-[#a8c686] text-[#1a1c14] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">Book a Visit</a></Link>
            <a href="tel:07375303124" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Call The Catcher
            </a>
          </div>
        </div>
      </MotionDiv>

      {/* Trust Bar */}
      <div className="bg-[#2f2a1d] py-4 border-y border-[#a8c686]/20">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-[#a8c686] font-bold text-sm uppercase tracking-widest">
          <span>✓ Poison Free</span>
          <span>✓ Red Tractor Friendly</span>
          <span>✓ Pet & Livestock Safe</span>
          <span>✓ Fully Insured</span>
        </div>
      </div>

      {/* Specialized Services */}
      <section id="services" className="py-24 bg-[#f9f5e8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading text-[#3e2d20] mb-6">Expert Mole Trapping</h2>
          <div className="w-24 h-1 bg-[#a8c686] mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-[#a8c686]">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-2xl font-heading mb-4 text-[#3e2d20]">Domestic Lawns</h3>
              <p className="text-[#4a3b30]">Discreet and efficient service for private gardens. We clear the moles without damaging your turf or risking your pets.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-[#a8c686]">
              <div className="text-4xl mb-4">🚜</div>
              <h3 className="text-2xl font-heading mb-4 text-[#3e2d20]">Agricultural Lands</h3>
              <p className="text-[#4a3b30]">Specialist mole control for silage fields and grazing land. Reducing the risk of Listeriosis in livestock.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-[#a8c686]">
              <div className="text-4xl mb-4">⛳</div>
              <h3 className="text-2xl font-heading mb-4 text-[#3e2d20]">Commercial Space</h3>
              <p className="text-[#4a3b30]">Grounds maintenance for golf courses, schools, and business parks across South & Mid Wales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading text-[#3e2d20] mb-12">The Catcher in Action</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['/moles_collage.jpg','/farm_moles.jpg','/farm_son.jpg','/farm_john_mole.jpg'].map((src,i) => (
              <div key={i} className="group overflow-hidden rounded-xl aspect-[4/5] relative shadow-lg">
                <Image src={src} alt="Mole Catching Wales" layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section id="contact" className="py-24 bg-[#f0ead6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#1a1c14] text-[#f5e8c7] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 md:p-16 bg-[#2f2a1d]">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">Contact the Expert</h2>
              <p className="text-[#a8c686] text-xl mb-8 font-light italic">"Solving mole problems where others have failed."</p>
              
              <div className="space-y-6">
                <a href="tel:07375303124" className="flex items-center space-x-4 group">
                  <span className="bg-[#a8c686] p-4 rounded-full text-black group-hover:scale-110 transition-transform">📞</span>
                  <span className="text-2xl font-bold">07375 303124</span>
                </a>
                <div className="flex items-center space-x-4">
                  <span className="bg-[#a8c686]/20 p-4 rounded-full">📍</span>
                  <span className="text-lg">Serving Brecon, Merthyr, Neath & Valleys</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="md:w-1/2 p-10 md:p-16 space-y-5 bg-[#1a1c14]">
              {['name','email','message'].map(field => (
                <div key={field}>
                  <label className="block text-[#a8c686] mb-2 font-semibold uppercase text-xs tracking-widest">{field}</label>
                  {field==='message' ? 
                    <textarea name={field} value={formData[field]} onChange={handleChange} rows="4" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#a8c686] outline-none transition-all text-white" placeholder="Describe the problem..." required /> :
                    <input type={field==='email'?'email':'text'} name={field} value={formData[field]} onChange={handleChange} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#a8c686] outline-none transition-all text-white" placeholder={`Your ${field}`} required />
                  }
                </div>
              ))}
              <button type="submit" className="w-full bg-[#a8c686] text-[#1a1c14] py-5 rounded-xl font-bold text-xl hover:bg-[#8ba567] transition-all transform hover:-translate-y-1 shadow-lg">
                Submit Inquiry
              </button>
              {submitStatus==='success' && <p className="text-[#a8c686] font-bold mt-4 text-center">Message sent! I'll call you shortly.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1c14] text-[#a8c686] py-12 text-center border-t border-[#a8c686]/10">
        <div className="container mx-auto px-4">
          <p className="text-white opacity-80 mb-6">Part of Welsh Town & Country Pest Services</p>
          <div className="flex justify-center space-x-8 mb-8 text-sm uppercase tracking-widest font-bold">
            <a href="https://www.welshtownandcountrypestservices.co.uk" className="hover:text-white transition-colors">Main Business</a>
            <Link href="#services"><a className="hover:text-white">Our Work</a></Link>
            <Link href="#contact"><a className="hover:text-white">Emergency Call-Out</a></Link>
          </div>
          <p className="text-xs opacity-40">© 2025 Welsh Mole Catcher. Specialist Traditional Vermin Control.</p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        body { font-family:'Montserrat', sans-serif; background:#fefbf6; color:#1a1c14; line-height:1.6; scroll-behavior:smooth; }
        .font-heading { font-family:'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
