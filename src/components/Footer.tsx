import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/ghData';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050608] text-[#d6cebf] border-t border-white/[0.08] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Col 1: Brand & Story (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col items-start gap-3">
              <img
                src="/gh-logo.png"
                alt="GH Construction Ltd."
                className="h-12 sm:h-14 w-auto object-contain"
              />
              <span className="text-xs font-mono text-[#c8aa7a] tracking-[0.2em] uppercase font-semibold">
                EST. {COMPANY_INFO.established.toUpperCase()} • EDMONTON
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#d6cebf] font-light leading-relaxed max-w-sm">
              Commercial general contracting, interior build-outs, and construction management solutions tailored to the business realities of our clients.
            </p>

            <div className="pt-1 text-sm font-mono text-[#f7f7f5] tracking-wider">
              “{COMPANY_INFO.motto}”
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#f7f7f5] font-semibold">
              Navigation
            </div>
            <ul className="space-y-3 text-sm tracking-wide">
              {[
                { label: 'Home', path: '/' },
                { label: 'Work', path: '/work' },
                { label: 'Services', path: '/services' },
                { label: 'About', path: '/about' },
                { label: 'Careers', path: '/careers' },
                { label: 'Industries', path: '/industries' },
                { label: 'Testimonials', path: '/testimonials' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path.startsWith('/#')) {
                        e.preventDefault();
                        const hash = item.path.substring(1);
                        if (location.pathname === '/') {
                          setTimeout(() => {
                            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                          }, 50);
                        } else {
                          navigate(item.path);
                          setTimeout(() => {
                            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      } else {
                        scrollToTop();
                      }
                    }}
                    className="text-[#d6cebf] hover:text-[#c8aa7a] transition-colors focus:outline-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#f7f7f5] font-semibold">
              Services
            </div>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    onClick={scrollToTop}
                    className="text-[#d6cebf] hover:text-[#c8aa7a] transition-colors text-left line-clamp-1 block"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#f7f7f5] font-semibold">
              Office & Inquiries
            </div>
            <div className="space-y-3 text-sm">              <a
                href={`mailto:${COMPANY_INFO.email.general}`}
                className="flex items-center gap-2.5 text-[#d6cebf] hover:text-[#c8aa7a] transition-colors font-mono"
              >
                <Mail className="w-4 h-4 text-[#c8aa7a]" />
                <span>{COMPANY_INFO.email.general}</span>
              </a>

              <a
                href={COMPANY_INFO.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[#d6cebf] hover:text-[#f7f7f5] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#c8aa7a] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_INFO.address.street} <br />
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.province} {COMPANY_INFO.address.postalCode}
                </span>
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-wider text-[#c8aa7a] hover:text-[#f7f7f5] transition-colors"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#a39d91] font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name} All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span>Edmonton, Scarborough</span>
            <span>Commercial General Contractor</span>
            <button
              onClick={scrollToTop}
              className="text-[#d6cebf] hover:text-[#c8aa7a] transition-colors"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
