import React, { useState } from 'react';
import { X, Send, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/ghData';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: 'Healthcare & Medical',
    timeline: 'Within 3-6 Months',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.message.trim()) errs.message = 'Please provide preliminary project details';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div
      id="start-project-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08090c]/90 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#0d0f15] border border-white/[0.1] shadow-2xl p-5 sm:p-10 my-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 text-[#a39d91] hover:text-[#f7f7f5] border border-white/[0.1] hover:border-[#c8aa7a] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c8aa7a]/10 border border-[#c8aa7a] flex items-center justify-center mx-auto text-[#c8aa7a]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#f7f7f5]">
              Inquiry Sent to GH Leadership
            </h3>
            <p className="text-base text-[#d6cebf] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#f7f7f5]">{formData.name}</strong>. Terry and Nadder Jomha have received your project details and will be in touch shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] mb-1 font-semibold">
                Direct Project Inquiry
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5]">
                Start Your Project
              </h2>
              <p className="text-sm sm:text-base text-[#d6cebf] mt-2 font-light">
                Connect with Edmonton’s commercial interior specialists for immediate inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 bg-[#08090c] border text-base sm:text-sm text-[#f7f7f5] placeholder-[#6b7280] focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500' : 'border-white/[0.1] focus:border-[#c8aa7a]'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="email@example.ca"
                  className={`w-full px-4 py-3 bg-[#08090c] border text-base sm:text-sm text-[#f7f7f5] placeholder-[#6b7280] focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500' : 'border-white/[0.1] focus:border-[#c8aa7a]'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="780-000-0000"
                  className={`w-full px-4 py-3 bg-[#08090c] border text-base sm:text-sm text-[#f7f7f5] placeholder-[#6b7280] focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-500' : 'border-white/[0.1] focus:border-[#c8aa7a]'
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                  Company / Clinic Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Business Name"
                  className="w-full px-4 py-3 bg-[#08090c] border border-white/[0.1] focus:border-[#c8aa7a] text-base sm:text-sm text-[#f7f7f5] placeholder-[#6b7280] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                  Industry Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08090c] border border-white/[0.1] focus:border-[#c8aa7a] text-base sm:text-sm text-[#f7f7f5] focus:outline-none transition-colors"
                >
                  <option value="Healthcare & Medical">Healthcare & Medical (Dental / Surgical)</option>
                  <option value="Commercial">Commercial / Corporate Office</option>
                  <option value="Restaurant">Restaurant / Food & Beverage</option>
                  <option value="Retail">Retail Store / Boutique</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                  Target Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 bg-[#08090c] border border-white/[0.1] focus:border-[#c8aa7a] text-base sm:text-sm text-[#f7f7f5] focus:outline-none transition-colors"
                >
                  <option value="Immediate (< 2 Months)">Immediate (&lt; 2 Months)</option>
                  <option value="Within 3-6 Months">Within 3-6 Months</option>
                  <option value="6-12 Months">6-12 Months</option>
                  <option value="Preliminary Space Planning">Preliminary Space Planning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                Project Scope Details *
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Square footage, address/lease status, or key technical equipment..."
                className={`w-full px-4 py-3 bg-[#08090c] border text-base sm:text-sm text-[#f7f7f5] placeholder-[#6b7280] focus:outline-none transition-colors ${
                  errors.message ? 'border-rose-500' : 'border-white/[0.1] focus:border-[#c8aa7a]'
                }`}
              />
              {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c8aa7a]/15"
            >
              <span>{isSubmitting ? 'PROCESSING...' : 'SUBMIT PROJECT INQUIRY'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
