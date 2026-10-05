import React from 'react';
import { DID_YOU_KNOW_FACTS } from '../data/clinicalContent';
import { Info, HelpCircle } from 'lucide-react';

export const DidYouKnow: React.FC = () => {
  return (
    <section id="did-you-know" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1B2430]/10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#6B2737] mb-1">
              Clinical Epidemiology &amp; Hemodynamics
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
              Did You Know? The Science of Vein Health
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-[#4A5563] max-w-md">
            Veins are thin-walled, low-pressure capacitance vessels that rely on muscular pumps and delicate bicuspid valves to return blood toward your heart.
          </p>
        </div>

        {/* Fact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DID_YOU_KNOW_FACTS.map((fact, index) => (
            <div
              key={index}
              className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] p-6 shadow-xs hover:border-[#2E6E62]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#2E6E62] tabular-nums tracking-tight">
                  {fact.metric}
                </div>
                <div className="text-sm font-semibold text-[#1B2430] mt-1 mb-2.5">
                  {fact.label}
                </div>
                <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                  {fact.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1B2430]/10 flex items-center gap-1.5 text-[11px] text-[#707E94]">
                <Info className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>Verified Vascular Literature</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key takeaway callout banner */}
        <div className="mt-8 bg-[#E4ECE8] border-l-4 border-[#2E6E62] p-4 sm:p-5 rounded-r-[3px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#2E6E62] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1B2430] leading-relaxed">
              <strong className="font-semibold text-[#2E6E62]">Common Misconception:</strong> Varicose veins are not merely a cosmetic flaw. Left unmanaged, continuous venous hypertension triggers dermal hemosiderin pigmentation, painful lipodermatosclerosis, and non-healing venous stasis ulcers.
            </div>
          </div>
          <a
            href="#progression"
            className="text-xs font-semibold text-[#2E6E62] hover:text-[#20504A] whitespace-nowrap underline shrink-0"
          >
            Review CEAP Stages &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
