import React from 'react';
import { ArrowRight, ShieldCheck, Activity, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onOpenAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment, onOpenAssistant }) => {
  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#1B2430]/10 overflow-hidden bg-gradient-to-b from-[#EFF1EA] to-[#E3E7DD]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-3">
          <span>ClearPix Healthcare</span>
          <span aria-hidden="true">·</span>
          <span>Meridian Vascular Center</span>
          <span aria-hidden="true">·</span>
          <span>Clinical Education &amp; Diagnostics</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2430] leading-[1.18] tracking-tight">
              Understanding Varicose Veins &amp; Clinical Degree Assessment
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#4A5563] leading-relaxed max-w-2xl">
              An evidence-based guide to lower extremity venous hemodynamics, progressive CEAP staging (C0 to C6), bilateral duplex ultrasound mapping, and modern minimally invasive interventions.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartAssessment}
                className="px-5 py-3 text-sm font-semibold text-white bg-[#6B2737] hover:bg-[#4E1C29] rounded-[3px] shadow-sm flex items-center gap-2 transition-all cursor-pointer group"
              >
                <span>Check Your Vein Degree</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenAssistant}
                className="px-4 py-3 text-sm font-semibold text-[#2E6E62] bg-[#E4ECE8] hover:bg-[#2E6E62] hover:text-white border border-[#2E6E62]/30 rounded-[3px] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>ClearPix AI Specialty Guidance</span>
              </button>

              <a
                href="#duplex-scan"
                className="px-4 py-3 text-sm font-medium text-[#1B2430] hover:text-[#2E6E62] transition-colors"
              >
                Learn Duplex Ultrasound &rarr;
              </a>
            </div>

            {/* Trust Markers */}
            <div className="mt-10 pt-6 border-t border-[#1B2430]/10 grid grid-cols-3 gap-4 text-xs text-[#4A5563]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E6E62] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1B2430]">CEAP Classified</span>
                  <span>Validated C0 to C6 scale</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-[#B98B2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1B2430]">Duplex Ultrasound</span>
                  <span>Spectral Doppler accuracy</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6B2737] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1B2430]">Evidence-Based</span>
                  <span>Outpatient vein solutions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Anatomical Cross-Section Diagram */}
          <div className="lg:col-span-5">
            <div className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[4px] p-6 shadow-md relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#1B2430]/10">
                <div className="text-xs font-semibold text-[#1B2430] tracking-wide uppercase">
                  Venous Hemodynamics Cross-Section
                </div>
                <span className="text-[11px] font-mono text-[#707E94] bg-[#E3E7DD] px-2 py-0.5 rounded-[2px]">
                  Reflux &gt; 0.5s Threshold
                </span>
              </div>

              {/* Vector Valve Mechanics Graphic */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                
                {/* Competent Valve */}
                <div className="bg-[#E4ECE8]/60 border border-[#2E6E62]/30 rounded-[3px] p-3.5 flex flex-col items-center text-center">
                  <div className="text-xs font-bold text-[#2E6E62] mb-1">Healthy Vein</div>
                  <div className="text-[11px] text-[#4A5563] mb-3">One-way bicuspid valves snap closed</div>
                  
                  <div className="w-24 h-44 bg-white border border-[#2E6E62]/20 rounded-full relative overflow-hidden flex flex-col items-center justify-center p-2 shadow-inner">
                    {/* Blood flow direction arrows upward */}
                    <div className="text-[10px] text-[#2E6E62] font-semibold flex items-center gap-1 mb-2">
                      <span>&uarr; Upward</span>
                    </div>

                    {/* Valve cusps meeting in center */}
                    <svg viewBox="0 0 80 120" className="w-full h-24">
                      {/* Vein walls */}
                      <path d="M 15,0 L 15,120" stroke="#CBD5E1" strokeWidth="4" />
                      <path d="M 65,0 L 65,120" stroke="#CBD5E1" strokeWidth="4" />
                      {/* Valve cusps closed */}
                      <path d="M 15,60 Q 40,75 40,82" stroke="#2E6E62" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                      <path d="M 65,60 Q 40,75 40,82" stroke="#2E6E62" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                      {/* Upward flow particles */}
                      <circle cx="40" cy="30" r="3" fill="#2E6E62" />
                      <circle cx="34" cy="45" r="2.5" fill="#2E6E62" />
                      <circle cx="46" cy="45" r="2.5" fill="#2E6E62" />
                    </svg>

                    <div className="text-[10px] text-[#2E6E62] font-bold mt-1">Normal Flow</div>
                  </div>
                  
                  <span className="text-[11px] text-[#4A5563] mt-2">Zero retrograde pooling</span>
                </div>

                {/* Incompetent Varicose Vein */}
                <div className="bg-[#F7ECEF]/70 border border-[#6B2737]/30 rounded-[3px] p-3.5 flex flex-col items-center text-center">
                  <div className="text-xs font-bold text-[#6B2737] mb-1">Varicose Reflux</div>
                  <div className="text-[11px] text-[#4A5563] mb-3">Dilated lumen, valves fail to close</div>

                  <div className="w-24 h-44 bg-white border border-[#6B2737]/20 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-2 shadow-inner">
                    {/* Retrograde flow warning */}
                    <div className="text-[10px] text-[#6B2737] font-semibold flex items-center gap-1 mb-2">
                      <span>&darr; Backflow</span>
                    </div>

                    {/* Dilated vein walls and open cusps */}
                    <svg viewBox="0 0 80 120" className="w-full h-24">
                      {/* Tortuous stretched vein walls */}
                      <path d="M 10,0 C 8,40 18,80 10,120" stroke="#FCA5A5" strokeWidth="5" fill="none" />
                      <path d="M 70,0 C 72,40 62,80 70,120" stroke="#FCA5A5" strokeWidth="5" fill="none" />
                      {/* Incompetent gaping cusps */}
                      <path d="M 12,60 Q 25,68 28,75" stroke="#6B2737" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M 68,60 Q 55,68 52,75" stroke="#6B2737" strokeWidth="3" fill="none" strokeLinecap="round" />
                      {/* Retrograde blood pooling */}
                      <circle cx="40" cy="65" r="4.5" fill="#6B2737" />
                      <circle cx="33" cy="85" r="3.5" fill="#6B2737" />
                      <circle cx="47" cy="85" r="3.5" fill="#6B2737" />
                      <circle cx="40" cy="100" r="4" fill="#6B2737" />
                    </svg>

                    <div className="text-[10px] text-[#6B2737] font-bold mt-1">Venous Stasis</div>
                  </div>

                  <span className="text-[11px] text-[#6B2737] font-medium mt-2">Elevated venous pressure</span>
                </div>
              </div>

              {/* Bottom explanatory note */}
              <div className="mt-4 pt-3 border-t border-[#1B2430]/10 flex items-center justify-between text-xs text-[#4A5563]">
                <span>Superficial Great Saphenous Vein (GSV)</span>
                <a href="#what-are" className="text-[#2E6E62] font-semibold hover:underline">
                  Anatomy deep-dive &rarr;
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
