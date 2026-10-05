import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, Activity } from 'lucide-react';

export const Overview: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<'superficial' | 'deep' | 'perforator'>('superficial');

  return (
    <section id="what-are" className="py-16 bg-[#F7F8F4] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-1">
            Anatomical Architecture &amp; Pathophysiology
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            What Are Varicose Veins? The Three Venous Networks
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Unlike arteries powered by the direct systolic pumping of the heart, leg veins carry deoxygenated blood against gravity back toward the right atrium. This return is powered by the calf muscle pump and maintained by one-way bicuspid valves.
          </p>
        </div>

        {/* Anatomical Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Network Selector Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Superficial Veins Card */}
            <div
              onClick={() => setActiveSystem('superficial')}
              className={`p-5 rounded-[3px] border cursor-pointer transition-all ${
                activeSystem === 'superficial'
                  ? 'bg-white border-[#2E6E62] shadow-sm ring-1 ring-[#2E6E62]'
                  : 'bg-[#EFF1EA]/60 border-[#1B2430]/15 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-serif text-base font-bold text-[#1B2430]">
                  1. Superficial Venous Network
                </div>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-[2px] ${
                  activeSystem === 'superficial' ? 'bg-[#E4ECE8] text-[#2E6E62]' : 'bg-[#E3E7DD] text-[#707E94]'
                }`}>
                  Origin of Varicose Veins
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Positioned in subcutaneous tissue above the muscular fascia. Dominated by the <strong>Great Saphenous Vein (GSV)</strong> running from inner ankle to groin, and the <strong>Small Saphenous Vein (SSV)</strong> behind the calf. Lacks muscular counter-pressure, making it prone to bulging.
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-[#2E6E62] font-semibold">
                <span>Handles ~10% resting blood volume</span>
                <span>·</span>
                <span>Safely treatable with ablation</span>
              </div>
            </div>

            {/* Deep Venous Network Card */}
            <div
              onClick={() => setActiveSystem('deep')}
              className={`p-5 rounded-[3px] border cursor-pointer transition-all ${
                activeSystem === 'deep'
                  ? 'bg-white border-[#2E6E62] shadow-sm ring-1 ring-[#2E6E62]'
                  : 'bg-[#EFF1EA]/60 border-[#1B2430]/15 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-serif text-base font-bold text-[#1B2430]">
                  2. Deep Venous Network
                </div>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-[2px] ${
                  activeSystem === 'deep' ? 'bg-[#E4ECE8] text-[#2E6E62]' : 'bg-[#E3E7DD] text-[#707E94]'
                }`}>
                  Core Circulatory Conduit
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Encased inside deep muscular fascia alongside major arteries (Femoral, Popliteal, and Tibial veins). Directly compressed by contracting calf muscles during walking, returning over 90% of leg venous blood to the heart.
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-[#2E6E62] font-semibold">
                <span>Carries 90%+ venous blood volume</span>
                <span>·</span>
                <span>Site of Deep Vein Thrombosis (DVT)</span>
              </div>
            </div>

            {/* Perforator Veins Card */}
            <div
              onClick={() => setActiveSystem('perforator')}
              className={`p-5 rounded-[3px] border cursor-pointer transition-all ${
                activeSystem === 'perforator'
                  ? 'bg-white border-[#2E6E62] shadow-sm ring-1 ring-[#2E6E62]'
                  : 'bg-[#EFF1EA]/60 border-[#1B2430]/15 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-serif text-base font-bold text-[#1B2430]">
                  3. Perforating (Communicating) Veins
                </div>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-[2px] ${
                  activeSystem === 'perforator' ? 'bg-[#E4ECE8] text-[#2E6E62]' : 'bg-[#E3E7DD] text-[#707E94]'
                }`}>
                  Connecting Channels
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Slender bridging veins (e.g. Cockett, Boyd, Dodd perforators) that puncture through tough muscular fascia. Their one-way valves ensure blood flows strictly from superficial to deep. When incompetent, high deep pressures erupt into surface veins.
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-[#2E6E62] font-semibold">
                <span>Normal flow: Superficial &rarr; Deep</span>
                <span>·</span>
                <span>Failure fuels ankle ulcers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Diagram & Pathophysiology Breakdown */}
          <div className="lg:col-span-6 bg-[#EFF1EA] border border-[#1B2430]/15 rounded-[4px] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B2430]/10 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1B2430]">
                Hemodynamic Mechanism in Focus
              </span>
              <span className="text-xs font-serif font-bold text-[#6B2737]">
                {activeSystem === 'superficial' && "Superficial Reflux Pathway"}
                {activeSystem === 'deep' && "Deep Muscular Pump Action"}
                {activeSystem === 'perforator' && "Perforator Valve Incompetence"}
              </span>
            </div>

            {/* Explanatory Diagram Container */}
            <div className="bg-white border border-[#1B2430]/10 rounded-[3px] p-5">
              {activeSystem === 'superficial' && (
                <div>
                  <div className="h-44 bg-[#F7F8F4] rounded-[3px] border border-dashed border-[#1B2430]/20 flex items-center justify-around p-4 relative">
                    {/* SVG Graphic for Superficial Reflux */}
                    <svg viewBox="0 0 320 140" className="w-full h-full">
                      {/* Deep Vein (Blue straight) */}
                      <rect x="230" y="10" width="30" height="120" rx="4" fill="#3B82F6" opacity="0.2" />
                      <line x1="245" y1="10" x2="245" y2="130" stroke="#2563EB" strokeWidth="4" />
                      <text x="245" y="135" textAnchor="middle" fontSize="10" fill="#1E40AF" fontWeight="bold">Deep Vein (90%)</text>

                      {/* Superficial Vein with Reflux */}
                      <path d="M 60,10 C 75,40 45,70 70,100 C 85,120 70,130 65,135" fill="none" stroke="#6B2737" strokeWidth="5" />
                      <text x="65" y="135" textAnchor="middle" fontSize="10" fill="#6B2737" fontWeight="bold">GSV Reflux</text>

                      {/* Saphenofemoral junction */}
                      <path d="M 60,20 Q 150,15 230,25" fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="3 3" />
                      <circle cx="230" cy="25" r="5" fill="#6B2737" />
                      <text x="145" y="15" textAnchor="middle" fontSize="9" fill="#475569">SFJ Incompetence</text>

                      {/* Direction arrow pooling backward */}
                      <path d="M 60,40 L 60,70" stroke="#DC2626" strokeWidth="3" markerEnd="url(#redArrow)" />
                      <text x="95" y="60" fontSize="10" fill="#991B1B" fontWeight="600">&darr; Retrograde Stasis</text>
                    </svg>
                  </div>
                  <div className="mt-4 text-xs text-[#4A5563] space-y-1.5 leading-relaxed">
                    <p>
                      <strong>Why veins become tortuous:</strong> When saphenous valves fail, the weight of the blood column generates localized hydrostatic pressure up to 90 mmHg. Vein walls stretch, elongate, and curve into twisting subcutaneous cords.
                    </p>
                  </div>
                </div>
              )}

              {activeSystem === 'deep' && (
                <div>
                  <div className="h-44 bg-[#F7F8F4] rounded-[3px] border border-dashed border-[#1B2430]/20 flex items-center justify-around p-4 relative">
                    <svg viewBox="0 0 320 140" className="w-full h-full">
                      {/* Muscle belly squeezing vein */}
                      <rect x="50" y="30" width="70" height="80" rx="8" fill="#E2E8F0" />
                      <text x="85" y="75" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">Gastrocnemius Muscle</text>

                      {/* Deep vein running through muscle */}
                      <rect x="140" y="10" width="36" height="120" rx="6" fill="#BFDBFE" />
                      <path d="M 158,125 L 158,15" stroke="#1D4ED8" strokeWidth="4" />
                      
                      {/* Upward flow arrows */}
                      <polygon points="158,20 152,32 164,32" fill="#1D4ED8" />
                      <polygon points="158,60 152,72 164,72" fill="#1D4ED8" />
                      <polygon points="158,100 152,112 164,112" fill="#1D4ED8" />

                      <text x="235" y="55" fontSize="10" fill="#1E40AF" fontWeight="bold">&uarr; Muscle Contraction</text>
                      <text x="235" y="75" fontSize="9" fill="#64748B">Generates 200+ mmHg</text>
                      <text x="235" y="90" fontSize="9" fill="#64748B">to propel blood heartward</text>
                    </svg>
                  </div>
                  <div className="mt-4 text-xs text-[#4A5563] space-y-1.5 leading-relaxed">
                    <p>
                      <strong>The Peripheral Heart:</strong> The calf muscle pump is the primary driver of lower limb circulation. Each step compresses deep intramuscular sinusoids. This is why regular walking or calf raises provide instant symptom relief.
                    </p>
                  </div>
                </div>
              )}

              {activeSystem === 'perforator' && (
                <div>
                  <div className="h-44 bg-[#F7F8F4] rounded-[3px] border border-dashed border-[#1B2430]/20 flex items-center justify-around p-4 relative">
                    <svg viewBox="0 0 320 140" className="w-full h-full">
                      {/* Fascial plane */}
                      <line x1="160" y1="10" x2="160" y2="130" stroke="#94A3B8" strokeWidth="3" strokeDasharray="4 4" />
                      <text x="160" y="136" textAnchor="middle" fontSize="9" fill="#64748B">Deep Muscular Fascia</text>

                      {/* Superficial side (Left) */}
                      <text x="80" y="25" textAnchor="middle" fontSize="10" fill="#6B2737" fontWeight="bold">Subcutaneous / Skin</text>
                      
                      {/* Deep side (Right) */}
                      <text x="240" y="25" textAnchor="middle" fontSize="10" fill="#1E40AF" fontWeight="bold">Deep Muscular Bed</text>

                      {/* Incompetent perforator vessel crossing fascia */}
                      <path d="M 80,75 L 240,75" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                      <polygon points="120,75 135,68 135,82" fill="#EA580C" />
                      <text x="120" y="60" fontSize="10" fill="#C2410C" fontWeight="bold">&larr; Outward High Pressure</text>
                    </svg>
                  </div>
                  <div className="mt-4 text-xs text-[#4A5563] space-y-1.5 leading-relaxed">
                    <p>
                      <strong>Blow-Out Syndrome:</strong> When perforator valves blow out, high pressures generated during muscle contraction escape directly into thin superficial veins near the ankle, rapidly causing lipodermatosclerosis and skin breakdown.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom summary stats */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-[3px] border border-[#1B2430]/10">
                <span className="text-[#707E94] block">Reflux Threshold</span>
                <span className="font-bold text-[#1B2430] text-sm tabular-nums">&gt;500 ms (0.5 sec)</span>
              </div>
              <div className="bg-white p-3 rounded-[3px] border border-[#1B2430]/10">
                <span className="text-[#707E94] block">Normal Resting Pressure</span>
                <span className="font-bold text-[#1B2430] text-sm tabular-nums">20 – 30 mmHg</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
