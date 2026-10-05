import React from 'react';
import { Users, Briefcase, Heart, Clock, Scale, AlertTriangle } from 'lucide-react';

export const Causes: React.FC = () => {
  const causesList = [
    {
      icon: Users,
      title: "1. Genetics & Heredity",
      stat: "90% Risk",
      statDesc: "If both parents have varicose veins",
      description: "Genetic inheritance dictates the baseline structural strength of venous wall smooth muscle and valve cusps. Inherited collagen-matrix variations (COL3A1 gene) predispose leaflets to stretching."
    },
    {
      icon: Briefcase,
      title: "2. Occupational Posture",
      stat: "2.4x Multiplier",
      statDesc: "In static standing vs walking jobs",
      description: "Healthcare workers, educators, retail associates, and office workers maintain static limb positions. Inactive calf pumps maintain continuous 90 mmHg hydrostatic pressure on valve leaflets."
    },
    {
      icon: Heart,
      title: "3. Pregnancy & Hormones",
      stat: "+40% Volume",
      statDesc: "Maternal circulating blood increase",
      description: "Elevated progesterone relaxes smooth muscle in venous walls to accommodate fetal circulation. Simultaneously, the expanding uterus exerts mechanical compression on the inferior vena cava."
    },
    {
      icon: Clock,
      title: "4. Chronological Age",
      stat: "50%+ at 50+",
      statDesc: "Prevalence in adults over age 50",
      description: "As the body ages, venous walls gradually lose elasticity and resilience. Natural thinning of the tunica media and valve atrophy allow gradual retrograde blood regurgitation."
    },
    {
      icon: Scale,
      title: "5. Elevated BMI & Pressure",
      stat: "1.5x - 2x",
      statDesc: "Increased risk with elevated abdominal mass",
      description: "Excess body weight increases baseline intra-abdominal pressure, raising resistance against which lower extremity veins must pump blood toward the inferior vena cava and heart."
    },
    {
      icon: AlertTriangle,
      title: "6. Prior DVT / Trauma",
      stat: "Post-Thrombotic",
      statDesc: "Secondary valvular destruction",
      description: "A prior blood clot in the deep veins (Deep Vein Thrombosis) can permanently damage delicate valve architecture, resulting in chronic secondary venous insufficiency."
    }
  ];

  return (
    <section id="causes" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#6B2737] mb-1">
            Etiology &amp; Predisposing Factors
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Primary Causes &amp; Clinical Risk Factors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Varicose veins develop from a confluence of inherited structural predispositions and environmental hydrostatic loads. Understanding your personal risk factors is essential for targeted clinical management.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causesList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] p-6 shadow-xs hover:border-[#2E6E62]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-[3px] bg-[#E4ECE8] border border-[#2E6E62]/30 flex items-center justify-center text-[#2E6E62]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-base font-bold text-[#6B2737] tabular-nums block">
                        {item.stat}
                      </span>
                      <span className="text-[10px] text-[#707E94] uppercase tracking-wide">
                        {item.statDesc}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#1B2430] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1B2430]/10 text-[11px] text-[#707E94] flex items-center justify-between">
                  <span>Modifiable vs Genetic</span>
                  <a href="#degree-assessment" className="text-[#2E6E62] font-semibold hover:underline">
                    Calculate your score &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
