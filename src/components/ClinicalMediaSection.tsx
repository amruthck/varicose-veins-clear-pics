import React from 'react';
import { MediaUploader, UploadedMediaItem } from './MediaUploader';
import { Camera, Video, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

interface ClinicalMediaSectionProps {
  mediaItems: UploadedMediaItem[];
  onAddMedia: (item: UploadedMediaItem) => void;
  onRemoveMedia: (id: string) => void;
  onNavigateToAssessment: () => void;
  onOpenBooking: () => void;
}

export const ClinicalMediaSection: React.FC<ClinicalMediaSectionProps> = ({
  mediaItems,
  onAddMedia,
  onRemoveMedia,
  onNavigateToAssessment,
  onOpenBooking,
}) => {
  const images = mediaItems.filter(m => m.type === 'image');
  const videos = mediaItems.filter(m => m.type === 'video');

  return (
    <section id="media-upload" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-4 border-b border-[#1B2430]/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#6B2737] bg-[#F7ECEF] px-3 py-1 rounded-[2px] mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Tele-Triage &amp; Clinical Context</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
              Upload Photos &amp; Videos of Your Leg Veins
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4A5563] max-w-2xl leading-relaxed">
              Attach multiple photos of your visible veins, swelling, or skin pigmentation, along with short standing or walking video clips. These are securely compiled into your clinical summary report and linked to your appointment chart.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#707E94] bg-[#E3E7DD] px-3 py-1.5 rounded-[3px]">
              Attached: <strong className="text-[#1B2430]">{images.length} Photos</strong>, <strong className="text-[#1B2430]">{videos.length} Videos</strong>
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Media Uploader + Photo Guidance Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Uploader */}
          <div className="lg:col-span-8">
            <MediaUploader
              mediaItems={mediaItems}
              onAddMedia={onAddMedia}
              onRemoveMedia={onRemoveMedia}
            />

            {/* Quick Actions with Uploaded Media */}
            {mediaItems.length > 0 && (
              <div className="mt-4 bg-[#E4ECE8] border border-[#2E6E62]/30 p-4 rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-[#1B2430]">
                  <strong className="text-[#2E6E62] block">Media Ready:</strong>
                  Your {mediaItems.length} uploaded file(s) are stored and will automatically attach to your Clinical Assessment PDF and consultation booking.
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={onNavigateToAssessment}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#1B2430] bg-white border border-[#1B2430]/20 rounded-[3px] hover:bg-[#EFF1EA] transition-colors cursor-pointer"
                  >
                    Go to Questionnaire
                  </button>
                  <button
                    onClick={onOpenBooking}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#6B2737] hover:bg-[#4E1C29] rounded-[3px] transition-colors cursor-pointer"
                  >
                    Book with this Media
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Photography Best Practice Guide */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-5 shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#1B2430] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E6E62]" />
                <span>How to Capture Informative Vein Photos</span>
              </h3>

              <div className="space-y-3 text-xs text-[#4A5563]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    1
                  </div>
                  <div>
                    <strong className="text-[#1B2430] block">Stand Upright (Do not lay down):</strong>
                    Veins collapse when legs are elevated. Standing allows gravity to fill diseased veins to their true visible volume.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    2
                  </div>
                  <div>
                    <strong className="text-[#1B2430] block">Use Bright, Indirect Light:</strong>
                    Natural daylight or direct side lighting casts soft shadows that highlight raised vein cords and contours.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    3
                  </div>
                  <div>
                    <strong className="text-[#1B2430] block">3 Recommended Photo Angles:</strong>
                    <span>(A) Front view of thighs &amp; shins, (B) Posterior calf view from behind, and (C) Close-up of inner ankle gaiter zone.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E4ECE8] text-[#2E6E62] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    4
                  </div>
                  <div>
                    <strong className="text-[#1B2430] block">Optional 5-Second Video:</strong>
                    Record a slow 360-degree rotation of your lower legs while standing on flat ground.
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy notice card */}
            <div className="bg-[#F7F8F4] border border-[#1B2430]/10 rounded-[4px] p-4 text-xs text-[#707E94] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#1B2430] font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>Patient Privacy Protection</span>
              </div>
              <p className="leading-relaxed">
                All photos and videos are stored in your private browser session. When submitting an appointment or downloading your PDF report, they remain encrypted and accessible only to Meridian clinical staff.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
