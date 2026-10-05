import React, { useState } from 'react';
import { CEAP_STAGES } from '../data/clinicalContent';
import { ChevronRight, ArrowRight, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export const ProgressionCEAP: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(2); // Default to C2 (Varicose Veins)
  const currentStage = CEAP_STAGES[selectedStageIndex];

  return (
    <section id="progression" className="py-16 bg-[#F7F8F4] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-1">
            International Classification Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Disease Progression: The CEAP Classification (C0 – C6)
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Venous disease is progressive. Without valve repair or saphenous ablation, mild spider veins or evening swelling can advance into chronic inflammatory skin damage and ulceration over several years.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-8 bg-[#E3E7DD] p-1.5 rounded-[4px]">
          {CEAP_STAGES.map((s, idx) => (
            <button
              key={s.stage}
              onClick={() => setSelectedStageIndex(idx)}
              className={`py-2 px-1 text-center rounded-[3px] transition-all flex flex-col items-center ${
                selectedStageIndex === idx
                  ? 'bg-white text-[#1B2430] shadow-sm font-bold ring-1 ring-[#1B2430]/15'
                  : 'text-[#4A5563] hover:bg-white/60 hover:text-[#1B2430]'
              }`}
            >
              <span className="font-serif text-sm sm:text-base block">{s.stage}</span>
              <span className="text-[10px] sm:text-[11px] truncate max-w-full font-sans font-medium hidden md:inline">
                {s.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1B2430]/10 gap-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl font-bold text-[#6B2737]">
                  Stage {currentStage.stage}
                </span>
                <span className="text-lg font-serif font-semibold text-[#1B2430]">
                  — {currentStage.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A5563] mt-1.5 leading-relaxed max-w-2xl">
                {currentStage.clinicalDescription}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <span className={`text-xs font-semibold px-3 py-1 rounded-[2px] ${
                currentStage.urgency === 'Immediate'
                  ? 'bg-[#6B2737] text-white'
                  : currentStage.urgency === 'High'
                  ? 'bg-[#EA580C] text-white'
                  : currentStage.urgency === 'Moderate'
                  ? 'bg-[#B98B2E] text-white'
                  : 'bg-[#E4ECE8] text-[#2E6E62]'
              }`}>
                Urgency: {currentStage.urgency}
              </span>
            </div>
          </div>

          {/* 3-Column Detailed Anatomical Matrix */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Physical Manifestations */}
            <div className="bg-[#EFF1EA]/60 p-4 rounded-[3px] border border-[#1B2430]/10">
              <div className="text-xs font-semibold uppercase text-[#1B2430] mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B2737]"></span>
                <span>Physical Manifestations</span>
              </div>
              <ul className="space-y-2 text-xs text-[#4A5563]">
                {currentStage.physicalManifestations.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#6B2737] font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reflux Mechanism */}
            <div className="bg-[#EFF1EA]/60 p-4 rounded-[3px] border border-[#1B2430]/10">
              <div className="text-xs font-semibold uppercase text-[#1B2430] mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B98B2E]"></span>
                <span>Underlying Reflux Mechanism</span>
              </div>
              <p className="text-xs text-[#4A5563] leading-relaxed">
                {currentStage.refluxMechanism}
              </p>
              <div className="mt-3 pt-2 border-t border-[#1B2430]/10 text-[11px] text-[#707E94]">
                <strong>Reversibility:</strong> {currentStage.reversibility}
              </div>
            </div>

            {/* Recommended Treatments */}
            <div className="bg-[#EFF1EA]/60 p-4 rounded-[3px] border border-[#1B2430]/10">
              <div className="text-xs font-semibold uppercase text-[#1B2430] mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E6E62]"></span>
                <span>Evidence-Based Treatments</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#4A5563]">
                {currentStage.treatmentApproaches.map((tx, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6E62] shrink-0" />
                    <span>{tx}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Stage Navigation Bar */}
          <div className="mt-6 pt-4 border-t border-[#1B2430]/10 flex items-center justify-between">
            <button
              onClick={() => setSelectedStageIndex(Math.max(0, selectedStageIndex - 1))}
              disabled={selectedStageIndex === 0}
              className="text-xs font-semibold text-[#1B2430] hover:text-[#2E6E62] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              &larr; Previous Stage ({selectedStageIndex > 0 ? CEAP_STAGES[selectedStageIndex - 1].stage : 'Start'})
            </button>

            <span className="text-xs font-mono text-[#707E94]">
              Stage {selectedStageIndex + 1} of {CEAP_STAGES.length}
            </span>

            <button
              onClick={() => setSelectedStageIndex(Math.min(CEAP_STAGES.length - 1, selectedStageIndex + 1))}
              disabled={selectedStageIndex === CEAP_STAGES.length - 1}
              className="text-xs font-semibold text-[#1B2430] hover:text-[#2E6E62] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next Stage ({selectedStageIndex < CEAP_STAGES.length - 1 ? CEAP_STAGES[selectedStageIndex + 1].stage : 'End'}) &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
