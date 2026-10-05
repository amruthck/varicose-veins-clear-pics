import React, { useState } from 'react';
import { Sun, Moon, Activity, Eye, AlertCircle } from 'lucide-react';

export const Symptoms: React.FC = () => {
  const [symptomView, setSymptomView] = useState<'sensory' | 'visible'>('sensory');

  const sensorySymptoms = [
    {
      title: "Leg Heaviness & Fatigue",
      description: "A profound leaden sensation in the calves and thighs, making routine stair-climbing feel exhausting, especially after standing for hours.",
      hemodynamics: "Accumulated hydrostatic blood column weight stretching perivascular mechanoreceptors."
    },
    {
      title: "Throbbing & Dull Ache",
      description: "A continuous, low-grade ache localized along the path of the diseased great or small saphenous vein that peaks in the evening hours.",
      hemodynamics: "High venous wall tension and localized hypoxia from stagnant deoxygenated blood pooling."
    },
    {
      title: "Nocturnal Calf Cramps",
      description: "Sudden, involuntary, and painful muscle spasms in the gastrocnemius (calf) that violently awake the patient from deep sleep.",
      hemodynamics: "Accumulated lactic acid and metabolic waste products due to impaired microvascular venous drainage."
    },
    {
      title: "Burning & Pruritus (Itching)",
      description: "Localized warm sensation or intense skin itching directly overlying visible varicosities, commonly misdiagnosed as simple dry skin.",
      hemodynamics: "Venous stasis triggers leukocyte trapping, degranulation, and inflammatory cytokine histamine release."
    },
    {
      title: "Restless Leg Sensations",
      description: "An irresistible urge to kick or move the legs when relaxing in bed, accompanied by tingling or crawling sensations.",
      hemodynamics: "Subtle venous hypertension irritating sensory nerve fibers in muscular compartments."
    }
  ];

  const visibleSigns = [
    {
      title: "Bulging Subcutaneous Veins",
      description: "Elevated, rope-like, tortuous bluish-green cords measuring >3mm that protrude prominently when standing and collapse when elevated.",
      hemodynamics: "Complete loss of valvular coaptation with vein wall elastin degradation."
    },
    {
      title: "Telangiectasias & Reticular Veins",
      description: "Fine spider web-like red/purple networks (<1mm) and bluish reticular feeder veins (1-3mm) spread across calves and thighs.",
      hemodynamics: "Intradermal capillary bed hypertension fed by underlying incompetent tributaries."
    },
    {
      title: "Pitting Ankle Edema",
      description: "Fluid swelling around the inner and outer ankle (malleoli) that leaves a persistent indentation when pressed with a thumb and leaves deep sock rings.",
      hemodynamics: "Capillary filtration rate exceeds lymphatic drainage capacity, flooding interstitial tissue."
    },
    {
      title: "Hemosiderin Pigmentation",
      description: "Mottled brown, bronze, or rust-colored staining of the lower leg skin that does not wash off.",
      hemodynamics: "Red blood cells squeeze out of capillaries (diapedesis) and break down, releasing iron pigment that tattoos the dermis."
    },
    {
      title: "Lipodermatosclerosis",
      description: "Skin and subcutaneous fat become firm, bound-down, and leathery, leading to a tapered 'inverted champagne bottle' leg contour.",
      hemodynamics: "Chronic dermal inflammation triggers fibrotic remodeling and capillary micro-thrombosis."
    }
  ];

  return (
    <section id="symptoms" className="py-16 bg-[#F7F8F4] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-4 border-b border-[#1B2430]/10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-1">
              Sensory Hallmarks &amp; Physical Manifestations
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
              Symptoms of Chronic Venous Disease
            </h2>
          </div>

          {/* Toggle between Sensory and Visible */}
          <div className="mt-4 lg:mt-0 flex items-center bg-[#E3E7DD] p-1 rounded-[3px]">
            <button
              onClick={() => setSymptomView('sensory')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-[2px] transition-all ${
                symptomView === 'sensory'
                  ? 'bg-white text-[#1B2430] shadow-xs'
                  : 'text-[#4A5563] hover:text-[#1B2430]'
              }`}
            >
              Sensory &amp; Discomfort ({sensorySymptoms.length})
            </button>
            <button
              onClick={() => setSymptomView('visible')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-[2px] transition-all ${
                symptomView === 'visible'
                  ? 'bg-white text-[#1B2430] shadow-xs'
                  : 'text-[#4A5563] hover:text-[#1B2430]'
              }`}
            >
              Visible &amp; Skin Changes ({visibleSigns.length})
            </button>
          </div>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(symptomView === 'sensory' ? sensorySymptoms : visibleSigns).map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#1B2430]/15 rounded-[3px] p-5 shadow-xs hover:border-[#2E6E62]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#707E94] mb-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#2E6E62]" />
                  <span>Clinical Feature 0{idx + 1}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#1B2430] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1B2430]/10 bg-[#EFF1EA]/40 -mx-5 -mb-5 p-4 rounded-b-[3px]">
                <span className="text-[11px] font-semibold text-[#1B2430] block mb-0.5">
                  Pathophysiologic Mechanism:
                </span>
                <p className="text-[11px] text-[#707E94] leading-normal">
                  {item.hemodynamics}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Circadian Symptom Fluctuation Banner */}
        <div className="mt-10 bg-[#EFF1EA] border border-[#1B2430]/15 rounded-[3px] p-6">
          <div className="text-xs font-semibold text-[#1B2430] uppercase tracking-wide mb-3">
            Diurnal Rhythm: Why Venous Symptoms Worsen by Evening
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 bg-white p-4 rounded-[3px] border border-[#1B2430]/10">
              <Sun className="w-5 h-5 text-[#B98B2E] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B2430]">08:00 AM (Morning)</h4>
                <p className="text-xs text-[#4A5563] mt-1 leading-relaxed">
                  After 8 hours of recumbent sleep, gravity has not exerted hydrostatic column pressure. Venous return has normalized, ankle edema is minimal or resolved, and legs feel relatively light and painless.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-[3px] border border-[#1B2430]/10">
              <Moon className="w-5 h-5 text-[#6B2737] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B2430]">06:00 PM (Late Afternoon / Evening)</h4>
                <p className="text-xs text-[#4A5563] mt-1 leading-relaxed">
                  After 10+ hours of upright standing or desk sitting, gravity has forced liters of retrograde volume against failing valves. Capillaries leak plasma, resulting in swollen ankles, deep throbbing, and tightness.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
