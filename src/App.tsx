import { useState } from 'react';
import { ShieldCheck, MapPin, ArrowRight, Star, CheckCircle, Loader2 } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <span>SUPPORT<span className="text-blue-500">LOCAL</span></span>
          </div>
          <button 
            onClick={() => scrollToSection('waitlist')}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
          >
            For Business
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
            <MapPin className="w-3 h-3" />
            BETA_ACCESS_OPEN
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            The Reputation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Economy</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A decentralized network for verified local businesses. 
            Connect with your community, build trust, and grow without the middlemen.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('waitlist')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Join the Waitlist <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-bold transition-all"
            >
              Explore Directory
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 border-t border-white/5 bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Identity",
                desc: "Cryptographically secure business verification. No fake reviews, no bots.",
                icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />
              },
              {
                title: "Direct Commerce",
                desc: "Zero-fee peer-to-peer transactions. Keep 100% of what you earn.",
                icon: <Star className="w-8 h-8 text-yellow-400" />
              },
              {
                title: "Local First",
                desc: "Algorithmically boosted visibility for users within 5 miles of your location.",
                icon: <MapPin className="w-8 h-8 text-blue-400" />
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-slate-900 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto bg-slate-900 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Secure Your Spot</h2>
            <p className="text-slate-400 mb-8">
              We are currently onboarding businesses in select cities. Join the waitlist to be notified when we launch in your area.
            </p>

            <form onSubmit={handleJoin} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="business@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== 'idle'}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button 
                type="submit"
                disabled={status !== 'idle'}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" /> Added to Waitlist
                  </>
                ) : (
                  'Join Alpha Waitlist'
                )}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-4 text-emerald-400 text-sm">
                Thanks! We'll be in touch shortly.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; 2025 Bell Design Labs. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
