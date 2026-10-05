import React, { useState } from 'react';
import { Sparkles, Calendar, ClipboardCheck, Menu, X, Stethoscope } from 'lucide-react';

interface HeaderProps {
  onOpenAssistant: () => void;
  onOpenBooking: () => void;
  onNavigateToDegree: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAssistant,
  onOpenBooking,
  onNavigateToDegree,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Did You Know?", href: "#did-you-know" },
    { label: "Overview", href: "#what-are" },
    { label: "Causes", href: "#causes" },
    { label: "Symptoms", href: "#symptoms" },
    { label: "Leg Pain", href: "#leg-pain" },
    { label: "Progression", href: "#progression" },
    { label: "Check Degree", href: "#degree-assessment", isAccent: true },
    { label: "Upload Media", href: "#media-upload" },
    { label: "Duplex Scan", href: "#duplex-scan" },
    { label: "Doctors", href: "#doctors" },
    { label: "Campaign", href: "#campaign" },
    { label: "Treatment", href: "#treatment" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#EFF1EA]/95 backdrop-blur-md border-b border-[#1B2430]/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo Brand */}
          <a href="#top" className="flex items-center gap-2.5 group" aria-label="ClearPix / Meridian Vascular Home">
            <div className="w-8 h-8 rounded-sm bg-[#EFF1EA] border border-[#2E6E62]/30 flex items-center justify-center p-1 shadow-xs group-hover:border-[#2E6E62] transition-colors">
              <svg viewBox="0 0 26 26" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M6 4C6 4 8 10 13 13C18 16 20 22 20 22" stroke="#2E6E62" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="6" cy="4" r="2" fill="#6B2737" />
                <circle cx="20" cy="22" r="2" fill="#6B2737" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-[#1B2430] leading-tight">
                Meridian Vascular
              </span>
              <span className="text-[11px] font-medium text-[#4A5563] tracking-wide uppercase">
                ClearPix Healthcare
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 text-[14px] text-[#4A5563] font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 hover:text-[#1B2430] ${
                  link.isAccent
                    ? 'text-[#6B2737] font-semibold hover:text-[#4E1C29]'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* ClearPix AI Guidance Assistant Trigger */}
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#2E6E62] bg-[#E4ECE8] border border-[#2E6E62]/30 rounded-[3px] hover:bg-[#2E6E62] hover:text-white transition-all shadow-xs"
              title="Open ClearPix AI Vascular Specialty Guidance"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ClearPix AI Guidance</span>
              <span className="sm:hidden">AI Guide</span>
            </button>

            {/* Quick Degree Assessment link */}
            <button
              onClick={onNavigateToDegree}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#6B2737] bg-transparent border border-[#6B2737]/35 rounded-[3px] hover:bg-[#6B2737] hover:text-white transition-all"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Degree Check</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#6B2737] hover:bg-[#4E1C29] rounded-[3px] transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#1B2430] hover:bg-[#E3E7DD] rounded-[3px] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#EFF1EA] border-b border-[#1B2430]/15 px-4 pt-3 pb-6 shadow-md animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-[3px] hover:bg-[#E3E7DD] transition-colors ${
                  link.isAccent ? 'text-[#6B2737] font-bold bg-[#6B2737]/10' : 'text-[#1B2430]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#1B2430]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#2E6E62] bg-[#E4ECE8] border border-[#2E6E62]/30 rounded-[3px] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>ClearPix AI Specialty Guidance</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#6B2737] rounded-[3px] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Clinic Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
