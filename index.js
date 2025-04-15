import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { motion } from 'framer-motion';

export default function Home() {
  const [motionLib, setMotionLib] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  // Load Framer Motion with a fallback
  useEffect(() => {
    const loadMotion = async () => {
      try {
        const mod = await import('framer-motion');
        setMotionLib(mod);
      } catch (error) {
        console.warn('Framer Motion failed to load. Animations disabled.');
      }
    };
    loadMotion();
  }, []);

  const MotionWrapper = motionLib ? motionLib.motion.div : 'div';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div>
      <Head>
        <title>Welsh Mole Catcher | Traditional Pest Control in Wales</title>
        <meta name="description" content="Expert mole catching and pest control in Wales. Family-run service for farms and rural homes using traditional methods. Call 07375 303124!" />
        <meta name="keywords" content="mole catching Wales, pest control farm, Welsh mole catcher, rural pest services, traditional mole traps" />
        <meta name="author" content="Welsh Mole Catcher" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Welsh Mole Catcher",
            "description": "Traditional mole catching and pest control in Welsh countryside.",
            "telephone": "07375303124",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "South and Mid Wales",
              "addressCountry": "UK"
            },
            "url": "https://www.welshmolecatcher.co.uk"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I get rid of moles on my farm in Wales?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most effective way to get rid of moles on your farm in Wales is through traditional mole trapping. At Welsh Mole Catcher, we use safe, time-tested traps to remove moles without harming your land or livestock. Contact us at 07375 303124 for expert service."
                }
              },
              {
                "@type": "Question",
                "name": "What is traditional mole catching?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Traditional mole catching involves using manual traps, like spring traps or scissor traps, placed in mole tunnels. This method avoids chemicals, making it safe for farms and rural homes. It’s a skill passed down through generations, and we’ve perfected it here in Wales."
                }
              },
              {
                "@type": "Question",
                "name": "How much does mole catching cost in Wales?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The cost of mole catching in Wales depends on the size of your property and the extent of the infestation. At Welsh Mole Catcher, we offer competitive pricing tailored to your needs. Call us at 07375 303124 for a personalized quote."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with other pests besides moles?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we handle a range of rural pests including rats, mice, wasps, bees, and squirrels. Our methods are safe for farms and countryside homes, ensuring your property stays pest-free without harming the environment."
                }
              },
              {
                "@type": "Question",
                "name": "Why are moles a problem for farms?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Moles can damage farmland by creating tunnels and molehills, which disrupt soil, harm crops, and create hazards for livestock. Their activity can also affect machinery and lead to uneven terrain, making mole control essential for Welsh farms."
                }
              }
            ]
          })}
        </script>
      </Head>

      {/* Navbar */}
      <nav className="bg-[#2f2a1d] text-[#f5e8c7] p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-heading">Welsh Mole Catcher</a>
          </Link>
          <ul className="flex space-x-6">
            <li><Link href="/"><a className="hover:text-[#a8c686] transition-colors">Home</a></Link></li>
            <li><Link href="#services"><a className="hover:text-[#a8c686] transition-colors">Services</a></Link></li>
            <li><Link href="#gallery"><a className="hover:text-[#a8c686] transition-colors">Gallery</a></Link></li>
            <li><Link href="#contact"><a className="hover:text-[#a8c686] transition-colors">Contact</a></Link></li>
            <li><Link href="#faqs"><a className="hover:text-[#a8c686] transition-colors">FAQs</a></Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <MotionWrapper
        className="relative h-screen text-[#f5e8c7] bg-cover bg-center"
        style={{ backgroundImage: "url('/moles_collage.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center">
          <Image
            src="/logo.png"
            alt="Welsh Mole Catcher Logo"
            width={150}
            height={150}
            className="rounded-full border-4 border-[#a8c686] shadow-md mb-4"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Logo'; }}
          />
          <MotionWrapper
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading">Welsh Mole Catcher</h1>
          </MotionWrapper>
          <MotionWrapper
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl mt-4 font-body">Traditional Pest Control in the Heart of Wales</p>
            <Link href="#contact">
              <a className="mt-6 inline-block bg-[#a8c686] text-[#3e2d20] px-6 py-3 rounded-lg font-semibold hover:bg-[#8ba567] transition-colors">
                Get in Touch
              </a>
            </Link>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Intro Section */}
      <section className="py-16 bg-[#fefbf6]">
        <div className="container mx-auto px-4">
          <MotionWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-[#3e2d20] border-b-2 border-[#a8c686] inline-block mb-4 text-center">Rooted in the Welsh Countryside</h2>
            <p className="text-lg text-[#4a3b30] font-body max-w-3xl mx-auto text-center">
              At Welsh Mole Catcher, we bring the charm and grit of rural life to every job. Specializing in traditional mole trapping, we serve farms and countryside homes across South and Mid Wales with a family-run touch. Let us tackle your pest problems with methods as timeless as the rolling hills.
            </p>
          </MotionWrapper>
        </div>
        <div className="leafy-divider my-8"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-[#f0ead6]">
        <div className="container mx-auto px-4">
          <MotionWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-[#3e2d20] border-b-2 border-[#a8c686] inline-block mb-4 text-center">Our Countryside Services</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <MotionWrapper
                className="bg-[#f9f5e8] p-6 rounded-xl shadow-md border border-[#d4c9a5] hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-2xl font-heading text-[#3e2d20] mb-2">Mole Trapping</h3>
                <p className="text-[#4a3b30] font-body">
                  Using time-honored traps, we provide effective mole control that’s gentle on your land and safe for livestock.
                </p>
              </MotionWrapper>
              <MotionWrapper
                className="bg-[#f9f5e8] p-6 rounded-xl shadow-md border border-[#d4c9a5] hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-2xl font-heading text-[#3e2d20] mb-2">Pest Control</h3>
                <p className="text-[#4a3b30] font-body">
                  From rats and mice to wasps, bees, and squirrels, we manage all rural pests with care and expertise.
                </p>
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
        <div className="leafy-divider my-8"></div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-[#fefbf6]">
        <div className="container mx-auto px-4">
          <MotionWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-[#3e2d20] border-b-2 border-[#a8c686] inline-block mb-4 text-center">A Glimpse of Our Work</h2>
            <div className="masonry-grid max-w-5xl mx-auto">
              <MotionWrapper
                className="masonry-item cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => document.getElementById('modal').classList.remove('hidden')}
              >
                <Image
                  src="/moles_collage.jpg"
                  alt="Moles caught on Welsh farms"
                  width={300}
                  height={200}
                  className="w-full object-cover rounded-lg shadow-md gallery-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Mole+Catch+Highlights'; }}
                />
                <figcaption className="text-center py-2 bg-[#d4c9a5] text-[#4a3b30] font-body rounded-b-lg">Mole Catch Highlights</figcaption>
              </MotionWrapper>
              <MotionWrapper
                className="masonry-item cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => document.getElementById('modal').classList.remove('hidden')}
              >
                <Image
                  src="/farm_moles.jpg"
                  alt="Dead moles on a Welsh farm"
                  width={300}
                  height={250}
                  className="w-full object-cover rounded-lg shadow-md gallery-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x250?text=Farm+Results'; }}
                />
                <figcaption className="text-center py-2 bg-[#d4c9a5] text-[#4a3b30] font-body rounded-b-lg">Farm Results</figcaption>
              </MotionWrapper>
              <MotionWrapper
                className="masonry-item cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => document.getElementById('modal').classList.remove('hidden')}
              >
                <Image
                  src="/farm_son.jpg"
                  alt="Father and son team mole trapping"
                  width={300}
                  height={300}
                  className="w-full object-cover rounded-lg shadow-md gallery-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Family+Team'; }}
                />
                <figcaption className="text-center py-2 bg-[#d4c9a5] text-[#4a3b30] font-body rounded-b-lg">Family Team</figcaption>
              </MotionWrapper>
              <MotionWrapper
                className="masonry-item cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => document.getElementById('modal').classList.remove('hidden')}
              >
                <Image
                  src="/farm_john_mole.jpg"
                  alt="Mole catching expert in field"
                  width={300}
                  height={200}
                  className="w-full object-cover rounded-lg shadow-md gallery-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=In+The+Field'; }}
                />
                <figcaption className="text-center py-2 bg-[#d4c9a5] text-[#4a3b30] font-body rounded-b-lg">In The Field</figcaption>
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
        <div id="modal" className="modal hidden">
          <Image src="/moles_collage.jpg" alt="Gallery Image" width={800} height={600} className="rounded-lg border-4 border-[#d4c9a5]" />
        </div>
        <div className="leafy-divider my-8"></div>
      </section>

      {/* Contact/Lead Capture Form */}
      <section id="contact" className="py-16 bg-[#f0ead6]">
        <div className="container mx-auto px-4">
          <MotionWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-[#3e2d20] border-b-2 border-[#a8c686] inline-block mb-4 text-center">Reach Out to Us</h2>
            <div className="bg-[#f9f5e8] p-6 rounded-xl shadow-md max-w-lg mx-auto border border-[#d4c9a5]">
              <p className="text-[#4a3b30] mb-4 font-body text-center">
                Call us at <a href="tel:07375303124" className="text-[#3e2d20] hover:text-[#785f45] transition-colors">07375 303124</a> or send us a message:
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-[#4a3b30] mb-1 font-body" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-[#d4c9a5] focus:outline-none focus:border-[#a8c686] bg-[#fefbf6] font-body"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4a3b30] mb-1 font-body" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-[#d4c9a5] focus:outline-none focus:border-[#a8c686] bg-[#fefbf6] font-body"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#4a3b30] mb-1 font-body" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-[#d4c9a5] focus:outline-none focus:border-[#a8c686] bg-[#fefbf6] font-body"
                    placeholder="How can we help?"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3e2d20] text-[#f5e8c7] p-2 rounded-lg hover:bg-[#785f45] transition-colors font-body wooden-btn"
                >
                  Send Message
                </button>
                {submitStatus === 'success' && (
                  <p className="text-[#a8c686] mt-4 text-center font-body">Thank you! We’ll get back to you soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 mt-4 text-center font-body">Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </MotionWrapper>
        </div>
        <div className="leafy-divider my-8"></div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-16 bg-[#fefbf6]">
        <div className="container mx-auto px-4">
          <MotionWrapper
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-[#3e2d20] border-b-2 border-[#a8c686] inline-block mb-4 text-center">Frequently Asked Questions</h2>
            <div className="bg-[#f9f5e8] p-6 rounded-xl shadow-md border border-[#d4c9a5] max-w-5xl mx-auto">
              <div className="faq-item mb-4">
                <h3 className="text-xl font-heading text-[#3e2d20] mb-2">How do I get rid of moles on my farm in Wales?</h3>
                <p className="text-[#4a3b30] font-body">
                  The most effective way to get rid of moles on your farm in Wales is through traditional mole trapping. At Welsh Mole Catcher, we use safe, time-tested traps to remove moles without harming your land or livestock. Contact us at <a href="tel:07375303124" className="text-[#3e2d20] hover:text-[#785f45] transition-colors">07375 303124</a> for expert service.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h3 className="text-xl font-heading text-[#3e2d20] mb-2">What is traditional mole catching?</h3>
                <p className="text-[#4a3b30] font-body">
                  Traditional mole catching involves using manual traps, like spring traps or scissor traps, placed in mole tunnels. This method avoids chemicals, making it safe for farms and rural homes. It’s a skill passed down through generations, and we’ve perfected it here in Wales.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h3 className="text-xl font-heading text-[#3e2d20] mb-2">How much does mole catching cost in Wales?</h3>
                <p className="text-[#4a3b30] font-body">
                  The cost of mole catching in Wales depends on the size of your property and the extent of the infestation. At Welsh Mole Catcher, we offer competitive pricing tailored to your needs. Call us at <a href="tel:07375303124" className="text-[#3e2d20] hover:text-[#785f45] transition-colors">07375 303124</a> for a personalized quote.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h3 className="text-xl font-heading text-[#3e2d20] mb-2">Can you help with other pests besides moles?</h3>
                <p className="text-[#4a3b30] font-body">
                  Yes, we handle a range of rural pests including rats, mice, wasps, bees, and squirrels. Our methods are safe for farms and countryside homes, ensuring your property stays pest-free without harming the environment.
                </p>
              </div>
              <div className="faq-item">
                <h3 className="text-xl font-heading text-[#3e2d20] mb-2">Why are moles a problem for farms?</h3>
                <p className="text-[#4a3b30] font-body">
                  Moles can damage farmland by creating tunnels and molehills, which disrupt soil, harm crops, and create hazards for livestock. Their activity can also affect machinery and lead to uneven terrain, making mole control essential for Welsh farms.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
        <div className="leafy-divider my-8"></div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2f2a1d] text-[#f5e8c7] py-6 text-center">
        <p className="font-body">© 2025 Welsh Mole Catcher | <a href="https://www.welshtownandcountry.co.uk" className="text-[#a8c686] hover:underline transition-colors">Back to Main Site</a></p>
      </footer>

      <style jsx global>{`
        body {
          font-family: 'Open Sans', sans-serif;
          background-color: #fefbf6;
          color: #4a3b30;
          line-height: 1.6;
          scroll-behavior: smooth;
          background-image: url('https://www.transparenttextures.com/patterns/light-paper-fibers.png');
          background-attachment: fixed;
          background-size: cover;
        }
        .font-heading {
          font-family: 'Playfair Display', serif;
        }
        .font-body {
          font-family: 'Open Sans', sans-serif;
        }
        .leafy-divider {
          height: 20px;
          background-image: url('https://www.transparenttextures.com/patterns/leaves.png');
          background-size: 100px;
          background-repeat: repeat-x;
          background-position: center;
          opacity: 0.5;
        }
        .wooden-btn {
          background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
          background-size: cover;
          border: 1px solid #d4c9a5;
        }
        .masonry-grid {
          column-count: 1;
          column-gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 4;
          }
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
        }
        .gallery-img {
          transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }
        .gallery-img:hover {
          transform: scale(1.03);
          opacity: 0.95;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 12px;
          border: 4px solid #d4c9a5;
        }
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
}
