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
      const res = await fetch('/api/submit-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      setSubmitStatus(res.ok ? 'success' : 'error');
      if(res.ok) setFormData({ name: '', email: '', message: '' });
    } catch { setSubmitStatus('error'); }
  };

  return (
    <div>
      <Head>
        <title>Welsh Mole Catcher | Pest Control Wales</title>
        <meta name="description" content="Expert mole catching & pest control in Wales. Call 07375 303124!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="bg-[#2f2a1d] text-[#f5e8c7] p-4 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"><a className="text-2xl font-heading">Welsh Mole Catcher</a></Link>
          <ul className="flex space-x-6">
            {['Home','Services','Gallery','Contact','FAQs'].map(section => <li key={section}><Link href={`#${section.toLowerCase()}`}><a className="hover:text-[#a8c686]">{section}</a></Link></li>)}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <MotionDiv className="relative h-screen bg-cover bg-center text-[#f5e8c7]" style={{ backgroundImage: "url('/moles_collage.jpg')" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center">
          <Image src="/logo.png" alt="Logo" width={150} height={150} className="rounded-full border-4 border-[#a8c686] mb-4" />
          <h1 className="text-5xl md:text-7xl font-heading">Welsh Mole Catcher</h1>
          <p className="mt-4 text-xl md:text-2xl">Traditional Pest Control in Wales</p>
          <Link href="#contact"><a className="mt-6 inline-block bg-[#a8c686] text-[#3e2d20] px-6 py-3 rounded-lg hover:bg-[#8ba567]">Get in Touch</a></Link>
        </div>
      </MotionDiv>

      {/* Services */}
      <section id="services" className="py-16 bg-[#f0ead6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading text-[#3e2d20] mb-8 border-b-2 border-[#a8c686] inline-block">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {title:'Mole Trapping', desc:'Effective mole control using traditional, safe traps.'},
              {title:'Pest Control', desc:'Manage rats, mice, wasps, bees, and squirrels safely.'}
            ].map(s => (
              <div key={s.title} className="bg-[#f9f5e8] p-6 rounded-xl shadow-md border border-[#d4c9a5] hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-heading mb-2">{s.title}</h3>
                <p className="text-[#4a3b30]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-[#fefbf6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading text-[#3e2d20] mb-8 border-b-2 border-[#a8c686] inline-block">Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {['/moles_collage.jpg','/farm_moles.jpg','/farm_son.jpg','/farm_john_mole.jpg'].map((src,i) => (
              <div key={i} className="cursor-pointer">
                <Image src={src} alt="Gallery Image" width={300} height={200} className="rounded-lg shadow-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-[#f0ead6]">
        <div className="container mx-auto px-4 max-w-lg">
          <h2 className="text-4xl font-heading text-center mb-6 border-b-2 border-[#a8c686] inline-block">Contact Us</h2>
          <p className="text-center mb-4">Call us at <a href="tel:07375303124" className="text-[#3e2d20]">07375 303124</a> or send a message:</p>
          <form onSubmit={handleSubmit} className="bg-[#f9f5e8] p-6 rounded-xl shadow-md border border-[#d4c9a5]">
            {['name','email','message'].map(field => (
              <div key={field} className="mb-4">
                <label className="block text-[#4a3b30] mb-1 font-body capitalize">{field}</label>
                {field==='message' ? 
                  <textarea name={field} value={formData[field]} onChange={handleChange} rows="4" className="w-full p-2 border rounded-lg border-[#d4c9a5] focus:outline-none focus:border-[#a8c686] bg-[#fefbf6]" placeholder="Your message" required /> :
                  <input type={field==='email'?'email':'text'} name={field} value={formData[field]} onChange={handleChange} className="w-full p-2 border rounded-lg border-[#d4c9a5] focus:outline-none focus:border-[#a8c686] bg-[#fefbf6]" placeholder={`Your ${field}`} required />
                }
              </div>
            ))}
            <button type="submit" className="w-full bg-[#3e2d20] text-[#f5e8c7] p-2 rounded-lg hover:bg-[#785f45]">Send Message</button>
            {submitStatus==='success' && <p className="text-[#a8c686] mt-4 text-center">Thank you! We’ll get back to you soon.</p>}
            {submitStatus==='error' && <p className="text-red-500 mt-4 text-center">Something went wrong. Try again.</p>}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2f2a1d] text-[#f5e8c7] py-6 text-center">
        <p>© 2025 Welsh Mole Catcher | <a href="https://www.welshtownandcountry.co.uk" className="text-[#a8c686] hover:underline">Main Site</a></p>
      </footer>

      <style jsx global>{`
        body { font-family:'Open Sans', sans-serif; background:#fefbf6; color:#4a3b30; line-height:1.6; scroll-behavior:smooth; }
        .font-heading { font-family:'Playfair Display', serif; }
      `}</style>
    </div>
  );
}