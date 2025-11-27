import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, Code, Globe, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WebsiteRequestFormProps {
  onClose?: () => void;
}

export const WebsiteRequestForm: React.FC<WebsiteRequestFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    businessType: 'Service',
    currentWebsite: '',
    description: '',
    budget: '1000-3000'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const calculateEstimate = () => {
    let basePrice = 1500; // Base setup
    
    // Complexity multipliers
    if (formData.businessType === 'E-commerce') basePrice += 1000;
    if (formData.businessType === 'Restaurant') basePrice += 500;
    
    // Budget alignment (heuristic)
    if (formData.budget === '5000+') basePrice += 1000; // Assume they want premium features

    // Description length heuristic (more text = more complex usually)
    if (formData.description.length > 200) basePrice += 500;

    return basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const estimatedQuote = calculateEstimate();

    try {
      // 1. Save to Supabase
      const { error } = await supabase
        .from('project_requests')
        .insert([{
          ...formData,
          estimated_quote: estimatedQuote,
          status: 'new',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // 2. Simulate Email Sending (In a real app, this would be an Edge Function)
      console.log(`
        [EMAIL SIMULATION]
        To: admin@belldesignlabs.com
        Subject: New Website Request from ${formData.businessName}
        
        Details:
        - Name: ${formData.name}
        - Email: ${formData.email}
        - Type: ${formData.businessType}
        - Budget: ${formData.budget}
        - Description: ${formData.description}
        
        ----------------------------------------
        INTERNAL VIBE CODING ESTIMATE: $${estimatedQuote}
        ----------------------------------------
      `);

      setStatus('success');
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);

    } catch (error) {
      console.error('Error submitting request:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Request a Website Build</h3>
          <p className="text-slate-400 text-sm">Get a custom, high-performance site built by our team.</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Request Received!</h4>
          <p className="text-slate-400">We'll review your details and email you a quote shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Name</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={e => setFormData({...formData, businessName: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Business Type</label>
              <select
                value={formData.businessType}
                onChange={e => setFormData({...formData, businessType: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none appearance-none"
              >
                <option>Service (Plumbing, Law, etc.)</option>
                <option>E-commerce (Retail)</option>
                <option>Restaurant / Food</option>
                <option>Portfolio / Creative</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Website (Optional)</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="url"
                placeholder="https://"
                value={formData.currentWebsite}
                onChange={e => setFormData({...formData, currentWebsite: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Project Budget</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
                className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none appearance-none"
              >
                <option value="1000-3000">$1,000 - $3,000</option>
                <option value="3000-5000">$3,000 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Project Details</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your goals, features you need, and your timeline..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};
