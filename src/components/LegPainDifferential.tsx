import React, { useState } from 'react';
import { LEG_PAIN_DIFFERENTIAL } from '../data/clinicalContent';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const LegPainDifferential: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<number>(0);

  return (
    <section id="leg-pain" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#6B2737] mb-1">
            Clinical Differential Diagnosis
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Is Your Leg Pain Venous, Arterial, or Neurological?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Not all lower limb pain stems from varicose veins. Distinguishing between venous hypertension, arterial insufficiency (claudication), sciatica, and joint arthritis ensures you receive the correct diagnostic evaluation.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#E3E7DD] border-b border-[#1B2430]/15 text-[#1B2430]">
                <th className="py-3.5 px-4 font-serif font-bold w-1/5">Condition</th>
                <th className="py-3.5 px-4 font-serif font-bold w-1/5">Pain Onset &amp; Quality</th>
                <th className="py-3.5 px-4 font-serif font-bold w-1/5">What Aggravates It</th>
                <th className="py-3.5 px-4 font-serif font-bold w-1/5">What Relieves It</th>
                <th className="py-3.5 px-4 font-serif font-bold w-1/5">Defining Clinical Sign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B2430]/10">
              {LEG_PAIN_DIFFERENTIAL.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    idx === 0
                      ? 'bg-[#E4ECE8]/50 font-medium'
                      : 'hover:bg-white'
                  }`}
                >
                  <td className="py-4 px-4 font-semibold text-[#1B2430]">
                    <div className="flex items-center gap-1.5">
                      {idx === 0 && <span className="w-2 h-2 rounded-full bg-[#2E6E62]"></span>}
                      <span>{row.feature}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#4A5563] leading-relaxed">{row.onset}</td>
                  <td className="py-4 px-4 text-[#4A5563] leading-relaxed">{row.aggravating}</td>
                  <td className="py-4 px-4 text-[#4A5563] leading-relaxed">{row.relieving}</td>
                  <td className="py-4 px-4 text-[#1B2430] font-medium leading-relaxed">{row.keySign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Segmented Cards View */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 bg-[#E3E7DD] p-1 rounded-[3px]">
            {LEG_PAIN_DIFFERENTIAL.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCondition(idx)}
                className={`py-2 px-3 text-xs font-semibold rounded-[2px] text-center transition-all ${
                  selectedCondition === idx
                    ? 'bg-white text-[#1B2430] shadow-xs'
                    : 'text-[#4A5563]'
                }`}
              >
                {item.feature.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="bg-white border border-[#1B2430]/15 rounded-[3px] p-5 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#1B2430] mb-3 pb-2 border-b border-[#1B2430]/10 flex items-center justify-between">
              <span>{LEG_PAIN_DIFFERENTIAL[selectedCondition].feature}</span>
              {selectedCondition === 0 && (
                <span className="text-[10px] bg-[#E4ECE8] text-[#2E6E62] px-2 py-0.5 rounded-[2px] font-mono">
                  Venous Focus
                </span>
              )}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-[#1B2430] block">Onset &amp; Timing:</span>
                <span className="text-[#4A5563]">{LEG_PAIN_DIFFERENTIAL[selectedCondition].onset}</span>
              </div>
              <div>
                <span className="font-semibold text-[#1B2430] block">Aggravated By:</span>
                <span className="text-[#4A5563]">{LEG_PAIN_DIFFERENTIAL[selectedCondition].aggravating}</span>
              </div>
              <div>
                <span className="font-semibold text-[#1B2430] block">Relieved By:</span>
                <span className="text-[#4A5563]">{LEG_PAIN_DIFFERENTIAL[selectedCondition].relieving}</span>
              </div>
              <div className="pt-2 border-t border-[#1B2430]/10">
                <span className="font-semibold text-[#6B2737] block">Hallmark Indicator:</span>
                <span className="text-[#1B2430] font-medium">{LEG_PAIN_DIFFERENTIAL[selectedCondition].keySign}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elevation Test Callout */}
        <div className="mt-8 bg-white border border-[#1B2430]/15 rounded-[3px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#2E6E62] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1B2430]">
              <strong className="font-bold text-[#2E6E62]">The 15-Minute Elevation Diagnostic Rule:</strong> If lying flat and elevating your legs above heart level for 15 minutes relieves your aching and heaviness, your pain is almost certainly venous in origin. Conversely, if leg elevation worsens pain, prompt arterial evaluation is required.
            </div>
          </div>
          <a
            href="#degree-assessment"
            className="text-xs font-semibold text-white bg-[#2E6E62] px-4 py-2 rounded-[3px] hover:bg-[#20504A] transition-colors whitespace-nowrap shrink-0 text-center"
          >
            Assess Your Pain Score &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
