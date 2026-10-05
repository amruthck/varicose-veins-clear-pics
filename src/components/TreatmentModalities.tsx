import React, { useState } from 'react';
import { TREATMENT_MODALITIES } from '../data/clinicalContent';
import { Shield, Clock, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

export const TreatmentModalities: React.FC = () => {
  const [selectedTx, setSelectedTx] = useState<number>(0);
  const current = TREATMENT_MODALITIES[selectedTx];

  return (
    <section id="treatment" className="py-16 bg-[#F7F8F4] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-1">
            Minimally Invasive Outpatient Therapies
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Modern Treatment Options: No Hospital Stays, No Stripping
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Painful vein stripping surgeries with weeks of bedrest are obsolete. Today&apos;s outpatient endovenous procedures seal diseased saphenous veins through a tiny needle puncture in under 45 minutes, allowing you to walk out immediately.
          </p>
        </div>

        {/* Treatment Selector Tabs + Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Treatment Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {TREATMENT_MODALITIES.map((tx, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTx(idx)}
                className={`w-full text-left p-4 rounded-[3px] border transition-all flex items-center justify-between cursor-pointer ${
                  selectedTx === idx
                    ? 'bg-white border-[#2E6E62] shadow-xs ring-1 ring-[#2E6E62]'
                    : 'bg-[#EFF1EA]/70 border-[#1B2430]/15 hover:bg-white'
                }`}
              >
                <div>
                  <span className="text-[11px] font-mono text-[#707E94] uppercase tracking-wide block">
                    {tx.category}
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-[#1B2430]">
                    {tx.name}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  selectedTx === idx ? 'text-[#2E6E62] translate-x-1' : 'text-[#94A3B8]'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Treatment Dossier */}
          <div className="lg:col-span-7 bg-white border border-[#1B2430]/15 rounded-[4px] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1B2430]/10 gap-2 mb-6">
              <div>
                <span className="text-xs font-semibold text-[#6B2737] uppercase tracking-wide">
                  {current.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B2430]">
                  {current.name}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#E4ECE8] text-[#2E6E62] px-3 py-1 rounded-[2px] self-start sm:self-center">
                {current.successRate}
              </span>
            </div>

            {/* How it works */}
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase text-[#1B2430] block mb-1">
                How It Works:
              </span>
              <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                {current.howItWorks}
              </p>
            </div>

            {/* 3-Cell Metadata Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#EFF1EA] p-3 rounded-[3px] border border-[#1B2430]/10">
                <span className="text-[11px] text-[#707E94] uppercase block flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#2E6E62]" />
                  <span>Duration</span>
                </span>
                <span className="font-serif text-sm font-bold text-[#1B2430] mt-1 block">
                  {current.duration}
                </span>
              </div>

              <div className="bg-[#EFF1EA] p-3 rounded-[3px] border border-[#1B2430]/10">
                <span className="text-[11px] text-[#707E94] uppercase block flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#6B2737]" />
                  <span>Anesthesia</span>
                </span>
                <span className="font-serif text-xs font-bold text-[#1B2430] mt-1 block leading-tight">
                  {current.anesthesia}
                </span>
              </div>

              <div className="bg-[#EFF1EA] p-3 rounded-[3px] border border-[#1B2430]/10">
                <span className="text-[11px] text-[#707E94] uppercase block flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#B98B2E]" />
                  <span>Ambulation</span>
                </span>
                <span className="font-serif text-xs font-bold text-[#1B2430] mt-1 block leading-tight">
                  Immediate (Walk out)
                </span>
              </div>
            </div>

            {/* Recovery & Ideal Candidacy */}
            <div className="space-y-3 text-xs sm:text-sm pt-4 border-t border-[#1B2430]/10">
              <div>
                <strong className="text-[#1B2430]">Post-Procedure Recovery: </strong>
                <span className="text-[#4A5563]">{current.recovery}</span>
              </div>
              <div>
                <strong className="text-[#1B2430]">Ideal Clinical Candidacy: </strong>
                <span className="text-[#4A5563]">{current.idealFor}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
