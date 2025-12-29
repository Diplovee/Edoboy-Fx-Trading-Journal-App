import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Phone, MessageCircle, Mail, X } from 'lucide-react';
import BlurText from './BlurText';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [benefitIndex, setBenefitIndex] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase.from('waitlist').select('*', { count: 'exact', head: true });
      if (count !== null) setWaitlistCount(count);
    };
    fetchCount();
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && firstName) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('waitlist')
          .insert([{ email, first_name: firstName }]);

        if (error) {
          if (error.code === '23505') {
            setSubmitted(true);
          } else {
            console.error('Error submitting:', error);
            alert('Something went wrong.');
            return;
          }
        }
        setSubmitted(true);
        setEmail('');
        setFirstName('');
        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="icon.png" alt="EdoBoyFx" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg tracking-tight text-slate-900">EdoBoyFx</span>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Early Access
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-8 lg:pt-28 lg:pb-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[120px] rounded-full mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-4 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Waitlist is open
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-4xl mx-auto leading-tight">
            Stop repeating the same trading mistakes.
          </h1>

          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Track every trade. Fix what’s costing you money.
          </p>

          {/* Benefits */}
          {/* Rotating Benefits */}
          <div className="h-16 flex items-center justify-center mb-10">
            <div className="inline-flex items-center justify-center px-6 py-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-lg ring-1 ring-black/5">
              <AnimatePresence mode='wait'>
                {benefitIndex === 0 && (
                  <motion.div
                    key="benefit-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 text-xl">📊</span>
                    <BlurText
                      text="Track every trade automatically"
                      className="text-slate-800 font-medium text-sm sm:text-base whitespace-nowrap"
                      delay={50}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={() => setTimeout(() => setBenefitIndex(1), 3000)}
                    />
                  </motion.div>
                )}
                {benefitIndex === 1 && (
                  <motion.div
                    key="benefit-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 text-xl">🧠</span>
                    <BlurText
                      text="Spot emotional mistakes"
                      className="text-slate-800 font-medium text-sm sm:text-base whitespace-nowrap"
                      delay={50}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={() => setTimeout(() => setBenefitIndex(2), 3000)}
                    />
                  </motion.div>
                )}
                {benefitIndex === 2 && (
                  <motion.div
                    key="benefit-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <span className="mr-2 text-xl">📈</span>
                    <BlurText
                      text="Improve consistency over time"
                      className="text-slate-800 font-medium text-sm sm:text-base whitespace-nowrap"
                      delay={50}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={() => setTimeout(() => setBenefitIndex(0), 3000)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
              <div className="relative flex flex-col sm:flex-row bg-white rounded-xl shadow-xl overflow-hidden p-1.5 border border-slate-100">
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 w-full sm:w-auto px-4 py-3 bg-transparent border-b sm:border-b-0 sm:border-r border-slate-100 focus:outline-none focus:bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors bg-white min-w-0"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading || submitted}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-[1.5] w-full sm:w-auto px-4 py-3 bg-transparent focus:outline-none focus:bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors bg-white min-w-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || submitted}
                />
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="shrink-0 w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg sm:rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? 'Joining...' : submitted ? 'You are in!' : 'Get early access (free)'}
                </button>
              </div>
            </form>
            {submitted && (
              <p className="mt-4 text-green-600 font-medium animate-fade-in">Successfully joined the waitlist!</p>
            )}
            <p className="mt-4 text-sm text-slate-500">
              Join <span className="font-semibold text-slate-900">{waitlistCount ? waitlistCount.toLocaleString() : '...'}</span> traders waiting for access.
            </p>

            <div className="mt-8 flex flex-col items-center animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('screenshots')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="text-sm font-medium text-slate-400 mb-1">Peek inside</span>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Hero Screenshot */}
          <div className="relative max-w-4xl mx-auto mt-8 sm:mt-12 animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20 pointer-events-none rounded-full"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white" onClick={() => setSelectedImage('Screenshot_20251229-233306.png')}>
              <img
                src="Screenshot_20251229-233306.png"
                alt="Dashboard Preview"
                className="w-full h-auto cursor-pointer hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
            <p className="mt-4 text-sm text-slate-500 font-medium">
              See exactly why your last trade failed.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision in every pixel.</h2>
            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
              Designed for speed and clarity. Log trades, analyze performance, and master your psychology without the clutter.
            </p>
          </div>

          <div className="relative -mx-4 sm:mx-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 z-10 pointer-events-none h-full w-full opacity-50 sm:hidden"></div>
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-6 px-4 pb-8 sm:pb-0 snap-x snap-mandatory scrollbar-hide">
              {/* Placeholder Cards for Screenshots */}
              <div className="snap-center shrink-0 w-[80vw] sm:w-auto aspect-[9/16] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative group cursor-pointer" onClick={() => setSelectedImage('Screenshot_20251229-233306.png')}>
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 font-medium">Dashboard</div>
                <img src="Screenshot_20251229-233306.png" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500 hover:scale-105" alt="Dashboard" />
              </div>
              <div className="snap-center shrink-0 w-[80vw] sm:w-auto aspect-[9/16] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative mt-8 sm:mt-12 cursor-pointer" onClick={() => setSelectedImage('Screenshot_20251229-233318.png')}>
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 font-medium">Analytics</div>
                <img src="Screenshot_20251229-233318.png" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500 hover:scale-105" alt="Analytics" />
              </div>
              <div className="snap-center shrink-0 w-[80vw] sm:w-auto aspect-[9/16] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative sm:mt-24 cursor-pointer" onClick={() => setSelectedImage('Screenshot_20251229-233330.png')}>
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 font-medium">Journal</div>
                <img src="Screenshot_20251229-233330.png" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500 hover:scale-105" alt="Journal" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-bold">E</div>
            <span className="font-semibold text-slate-900">EdoBoyFx</span>
          </div>

          <p className="text-slate-500 text-sm md:absolute md:left-1/2 md:-translate-x-1/2">
            © 2025 Xalo Software. Building in public.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://wa.me/263785629957" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition group" title="WhatsApp">
              <MessageCircle size={18} />
              <span className="text-sm font-medium hidden group-hover:block">WhatsApp</span>
            </a>
            <a href="tel:+263785629957" className="flex items-center gap-2 text-slate-400 hover:text-green-600 transition group" title="Call Us">
              <Phone size={18} />
              <span className="text-sm font-medium hidden group-hover:block">Call</span>
            </a>
            <a href="mailto:xalosoftware@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition group" title="Support Email">
              <Mail size={18} />
              <span className="text-sm font-medium hidden group-hover:block">Support</span>
            </a>
            <a href="mailto:diplovlogodesign@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition group" title="Design Team">
              <Mail size={18} className="text-slate-400 group-hover:text-blue-500" />
              <span className="text-sm font-medium hidden group-hover:block">Design</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )
      }
    </div >
  );
}

export default App;
