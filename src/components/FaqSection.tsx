import React, { useState } from 'react';
import { FAQS } from '../data/clinicalContent';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = FAQS.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#6B2737] mb-1">
            Common Patient Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Frequently Asked Vascular Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A5563] leading-relaxed">
            Essential facts on medical coverage, anatomical rerouting, pain management, and long-term outcomes.
          </p>

          {/* Search bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-[#707E94] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. insurance, ultrasound, pain)..."
              className="w-full bg-white border border-[#1B2430]/15 rounded-[3px] py-2 pl-9 pr-4 text-xs text-[#1B2430] placeholder-[#94A3B8] focus:outline-none focus:border-[#2E6E62]"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1B2430]">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-[#2E6E62]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#4A5563] leading-relaxed border-t border-[#1B2430]/10 pt-4 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-[#707E94] bg-[#F7F8F4] rounded-[3px] border border-[#1B2430]/10">
              No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another search term.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
