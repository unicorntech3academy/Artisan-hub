
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, MapPin, Banknote, Star, ArrowRight, CheckCircle2, 
  MessageSquare, Users, Globe, Briefcase, Phone, Mail, 
  Building2, Facebook, Twitter, Instagram, HelpCircle, Clock,
  ChevronLeft, ChevronRight, UserPlus, HardHat, TrendingUp,
  Award, Heart, Target
} from 'lucide-react';
import { JOB_CATEGORIES } from '../constants';

interface LandingProps {
  onLogin: () => void;
  onSignUp: () => void;
}

type NavPage = 'home' | 'about' | 'contact';

export const Landing: React.FC<LandingProps> = ({ onLogin, onSignUp }) => {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              EAC
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id as NavPage)}
                className={`text-sm font-bold tracking-tight transition-all relative py-2 ${
                  currentPage === link.id ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full animate-fade-in duration-300"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-sm font-bold text-gray-600 hover:text-emerald-600 px-4 py-2 transition-colors">
              Login
            </button>
            <button 
              onClick={onSignUp}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-extrabold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {currentPage === 'home' && <HomeView onSignUp={onSignUp} />}
        {currentPage === 'about' && <AboutView onSignUp={onSignUp} />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-emerald-400" />
                <span className="text-2xl font-black tracking-tighter">EAC</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                Empowering Ekiti's local economy through technology. Connecting verified experts with trust.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-8">Links</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-emerald-400">Home</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-emerald-400">About</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-emerald-400">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-8">Trust</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li className="hover:text-emerald-400 cursor-pointer">Verification</li>
                <li className="hover:text-emerald-400 cursor-pointer">Escrow Logic</li>
                <li className="hover:text-emerald-400 cursor-pointer">Dispute Resolution</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-8">Join the Community</h4>
              <div className="flex gap-2">
                <input className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm w-full outline-none" placeholder="Your email" />
                <button className="bg-emerald-600 px-4 rounded-xl"><ArrowRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
            <p>&copy; 2024 Ekiti Artisan Connect. Built for the Fountain of Knowledge.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- HERO CAROUSEL --- */
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      title: "Hire Verified Ekiti Artisans",
      subtitle: "Secure, reliable, and hyper-local experts at your fingertips.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Secure Escrow Payments",
      subtitle: "Your money is safe until the job is done to your satisfaction.",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Local Experts in 16 LGAs",
      subtitle: "From Ado to Moba, we've got the best hands in Ekiti.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
    }
  ];

  const next = useCallback(() => setCurrent((s) => (s + 1) % slides.length), [slides.length]);
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-[3rem] shadow-2xl group animate-zoom-in">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-all duration-1000 transform ${i === current ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-110 translate-x-full'}`}>
          <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          <div className="absolute bottom-20 left-10 lg:left-20 max-w-2xl text-white space-y-4">
            <h2 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter">{slide.title}</h2>
            <p className="text-xl lg:text-2xl text-gray-200 font-medium opacity-90">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-emerald-500' : 'w-3 bg-white/40'}`}></button>
        ))}
      </div>
    </div>
  );
};

/* --- HOME PAGE SECTIONS --- */
const HomeView: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => (
  <div className="animate-fade-in">
    {/* 1. Hero (White) */}
    <section className="px-6 sm:px-10 lg:px-16 py-12 bg-white">
      <div className="max-w-7xl mx-auto"><HeroCarousel /></div>
    </section>

    {/* 2. Key Pillars (Emerald-50) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-black text-center mb-20 tracking-tight animate-slide-up">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Identity Trust", desc: "NIN/BVN verification for every single artisan on board.", delay: "delay-100" },
            { icon: MapPin, title: "LGA Specific", desc: "We find professionals right in your neighborhood for speed.", delay: "delay-200" },
            { icon: Banknote, title: "Financial Safety", desc: "Funds held in escrow until you confirm job completion.", delay: "delay-300" }
          ].map((item, i) => (
            <div key={i} className={`bg-white p-10 rounded-[3rem] shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-500 animate-slide-up ${item.delay}`}>
              <item.icon className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. Popular Categories (Sky-50) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-sky-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16 text-center tracking-tight animate-slide-up">Top Professional Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {JOB_CATEGORIES.slice(0, 6).map((cat, i) => (
            <div key={cat} className="bg-white p-8 rounded-3xl border border-sky-100 hover:border-sky-500 hover:bg-sky-100/50 transition-all duration-500 animate-zoom-in text-center shadow-sm">
              <span className="text-gray-900 font-black text-lg">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. Statistics (Gray-900) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-gray-900">
      <div className="max-w-7xl mx-auto text-white grid grid-cols-2 lg:grid-cols-4 gap-12 text-center animate-fade-in">
        {[
          { v: "1,200+", l: "Verified Artisans" },
          { v: "16 / 16", l: "LGAs Covered" },
          { v: "₦4.5M+", l: "Protected Payments" },
          { v: "98%", l: "Job Success Rate" }
        ].map((s, i) => (
          <div key={i} className="space-y-2">
            <div className="text-5xl font-black tracking-tighter text-emerald-400">{s.v}</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    {/* 5. How it Works (White) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-24 tracking-tight">The Simple Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          {[
            { n: "01", t: "Post Request", d: "Describe your job in minutes." },
            { n: "02", t: "Compare Bids", d: "Get quotes from vetted experts." },
            { n: "03", t: "Secure Pay", d: "Lock funds in safe escrow." },
            { n: "04", t: "Release & Review", d: "Pay only when satisfied." }
          ].map((s, i) => (
            <div key={i} className="space-y-4 animate-slide-up" style={{ animationDelay: `${i*100}ms` }}>
              <div className="text-7xl font-black text-gray-100">{s.n}</div>
              <h4 className="text-xl font-black text-gray-900">{s.t}</h4>
              <p className="text-gray-500 font-medium">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 6. Call to Action (Emerald Gradient) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-br from-emerald-600 to-sky-600">
      <div className="max-w-4xl mx-auto text-white text-center space-y-10 animate-zoom-in">
        <h2 className="text-4xl lg:text-7xl font-black leading-tight tracking-tight">Experience Trust in Every Task.</h2>
        <p className="text-xl text-emerald-50 font-medium">Join the marketplace built for the Fountain of Knowledge state.</p>
        <button onClick={onSignUp} className="bg-white text-emerald-700 px-10 py-5 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl">Start Your Journey Now</button>
      </div>
    </section>
  </div>
);

/* --- ABOUT PAGE SECTIONS --- */
const AboutView: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => (
  <div className="animate-fade-in">
    {/* 1. Vision (White) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-white text-center">
      <div className="max-w-7xl mx-auto space-y-8 animate-slide-up">
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter">Digital <span className="text-emerald-600">Accountability.</span></h1>
        <p className="text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">We're bridging the gap between talent and trust across Ekiti's 16 local governments.</p>
      </div>
    </section>

    {/* 2. User Roles & Benefits (Emerald-50) - DEDICATED ROLES SECTION */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-12 rounded-[4rem] shadow-sm hover:shadow-xl transition-all border border-emerald-100 group animate-slide-right">
          <HardHat className="w-16 h-16 text-emerald-600 mb-8 group-hover:rotate-12 transition-transform" />
          <h3 className="text-3xl font-black mb-6">For Artisans</h3>
          <p className="text-gray-500 font-medium mb-8">Elevate your trade from informal word-of-mouth to a professional digital enterprise. We provide the tools to get you hired and paid securely.</p>
          <div className="space-y-4">
            {["Verified profile status", "Payment guarantees", "Direct work notifications", "Business growth metrics"].map(f => (
              <div key={f} className="flex items-center gap-3 font-bold text-emerald-700"><CheckCircle2 className="w-5 h-5" /> {f}</div>
            ))}
          </div>
        </div>
        <div className="bg-white p-12 rounded-[4rem] shadow-sm hover:shadow-xl transition-all border border-sky-100 group animate-slide-right delay-200">
          <UserPlus className="w-16 h-16 text-sky-600 mb-8 group-hover:-rotate-12 transition-transform" />
          <h3 className="text-3xl font-black mb-6">For Work Owners</h3>
          <p className="text-gray-500 font-medium mb-8">Stop the frustration of unvetted labor. Find the best hands for your project with full financial and personal security built-in.</p>
          <div className="space-y-4">
            {["NIN verified professionals", "Escrow protection", "Rating-based selection", "Local matching (LGA)"].map(f => (
              <div key={f} className="flex items-center gap-3 font-bold text-sky-700"><CheckCircle2 className="w-5 h-5" /> {f}</div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 3. The Core Values (Sky-50) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-sky-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-20 tracking-tight">Our Guiding Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Award, title: "Excellence", desc: "Setting the gold standard for artisanal work in Nigeria." },
            { icon: Heart, title: "Community", desc: "Empowering our neighbors from Ado to Ise-Orun." },
            { icon: Target, title: "Integrity", desc: "Total transparency in every single transaction." }
          ].map((v, i) => (
            <div key={i} className="space-y-4 animate-zoom-in" style={{ animationDelay: `${i*100}ms` }}>
              <v.icon className="w-12 h-12 text-sky-600 mx-auto" />
              <h4 className="text-2xl font-black">{v.title}</h4>
              <p className="text-gray-500 font-medium px-8">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. Impact Metrics (Gray-900) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8 animate-slide-right">
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">Driving Real Economic Impact in Ekiti.</h2>
          <p className="text-xl text-gray-400 font-medium">We're not just an app; we're a catalyst for professional development and financial inclusion for the informal sector.</p>
          <div className="flex gap-10">
            <div><div className="text-3xl font-black text-emerald-400">1.5k+</div><div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Jobs Done</div></div>
            <div><div className="text-3xl font-black text-sky-400">85%</div><div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Return Clients</div></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 animate-zoom-in">
          <div className="h-64 bg-emerald-600/20 rounded-3xl border border-emerald-500/20"></div>
          <div className="h-64 bg-sky-600/20 rounded-3xl border border-sky-500/20 mt-12"></div>
        </div>
      </div>
    </section>

    {/* 5. Trust Framework (Emerald-900) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-emerald-900 text-white text-center">
      <div className="max-w-4xl mx-auto space-y-12">
        <TrendingUp className="w-16 h-16 text-emerald-400 mx-auto" />
        <h2 className="text-4xl font-black tracking-tight leading-tight">Built on the Pillars of Ekiti Heritage.</h2>
        <p className="text-xl text-emerald-100 font-medium italic">"EAC is the digital embodiment of the Ekiti spirit—integrity, hard work, and the constant search for knowledge."</p>
        <div className="h-1 w-20 bg-emerald-400 mx-auto rounded-full"></div>
      </div>
    </section>

    {/* 6. Legacy & Future (White) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="flex-1 space-y-8 animate-slide-right">
          <h2 className="text-4xl font-black">Our Founding Story</h2>
          <p className="text-lg text-gray-500 leading-relaxed font-medium">Started in a small tech hub in Ado, we recognized the massive potential of Ekiti's artisanal workforce. We spent months in markets and workshops across LGAs to build a platform that actually works for our people.</p>
          <button onClick={onSignUp} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all">Join the Movement</button>
        </div>
        <div className="flex-1 w-full animate-zoom-in delay-300">
           <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" className="rounded-[4rem] shadow-2xl grayscale" alt="Team" />
        </div>
      </div>
    </section>
  </div>
);

/* --- CONTACT PAGE SECTIONS --- */
const ContactView: React.FC = () => (
  <div className="animate-fade-in">
    {/* 1. Header (White) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-white text-center">
      <div className="max-w-7xl mx-auto space-y-6 animate-slide-up">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter">Support <span className="text-sky-600">Hub.</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">Our team in Ekiti is ready to ensure your experience is flawless.</p>
      </div>
    </section>

    {/* 2. Direct Contacts (Emerald-50) */}
    <section className="py-20 px-6 sm:px-10 lg:px-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Phone, title: "Phone", info: "+234 800 EKITI EAC", color: "text-emerald-600" },
          { icon: Mail, title: "Email", info: "hello@ekitiartisan.com", color: "text-sky-600" },
          { icon: MapPin, title: "Office", info: "Fajuyi Park, Ado-Ekiti", color: "text-amber-600" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-12 rounded-[3rem] text-center shadow-sm hover:shadow-xl transition-all duration-500 animate-slide-up" style={{ animationDelay: `${i*100}ms` }}>
            <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-6`} />
            <h3 className="text-2xl font-black mb-2">{item.title}</h3>
            <p className="text-gray-900 font-bold text-lg">{item.info}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 3. Message Form (Sky-50) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-sky-50">
      <div className="max-w-4xl mx-auto bg-white p-16 rounded-[4rem] shadow-2xl border border-sky-100 animate-zoom-in">
        <h2 className="text-4xl font-black mb-12 text-center tracking-tight">Drop a Line</h2>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium" placeholder="Full Name" />
            <input className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium" placeholder="Email Address" />
          </div>
          <textarea className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium min-h-[180px]" placeholder="Your inquiry..."></textarea>
          <button className="w-full bg-sky-600 text-white font-black py-5 rounded-[2rem] text-xl hover:bg-sky-700 shadow-xl transition-all">Send Message</button>
        </form>
      </div>
    </section>

    {/* 4. Help Topics (Gray-50) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tight">FAQ</h2>
        {[
          { q: "Is registration free?", a: "Joining is free. We only charge a platform fee on successful jobs." },
          { q: "How to resolve disputes?", a: "We have a dedicated local mediation team to handle disagreements within 24 hours." },
          { q: "Is my payment safe?", a: "Yes, funds stay in our secure escrow until you approve the artisan's work." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm animate-fade-in" style={{ animationDelay: `${i*100}ms` }}>
            <h4 className="text-xl font-black mb-3 flex items-center gap-3"><HelpCircle className="w-6 h-6 text-emerald-500" /> {item.q}</h4>
            <p className="text-gray-500 font-medium pl-9">{item.a}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 5. Social Wall (Emerald-900) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-emerald-900 text-white rounded-[4rem] mx-4 mb-20 text-center">
      <h2 className="text-4xl font-black mb-12">Stay Connected</h2>
      <div className="flex justify-center gap-8">
        {[Facebook, Twitter, Instagram].map((Icon, i) => (
          <button key={i} className="w-20 h-20 rounded-full bg-emerald-800 flex items-center justify-center hover:bg-emerald-400 hover:text-emerald-900 transition-all shadow-xl">
            <Icon className="w-10 h-10" />
          </button>
        ))}
      </div>
    </section>

    {/* 6. Office Hours (White) */}
    <section className="py-32 px-6 sm:px-10 lg:px-16 bg-white text-center">
      <div className="max-w-7xl mx-auto space-y-10 animate-slide-up">
        <Clock className="w-16 h-16 text-emerald-600 mx-auto" />
        <h2 className="text-4xl font-black">Open Hours</h2>
        <div className="flex flex-col md:flex-row justify-center gap-16 text-lg font-bold">
          <div><p className="text-gray-400 text-sm mb-2">Mon — Fri</p><p className="text-2xl font-black">08:00 AM — 05:00 PM</p></div>
          <div><p className="text-gray-400 text-sm mb-2">Sat</p><p className="text-2xl font-black">09:00 AM — 02:00 PM</p></div>
        </div>
        <p className="text-gray-500 font-medium">App-based support is available 24/7 for all users.</p>
      </div>
    </section>
  </div>
);
