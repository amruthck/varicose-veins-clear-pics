import React from 'react';
import { ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAssistant: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssistant, onOpenBooking }) => {
  return (
    <footer id="book" className="bg-[#1B2430] text-[#EFF1EA] pt-16 pb-12 border-t border-[#1B2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-sm bg-[#EFF1EA] flex items-center justify-center p-1">
                <svg viewBox="0 0 26 26" fill="none" className="w-6 h-6" aria-hidden="true">
                  <path d="M6 4C6 4 8 10 13 13C18 16 20 22 20 22" stroke="#2E6E62" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="6" cy="4" r="2" fill="#6B2737" />
                  <circle cx="20" cy="22" r="2" fill="#6B2737" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block leading-tight">
                  Meridian Vascular
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase">
                  ClearPix Healthcare
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm mb-6">
              Center for Lower Extremity Venous Hemodynamics, Duplex Ultrasound Diagnostics, and Minimally Invasive Endovenous Ablation. Serving patients with precision, transparency, and clinical excellence.
            </p>

            <div className="space-y-2 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>400 Meridian Parkway, Suite 400</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>(800) 555-VEIN (8346)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>care@meridianvascular.com</span>
              </div>
            </div>
          </div>

          {/* Clinical Navigation */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-white mb-3">
              Clinical Guide
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li><a href="#what-are" className="hover:text-white transition-colors">Vein Anatomy &amp; Reflux</a></li>
              <li><a href="#causes" className="hover:text-white transition-colors">Causes &amp; Risk Factors</a></li>
              <li><a href="#symptoms" className="hover:text-white transition-colors">Sensory &amp; Visible Symptoms</a></li>
              <li><a href="#leg-pain" className="hover:text-white transition-colors">Venous vs Arterial Leg Pain</a></li>
              <li><a href="#progression" className="hover:text-white transition-colors">CEAP Progression Scale</a></li>
              <li><a href="#duplex-scan" className="hover:text-white transition-colors">Duplex Ultrasound Criteria</a></li>
              <li><a href="#treatment" className="hover:text-white transition-colors">Endovenous Laser &amp; VenaSeal</a></li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-sm font-bold text-white mb-3">
              Patient Care
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li><a href="#degree-assessment" className="hover:text-white transition-colors font-semibold text-[#F7ECEF]">Take Degree Check</a></li>
              <li><a href="#doctor-visit" className="hover:text-white transition-colors">Doctor Visit Checklist</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Insurance &amp; Coverage FAQ</a></li>
              <li><button onClick={onOpenAssistant} className="hover:text-white transition-colors text-left cursor-pointer">ClearPix AI Assistant</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">Book Consultation</button></li>
            </ul>
          </div>

          {/* Quick Schedule Card */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[3px] p-5">
            <h4 className="font-serif text-sm font-bold text-white mb-1.5">
              Ready for Clinical Evaluation?
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              Schedule your standing bilateral duplex ultrasound mapping. Most major insurance plans and Medicare accepted.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#6B2737] hover:bg-[#4E1C29] rounded-[2px] transition-colors shadow-xs cursor-pointer block text-center"
            >
              Book In-Clinic Appointment
            </button>
          </div>

        </div>

        {/* Mandatory Medical Legal Disclaimer */}
        <div className="pt-8 text-[11px] text-[#707E94] leading-relaxed space-y-2">
          <p>
            <strong className="text-[#94A3B8]">Medical Disclaimer:</strong> The educational content, clinical descriptions, duplex ultrasound simulations, and CEAP degree scoring tools on this website are provided exclusively for informational and educational orientation by ClearPix Healthcare / Meridian Vascular. They do not constitute the practice of medicine, nursing, or other professional health care services, and are not a substitute for formal clinical diagnosis, standing ultrasound evaluation, or treatment by a board-certified vascular surgeon or phlebologist. Always seek the advice of your physician regarding any medical condition.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-white/5 text-[10px] text-[#64748B]">
            <div>
              &copy; {new Date().getFullYear()} ClearPix Healthcare &amp; Meridian Vascular Center. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>CEAP Classification Standards</span>
              <span>·</span>
              <span>Duplex Ultrasound Reflux Protocol</span>
              <span>·</span>
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
