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
        <title>Welsh Mole Catcher | Traditional Pest Control Wales</title>
        <meta name="description" content="Traditional, poison-free mole catching & pest control in Wales. Farm & garden specialists. Call 07375 303124 today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="bg-[#2f2a1d] text-[#f5e8c7] p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/"><a className="text-2xl font-heading font-bold">Welsh Mole Catcher</a></Link>
          <ul className="hidden md:flex space-x-6">
            {['Home','Services','Gallery','Contact','FAQs'].map(section => (
              <li key={section}>
                <Link href={`#${section.toLowerCase()}`}>
                  <a className="hover:text-[#a8c686] transition-colors">{section}</a>
                </Link>
              </li>
            ))}
          </ul>
          <a href="tel:07375303124" className="bg-[#a8c686] text-[#2f2a1d] px-4 py-2 rounded-full font-bold md:hidden">Call Now</a>
        </div>
      </nav>

      {/* Hero */}
      <MotionDiv 
        className="relative h-[90vh] bg-cover bg-center text-[#f5e8c7]" 
        style={{ backgroundImage: "url('/moles_collage.jpg')" }} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <Image src="/logo.png" alt="Welsh Town and Country Logo" width={150} height={150} className="rounded-full border-4 border-[#a8c686] mb-6 shadow-2xl" />
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">Welsh Mole Catcher</h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl">Traditional, Poison-Free Pest Control for Farms, Gardens & Businesses across Wales.</p>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link href="#contact"><a className="bg-[#a8c686] text-[#3e2d20] px-8 py-4 rounded-lg font-bold hover:bg-[#8ba567] transition-all transform hover:scale-105">Request a Quote</a></Link>
            <a href="tel:07375303124" className="bg-white text-[#3e2d20] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all">07375 303124</a>
          </div>
        </div>
      </MotionDiv>

      {/* Services */}
      <section id="services" className="py-20 bg-[#f0ead6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading text-[#3e2d20] mb-4 inline-block border-b-4 border-[#a8c686]">Our Services</h2>
          <p className="text-[#4a3b30] mb-12 max-w-xl mx-auto">Specializing in traditional methods that are 100% safe for livestock, pets, and children.</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {title:'Traditional Mole Trapping', desc:'No poisons or gassing. We use professional Duffus traps for guaranteed results in gardens and silage fields.'},
              {title:'Farm Pest Management', desc:'Red Tractor friendly rodent control, wasp nest removal, and bird management for agricultural clients.'}
            ].map(s => (
              <div key={s.title} className="bg-[#f9f5e8] p-8 rounded-xl shadow-md border border-[#d4c9a5] hover:shadow-xl transition-all">
                <h3 className="text-2xl font-heading mb-4 text-[#3e2d20]">{s.title}</h3>
                <p className="text-[#4a3b30] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-[#fefbf6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading text-[#3e2d20] mb-12 inline-block border-b-4 border-[#a8c686]">Field Work Gallery</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {['/moles_collage.jpg','/farm_moles.jpg','/farm_son.jpg','/farm_john_mole.jpg'].map((src,i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg aspect-square relative">
                <Image src={src} alt="Pest Control Wales" layout="fill" objectFit="cover" className="hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#f0ead6]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-[#f9f5e8] p-8 md:p-12 rounded-3xl shadow-xl border border-[#d4c9a5]">
            <div>
              <h2 className="text-4xl font-heading text-[#3e2d20] mb-6">Get In Touch</h2>
              <p className="text-lg mb-8">Available 24/7 for emergency pest problems. Covering Merthyr, Brecon, Neath, and the surrounding Valleys.</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="bg-[#a8c686] p-3 rounded-full text-xl">📞</span>
                  <a href="tel:07375303124" className="text-2xl font-bold text-[#3e2d20] hover:underline">07375 303124</a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-[#a8c686] p-3 rounded-full text-xl">📧</span>
                  <span className="text-lg">info@welshtownandcountry.co.uk</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {['name','email','message'].map(field => (
                <div key={field}>
                  <label className="block text-[#4a3b30] mb-1 font-semibold capitalize">{field}</label>
                  {field==='message' ? 
                    <textarea name={field} value={formData[field]} onChange={handleChange} rows="4" className="w-full p-3 border rounded-lg border-[#d4c9a5] focus:ring-2 focus:ring-[#a8c686] focus:outline-none bg-[#fefbf6]" placeholder="How can we help?" required /> :
                    <input type={field==='email'?'email':'text'} name={field} value={formData[field]} onChange={handleChange} className="w-full p-3 border rounded-lg border-[#d4c9a5] focus:ring-2 focus:ring-[#a8c686] focus:outline-none bg-[#fefbf6]" placeholder={`Your ${field}`} required />
                  }
                </div>
              ))}
              <button type="submit" className="w-full bg-[#3e2d20] text-[#f5e8c7] py-4 rounded-lg font-bold text-lg hover:bg-[#251b13] transition-colors shadow-md">Send Message</button>
              {submitStatus==='success' && <p className="text-green-600 font-bold mt-4 text-center">Message sent successfully!</p>}
              {submitStatus==='error' && <p className="text-red-500 font-bold mt-4 text-center">Failed to send. Please call us directly.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2f2a1d] text-[#f5e8c7] py-10 text-center">
        <div className="container mx-auto px-4">
          <p className="mb-4">© 2025 Welsh Town & Country Pest Services | Registered in Wales</p>
          <div className="flex justify-center space-x-6">
            <a href="https://www.welshtownandcountrypestservices.co.uk" className="text-[#a8c686] hover:underline">Main Website</a>
            <Link href="#services"><a className="hover:text-[#a8c686]">Services</a></Link>
            <Link href="#contact"><a className="hover:text-[#a8c686]">Contact</a></Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap');
        body { font-family:'Open Sans', sans-serif; background:#fefbf6; color:#4a3b30; line-height:1.6; scroll-behavior:smooth; }
        .font-heading { font-family:'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
