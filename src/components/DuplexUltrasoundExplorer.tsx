import React, { useState } from 'react';
import { Play, Pause, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Waves } from 'lucide-react';

export const DuplexUltrasoundExplorer: React.FC = () => {
  const [simulationState, setSimulationState] = useState<'normal' | 'reflux'>('reflux');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const triggerCalfSqueeze = () => {
    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
    }, 1800);
  };

  return (
    <section id="duplex-scan" className="py-16 bg-[#F7F8F4] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-1">
            Diagnostic Gold Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
            Bilateral Venous Duplex Ultrasound Simulation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Before any vein treatment can be recommended, a standing duplex ultrasound is performed. It maps your internal vascular anatomy, assesses deep vein patency, and quantifies valve reflux duration using Doppler audio and spectral waveforms.
          </p>
        </div>

        {/* Interactive Ultrasound Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ultrasound Screen Console */}
          <div className="lg:col-span-7 bg-[#0F172A] rounded-[4px] border border-[#334155] p-5 sm:p-6 shadow-lg text-white">
            
            {/* Monitor Header Status Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-400 font-bold">MERIDIAN DUPLEX CONSOLE // L12-3 MHz</span>
              </div>
              <div className="text-slate-400">
                <span>GAIN: 64dB</span> · <span>TIS: 0.2</span>
              </div>
            </div>

            {/* Screen View Area */}
            <div className="mt-4 relative bg-[#090D16] border border-slate-800 rounded-[3px] p-4 h-72 sm:h-80 flex flex-col justify-between overflow-hidden">
              
              {/* Sonographic Grid & Patient Metadata */}
              <div className="flex justify-between items-start text-[11px] font-mono text-slate-400 z-10">
                <div>
                  <div className="text-white font-bold">GSV THIGH SEGMENT (RIGHT)</div>
                  <div>DEPTH: 3.5 cm · PRF: 2.5 kHz</div>
                  <div>CALIBER: {simulationState === 'normal' ? '3.8 mm (Normal)' : '7.4 mm (Dilated)'}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold px-2 py-0.5 rounded-[2px] inline-block ${
                    simulationState === 'normal' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}>
                    {simulationState === 'normal' ? 'COMPETENT VALVE' : 'PATHOLOGICAL REFLUX'}
                  </div>
                  <div className="mt-1">REFLUX TIME: {simulationState === 'normal' ? '0.12s (<0.5s)' : '2.40s (>0.5s)'}</div>
                </div>
              </div>

              {/* Graphical Doppler Waveform Display */}
              <div className="my-auto relative h-36 flex items-center justify-center">
                {/* Baseline zero line */}
                <div className="absolute w-full h-[1px] bg-slate-700 top-1/2"></div>
                <span className="absolute left-2 top-[46%] text-[10px] font-mono text-slate-500">0 cm/s</span>
                <span className="absolute left-2 top-2 text-[10px] font-mono text-emerald-500">+40 cm/s (Heartward)</span>
                <span className="absolute left-2 bottom-2 text-[10px] font-mono text-rose-500">-40 cm/s (Retrograde)</span>

                {/* Animated Simulated Waveform SVG */}
                <svg viewBox="0 0 500 120" className="w-full h-full">
                  {simulationState === 'normal' ? (
                    /* Normal Flow: Rapid upward systolic spike on squeeze, immediate flatline closure on release */
                    <path
                      d={isCompressing
                        ? "M 0,60 Q 50,60 80,15 Q 110,60 140,60 L 500,60"
                        : "M 0,60 Q 60,60 100,60 L 500,60"
                      }
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  ) : (
                    /* Reflux Flow: Upward spike during squeeze, then prolonged deep retrograde wave below baseline lasting seconds */
                    <path
                      d={isCompressing
                        ? "M 0,60 Q 40,60 60,15 Q 80,60 100,60 Q 150,115 320,110 Q 440,85 500,60"
                        : "M 0,60 Q 80,60 120,60 Q 180,105 320,105 Q 430,85 500,60"
                      }
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Spectral fill shading */}
                  {simulationState === 'reflux' && (
                    <path
                      d="M 100,60 Q 180,105 320,105 Q 430,85 500,60 L 100,60 Z"
                      fill="rgba(239, 68, 68, 0.18)"
                    />
                  )}
                </svg>

                {/* Status indicator on screen */}
                <div className="absolute right-4 bottom-2 text-[10px] font-mono text-slate-400">
                  {isCompressing ? '>>> CALF SQUEEZE ACTIVE <<<' : 'RELEASE PHASE (VALVE CHECK)'}
                </div>
              </div>

              {/* Bottom Sonographer Color Doppler Legend */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-blue-500 inline-block"></span>
                    <span className="text-slate-300">Blue = Heartward</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-red-500 inline-block"></span>
                    <span className="text-slate-300">Red = Retrograde Reflux</span>
                  </span>
                </div>
                <span>BART RULE (Blue Away, Red Toward)</span>
              </div>
            </div>

            {/* Console Control Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimulationState('reflux')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-all cursor-pointer ${
                    simulationState === 'reflux'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Simulate Refluxing Vein
                </button>
                <button
                  onClick={() => setSimulationState('normal')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-all cursor-pointer ${
                    simulationState === 'normal'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Simulate Normal Vein
                </button>
              </div>

              <button
                onClick={triggerCalfSqueeze}
                disabled={isCompressing}
                className="px-3.5 py-1.5 text-xs font-mono bg-[#E4ECE8] text-[#1B2430] hover:bg-white rounded-[2px] font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Waves className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>{isCompressing ? 'Testing...' : 'Trigger Calf Squeeze & Release'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clinical Duplex Criteria Explanations */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white border border-[#1B2430]/15 rounded-[3px] p-5 shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#1B2430] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E6E62]" />
                <span>The Diagnostic &gt;0.5s Rule</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Healthy venous valves snap shut in under 0.2 seconds. Under international vascular guidelines (Society for Vascular Surgery / American Venous Forum), retrograde reflux exceeding <strong>500 milliseconds (0.5 seconds)</strong> in superficial veins proves valvular incompetence and qualifies for medically covered treatment.
              </p>
            </div>

            <div className="bg-white border border-[#1B2430]/15 rounded-[3px] p-5 shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#1B2430] mb-2">
                Key Anatomical Structures Mapped
              </h3>
              <ul className="space-y-2 text-xs text-[#4A5563]">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-[#6B2737]">&bull;</span>
                  <span><strong>Saphenofemoral Junction (SFJ):</strong> Where the Great Saphenous Vein meets the deep Common Femoral Vein in the groin. The primary failure point in 70% of cases.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-[#6B2737]">&bull;</span>
                  <span><strong>Saphenopopliteal Junction (SPJ):</strong> Behind the knee, where the Small Saphenous Vein drains into the deep Popliteal Vein.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-[#6B2737]">&bull;</span>
                  <span><strong>Perforating Veins:</strong> Assessed for outward high-pressure jets greater than 0.35s in diameter &gt;3.5mm.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-[#6B2737]">&bull;</span>
                  <span><strong>Deep Vein Compressibility:</strong> Proves deep veins are open and free of life-threatening DVT blood clots.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#E4ECE8] border border-[#2E6E62]/30 rounded-[3px] p-4 text-xs text-[#1B2430]">
              <strong className="text-[#2E6E62] block mb-1">Standing Position Requirement:</strong>
              A venous insufficiency ultrasound must be conducted while standing or in a steep reverse Trendelenburg tilt. Laying flat unloads gravity and frequently leads to false-negative results!
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
