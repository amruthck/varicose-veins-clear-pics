import React, { useState } from 'react';
import { HeartHandshake, Calendar, CheckCircle2, Award, Sparkles, Download, Users, ArrowRight } from 'lucide-react';

interface CampaignSectionProps {
  onOpenBooking: () => void;
}

export const CampaignSection: React.FC<CampaignSectionProps> = ({ onOpenBooking }) => {
  const [pledgeName, setPledgeName] = useState('');
  const [hasPledged, setHasPledged] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(3842);

  const handleTakePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;
    setHasPledged(true);
    setPledgeCount(prev => prev + 1);
  };

  return (
    <section id="campaign" className="py-16 bg-gradient-to-b from-[#EFF1EA] to-[#E3E7DD]/70 border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Campaign Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#2E6E62] bg-[#E4ECE8] px-3 py-1 rounded-[2px] mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community Health Initiative 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1B2430]">
            The Healthy Legs Awareness Campaign
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A5563] leading-relaxed">
            Over 30 million people suffer from untreated venous insufficiency, often assuming painful leg heaviness and swollen ankles are unavoidable signs of aging. Meridian Vascular is partnering with community healthcare providers to offer free screening events, education, and early intervention.
          </p>
        </div>

        {/* 3 Campaign Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Pillar 1: Free Screening Ultrasound */}
          <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-[#707E94] uppercase tracking-wide">
                  Community Pillar 01
                </span>
                <span className="text-xs font-bold text-[#2E6E62] bg-[#E4ECE8] px-2 py-0.5 rounded-[2px]">
                  Free Screening
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B2430] mb-2">
                Saturday 15-Minute Duplex Screenings
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Complimentary point-of-care duplex ultrasound screenings at all Meridian campuses every Saturday morning. Fast evaluation of saphenous valve competence with instant physician review.
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-[#1B2430]/10 flex items-center justify-between">
              <span className="text-xs text-[#707E94]">Every Saturday 9am–1pm</span>
              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-[#6B2737] hover:underline"
              >
                Reserve Slot &rarr;
              </button>
            </div>
          </div>

          {/* Pillar 2: Compression Fitting Clinic */}
          <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-[#707E94] uppercase tracking-wide">
                  Community Pillar 02
                </span>
                <span className="text-xs font-bold text-[#B98B2E] bg-[#F6F1E3] px-2 py-0.5 rounded-[2px]">
                  Clinical Fit
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B2430] mb-2">
                Certified Stocking Sizing Workshop
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Improperly fitted stockings can bind and worsen swelling. Our certified fitters measure ankle and calf circumference to pair you with the exact gradient compression class (15-20 vs 20-30 mmHg).
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-[#1B2430]/10 flex items-center justify-between">
              <span className="text-xs text-[#707E94]">Walk-ins Welcome</span>
              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-[#6B2737] hover:underline"
              >
                Learn More &rarr;
              </button>
            </div>
          </div>

          {/* Pillar 3: Educational Seminar */}
          <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-[#707E94] uppercase tracking-wide">
                  Community Pillar 03
                </span>
                <span className="text-xs font-bold text-[#6B2737] bg-[#F7ECEF] px-2 py-0.5 rounded-[2px]">
                  Live Webinar
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B2430] mb-2">
                Vascular Surgeon Q&amp;A Sessions
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                Monthly interactive virtual lectures hosted by our fellowship-trained vascular surgeons, exploring the latest non-thermal VenaSeal adhesives, laser advancements, and DVT risk prevention.
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-[#1B2430]/10 flex items-center justify-between">
              <span className="text-xs text-[#707E94]">Online via Zoom</span>
              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-[#6B2737] hover:underline"
              >
                Register Free &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* Interactive 30-Day Healthy Legs Pledge Box */}
        <div className="bg-[#1B2430] text-white rounded-[4px] p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Users className="w-4 h-4" />
                <span>{pledgeCount.toLocaleString()} Community Members Pledged</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Take the 30-Day Healthy Circulation Pledge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Commit to 3 simple evidence-based venous health habits for the next 30 days: (1) 20 calf-pumps every 60 minutes of sitting, (2) 15 minutes of leg elevation above heart level each evening, and (3) 30 minutes of aerobic walking 4 times weekly.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-5 rounded-[3px]">
              {!hasPledged ? (
                <form onSubmit={handleTakePledge} className="space-y-3">
                  <label className="block text-xs font-semibold text-white">
                    Enter your name to join the community pledge:
                  </label>
                  <input
                    type="text"
                    required
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    placeholder="Your Name (e.g. Sarah Miller)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-[3px] p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#2E6E62] hover:bg-[#20504A] text-white rounded-[3px] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Commit to Healthy Circulation</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-2 space-y-2 animate-in fade-in duration-200">
                  <div className="w-9 h-9 rounded-full bg-emerald-950 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">
                    Pledge Confirmed, {pledgeName}!
                  </h4>
                  <p className="text-xs text-slate-300">
                    You are participant #{pledgeCount.toLocaleString()} in the 2026 Meridian Vascular Healthy Circulation Initiative.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
