import React, { useState } from 'react';
import { DOCTOR_VISIT_QUESTIONS } from '../data/clinicalContent';
import { Stethoscope, CheckSquare, Square, Copy, Check, Info } from 'lucide-react';

export const DoctorVisitGuide: React.FC = () => {
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const toggleCheck = (idx: number) => {
    setCheckedQuestions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyQuestions = () => {
    const text = DOCTOR_VISIT_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="doctor-visit" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#6B2737] mb-1">
            Consultation Preparation
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Doctor Visit Guide: What to Expect &amp; What to Ask
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Your first vascular appointment is an empowering step. Being informed about the physical exam, duplex sonography, and asking targeted questions ensures you receive the optimal tailored care plan.
          </p>
        </div>

        {/* 3-Step Exam Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] p-6 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-serif font-bold flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="font-serif text-base font-bold text-[#1B2430] mb-2">
              Physical &amp; Visual Inspection
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
              You will stand on an elevated platform so the specialist can inspect the skin, palpate bulging veins for firmness or phlebitis, and assess ankle skin for hemosiderin staining and edema.
            </p>
          </div>

          <div className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] p-6 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-serif font-bold flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="font-serif text-base font-bold text-[#1B2430] mb-2">
              Bilateral Duplex Ultrasound
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
              A registered vascular technologist applies warm gel and glides the transducer along your leg. Gentle calf compressions test whether valves hold tight or allow reflux &gt;0.5 seconds.
            </p>
          </div>

          <div className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] p-6 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-serif font-bold flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="font-serif text-base font-bold text-[#1B2430] mb-2">
              Personalized Plan &amp; Insurance
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
              The doctor reviews your vascular anatomical map, establishes your CEAP classification, discusses procedure options (laser, RFA, glue), and outlines insurance pre-authorization requirements.
            </p>
          </div>

        </div>

        {/* Interactive Checklist of Questions to Bring */}
        <div className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[4px] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1B2430]/10 gap-3 mb-6">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1B2430]">
                8 Key Questions for Your Vascular Specialist
              </h3>
              <p className="text-xs text-[#707E94] mt-0.5">
                Check off questions as you prepare, or copy all questions to your phone notepad.
              </p>
            </div>

            <button
              onClick={handleCopyQuestions}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2E6E62] bg-[#E4ECE8] border border-[#2E6E62]/30 rounded-[3px] hover:bg-[#2E6E62] hover:text-white transition-all cursor-pointer self-start sm:self-center"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy All Questions'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {DOCTOR_VISIT_QUESTIONS.map((question, idx) => {
              const isChecked = !!checkedQuestions[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3.5 rounded-[3px] border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#E4ECE8]/60 border-[#2E6E62]/40 text-[#4A5563]'
                      : 'bg-white border-[#1B2430]/10 hover:border-[#1B2430]/30 text-[#1B2430]'
                  }`}
                >
                  <div className="shrink-0 mt-0.5 text-[#2E6E62]">
                    {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-[#94A3B8]" />}
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-[#707E94]' : ''}`}>
                    {question}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Preparation tips note */}
          <div className="mt-6 pt-4 border-t border-[#1B2430]/10 flex items-start gap-2.5 text-xs text-[#4A5563]">
            <Info className="w-4 h-4 text-[#B98B2E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1B2430]">Preparation Tip:</strong> Drink plenty of water before your duplex scan (well-hydrated veins are easier to visualize), wear loose shorts or comfortable pants, and avoid applying oily lotions to your legs on the morning of your visit.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
