import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/ghData';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenInquiry?: () => void;
  onStartProject?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenInquiry, onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleOpenAction = onStartProject || onOpenInquiry || (() => {});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'careers', label: 'Careers' },
    { id: 'industries', label: 'Industries' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    setMobileMenuOpen(false);
    onNavigate(viewId);
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090c]/98 backdrop-blur-md border-b border-white/[0.1] py-2 sm:py-2.5 shadow-2xl shadow-black/60'
            : 'bg-[#08090c]/90 backdrop-blur-md border-b border-white/[0.06] py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-5 lg:px-6 xl:px-8 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
          {/* Authentic GH Construction Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left focus:outline-none shrink-0"
            aria-label="GH Construction Ltd."
          >
            <img
              src="/gh-logo.png"
              alt="GH Construction Ltd."
              className="h-8 sm:h-10 lg:h-10 xl:h-11 2xl:h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </button>

          {/* Desktop Nav Links (Visible on lg and above) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 2xl:space-x-2 shrink min-w-0">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3.5 py-1.5 xl:py-2 text-[11px] lg:text-xs xl:text-xs 2xl:text-sm tracking-wider uppercase font-medium transition-colors relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#c8aa7a]'
                      : 'text-[#d6cebf] hover:text-[#f7f7f5]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1.5 lg:left-2 xl:left-2.5 2xl:left-3.5 right-1.5 lg:right-2 xl:right-2.5 2xl:right-3.5 h-[2px] bg-[#c8aa7a]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA & Quick Contact */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-4 2xl:gap-6 shrink-0">            <button
              id="nav-cta-start-project"
              onClick={handleOpenAction}
              className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs 2xl:text-sm tracking-wider uppercase px-3.5 lg:px-4 xl:px-5 2xl:px-6 py-2 xl:py-2.5 transition-all duration-200 flex items-center gap-1.5 xl:gap-2 active:scale-[0.98] shadow-lg shadow-[#c8aa7a]/15 whitespace-nowrap shrink-0"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Mobile & Tablet Nav Controls (Visible below lg) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="nav-mobile-cta"
              onClick={handleOpenAction}
              className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] text-[11px] sm:text-xs font-bold tracking-wider uppercase px-2.5 sm:px-3.5 py-1.5 sm:py-2 transition-all flex items-center gap-1 shrink-0 active:scale-[0.98] shadow-md shadow-[#c8aa7a]/15 whitespace-nowrap"
            >
              <span className="hidden sm:inline">START A PROJECT</span>
              <span className="sm:hidden">START PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-[#d6cebf] hover:text-[#f7f7f5] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 bg-[#08090c]/98 backdrop-blur-xl lg:hidden flex flex-col pt-5 px-5 sm:px-6 pb-6 border-b border-white/[0.08] animate-fadeIn overflow-y-auto max-h-[100dvh]"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/[0.08] shrink-0">
            <img
              src="/gh-logo.png"
              alt="GH Construction Ltd."
              className="h-9 sm:h-11 w-auto object-contain"
            />
            <button
              id="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#9b9fa8] hover:text-[#f7f7f5]"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-4 flex flex-col space-y-1.5 shrink-0">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base sm:text-lg font-display tracking-wide py-2 border-b border-white/[0.05] flex items-center justify-between ${
                  currentView === link.id ? 'text-[#c8aa7a] font-semibold' : 'text-[#d6cebf]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-3 shrink-0 pb-6">
            <button
              id="mobile-drawer-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenAction();
              }}
              className="w-full bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase py-3 sm:py-3.5 text-center flex items-center justify-center gap-2 shadow-lg shadow-[#c8aa7a]/15"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex flex-col space-y-2 text-xs sm:text-sm text-[#d6cebf] pt-1">
              <a href={`mailto:${COMPANY_INFO.email.general}`} className="flex items-center gap-2 hover:text-[#c8aa7a] font-mono">
                <Mail className="w-4 h-4 text-[#c8aa7a]" />
                <span>{COMPANY_INFO.email.general}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
