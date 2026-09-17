import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, User, Building, AlertCircle, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/ghData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: 'Healthcare & Medical',
    spaceStatus: 'Space Acquired / Leased',
    targetTimeline: 'Within 3-6 Months',
    estimatedBudget: '$150k - $300k',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your project scope or vision';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate instantaneous professional processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact-section" className="py-24 sm:py-32 bg-[#08090c] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Authentic Business Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
                <span className="w-2 h-2 bg-[#c8aa7a]" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
                Start Your Project Inquiry
              </h2>
              <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-4 leading-relaxed">
                Connect directly with our leadership team in Edmonton. We review project viability, lease clauses, and construction timelines with a business-first perspective.
              </p>
            </div>

            {/* General Office Card */}
            <div className="p-6 sm:p-8 bg-[#0d0f15] border border-white/[0.1] space-y-5 shadow-lg">
              <div className="text-xs sm:text-sm font-mono text-[#c8aa7a] uppercase tracking-wider font-semibold">
                Headquarters & Main Office
              </div>

              <div className="space-y-4 text-base">
                <a
                  id="contact-general-phone"
                  href={COMPANY_INFO.phone.href}
                  className="flex items-center gap-3 text-[#f7f7f5] hover:text-[#c8aa7a] transition-colors font-mono font-medium"
                >
                  <Phone className="w-4 h-4 text-[#c8aa7a]" />
                  <span>{COMPANY_INFO.phone.display}</span>
                </a>

                <a
                  id="contact-general-email"
                  href={`mailto:${COMPANY_INFO.email.general}`}
                  className="flex items-center gap-3 text-[#d6cebf] hover:text-[#c8aa7a] transition-colors font-mono"
                >
                  <Mail className="w-4 h-4 text-[#c8aa7a]" />
                  <span>{COMPANY_INFO.email.general}</span>
                </a>

                <a
                  id="contact-office-address"
                  href={COMPANY_INFO.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[#d6cebf] hover:text-[#f7f7f5] transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#c8aa7a] shrink-0 mt-1" />
                  <span className="text-sm sm:text-base leading-relaxed">
                    {COMPANY_INFO.address.street} <br />
                    {COMPANY_INFO.address.city}, {COMPANY_INFO.address.province} {COMPANY_INFO.address.postalCode}
                    <span className="inline-flex items-center gap-1 text-[#c8aa7a] ml-2 text-xs sm:text-sm">
                      (View on Maps &rarr;)
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Direct Project Partners */}
            <div className="space-y-4">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] font-semibold">
                Direct Project Leadership
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMPANY_INFO.contacts.map((contact, idx) => (
                  <div key={idx} className="p-5 bg-[#0d0f15] border border-white/[0.08] space-y-2.5 shadow-md">
                    <div className="font-display font-bold text-[#f7f7f5] text-base sm:text-lg">
                      {contact.name}
                    </div>
                    <div className="text-xs sm:text-sm text-[#d6cebf]">
                      {contact.role}
                    </div>
                    <div className="pt-2.5 border-t border-white/[0.08] space-y-1.5 text-xs sm:text-sm font-mono">
                      <a
                        href={contact.phoneHref}
                        className="flex items-center gap-2 text-[#d6cebf] hover:text-[#c8aa7a]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#c8aa7a]" />
                        <span>{contact.phone}</span>
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 text-[#d6cebf] hover:text-[#f7f7f5] truncate block"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#c8aa7a]" />
                        <span className="truncate">{contact.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing Inquiries */}
            <div className="text-xs sm:text-sm text-[#d6cebf] font-mono pt-2">
              <span>Marketing & Collaborations: </span>
              <a
                href={`mailto:${COMPANY_INFO.email.marketing}`}
                className="text-[#c8aa7a] hover:underline"
              >
                {COMPANY_INFO.email.marketing}
              </a>
            </div>
          </div>

          {/* Right Column: Premium Architectural Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-10 bg-[#0d0f15] border border-white/[0.08] relative">
              {isSubmitted ? (
                <div id="contact-success-message" className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-[#c8aa7a]/10 border border-[#c8aa7a] flex items-center justify-center mx-auto text-[#c8aa7a]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#f7f7f5]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#d6cebf] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#f7f7f5]">{formData.fullName}</strong>. A partner from GH Construction (Nadder or Terry Jomha) will review your project requirements and follow up within 1 business day.
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          companyName: '',
                          projectType: 'Healthcare & Medical',
                          spaceStatus: 'Space Acquired / Leased',
                          targetTimeline: 'Within 3-6 Months',
                          estimatedBudget: '$150k - $300k',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 bg-[#141822] text-xs font-mono uppercase tracking-wider text-[#f7f7f5] hover:text-[#c8aa7a] border border-white/[0.12]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#f7f7f5]">
                      Tell Us About Your Space
                    </h3>
                    <p className="text-sm sm:text-base text-[#d6cebf] font-light mt-1.5">
                      Fill in the details below and our construction leadership will get back to you promptly.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Full Name <span className="text-[#c8aa7a]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        placeholder="Dr. Sarah Jenkins"
                        className={`w-full px-4 py-3.5 bg-[#08090c] border text-base text-[#f7f7f5] placeholder-[#5c584f] focus:outline-none transition-colors ${
                          errors.fullName ? 'border-rose-500' : 'border-white/[0.15] focus:border-[#c8aa7a]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Email Address <span className="text-[#c8aa7a]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="sarah@example.ca"
                        className={`w-full px-4 py-3.5 bg-[#08090c] border text-base text-[#f7f7f5] placeholder-[#5c584f] focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-white/[0.15] focus:border-[#c8aa7a]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Phone Number <span className="text-[#c8aa7a]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="780-000-0000"
                        className={`w-full px-4 py-3.5 bg-[#08090c] border text-base text-[#f7f7f5] placeholder-[#5c584f] focus:outline-none transition-colors ${
                          errors.phone ? 'border-rose-500' : 'border-white/[0.15] focus:border-[#c8aa7a]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Company / Practice Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Valley Dental Clinic"
                        className="w-full px-4 py-3.5 bg-[#08090c] border border-white/[0.15] focus:border-[#c8aa7a] text-base text-[#f7f7f5] placeholder-[#5c584f] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Industry / Project Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Project Sector
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#08090c] border border-white/[0.15] focus:border-[#c8aa7a] text-base text-[#f7f7f5] focus:outline-none cursor-pointer"
                      >
                        <option value="Healthcare & Medical">Healthcare & Medical (Dental / Surgical)</option>
                        <option value="Commercial">Commercial / Corporate Office</option>
                        <option value="Restaurant">Restaurant / Cafe & Hospitality</option>
                        <option value="Retail">Retail Store & Boutique</option>
                        <option value="Specialty Commercial">Specialty Commercial & High-End Interiors</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Current Space Status
                      </label>
                      <select
                        value={formData.spaceStatus}
                        onChange={(e) => setFormData({ ...formData, spaceStatus: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#08090c] border border-white/[0.15] focus:border-[#c8aa7a] text-base text-[#f7f7f5] focus:outline-none cursor-pointer"
                      >
                        <option value="Space Acquired / Leased">Space Acquired / Leased</option>
                        <option value="Negotiating Lease / Needs Review">Negotiating Lease / Needs Review</option>
                        <option value="Searching for New Space">Searching for New Space</option>
                        <option value="Modifying Existing Practice">Modifying Existing Practice (Phased)</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Timeline & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Target Timeline
                      </label>
                      <select
                        value={formData.targetTimeline}
                        onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#08090c] border border-white/[0.15] focus:border-[#c8aa7a] text-base text-[#f7f7f5] focus:outline-none cursor-pointer"
                      >
                        <option value="Immediate (< 2 Months)">Immediate (&lt; 2 Months)</option>
                        <option value="Within 3-6 Months">Within 3–6 Months</option>
                        <option value="6-12 Months">6–12 Months</option>
                        <option value="Planning / Feasibility Stage">Planning / Feasibility Stage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                        Estimated Budget Range
                      </label>
                      <select
                        value={formData.estimatedBudget}
                        onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#08090c] border border-white/[0.15] focus:border-[#c8aa7a] text-base text-[#f7f7f5] focus:outline-none cursor-pointer"
                      >
                        <option value="$100k - $250k">$100k – $250k</option>
                        <option value="$250k - $500k">$250k – $500k</option>
                        <option value="$500k - $1M">$500k – $1M</option>
                        <option value="$1M+">$1M+</option>
                        <option value="Undetermined / Need Preliminary Estimate">Undetermined / Need Preliminary Estimate</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Scope */}
                  <div>
                    <label className="block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#d6cebf] mb-2 font-medium">
                      Scope Overview & Requirements <span className="text-[#c8aa7a]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Describe your space: square footage, operatory count, specialized equipment, or key target opening date..."
                      className={`w-full px-4 py-3.5 bg-[#08090c] border text-base text-[#f7f7f5] placeholder-[#5c584f] focus:outline-none transition-colors ${
                        errors.message ? 'border-rose-500' : 'border-white/[0.15] focus:border-[#c8aa7a]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    id="contact-form-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c8aa7a] hover:bg-[#d6ba8c] disabled:opacity-50 text-[#08090c] font-display font-bold text-sm sm:text-base tracking-wider uppercase py-4 sm:py-5 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl shadow-[#c8aa7a]/15"
                  >
                    <span>{isSubmitting ? 'PROCESSING INQUIRY...' : 'SUBMIT PROJECT INQUIRY'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-xs sm:text-sm text-[#d6cebf] text-center font-mono">
                    All project inquiries are held in strict confidence. No spam or third-party sharing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
