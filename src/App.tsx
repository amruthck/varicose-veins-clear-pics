/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DidYouKnow } from './components/DidYouKnow';
import { Overview } from './components/Overview';
import { Causes } from './components/Causes';
import { Symptoms } from './components/Symptoms';
import { LegPainDifferential } from './components/LegPainDifferential';
import { ProgressionCEAP } from './components/ProgressionCEAP';
import { DegreeAssessment } from './components/DegreeAssessment';
import { ClinicalMediaSection } from './components/ClinicalMediaSection';
import { DuplexUltrasoundExplorer } from './components/DuplexUltrasoundExplorer';
import { DoctorDirectory } from './components/DoctorDirectory';
import { DoctorVisitGuide } from './components/DoctorVisitGuide';
import { TreatmentModalities } from './components/TreatmentModalities';
import { CampaignSection } from './components/CampaignSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ClearPixAssistantModal } from './components/ClearPixAssistantModal';
import { AppointmentModal } from './components/AppointmentModal';
import { UploadedMediaItem } from './components/MediaUploader';
import { DoctorProfile } from './data/doctorsData';
import { Sparkles, Camera } from 'lucide-react';

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [bookingScore, setBookingScore] = useState<number | null>(null);
  const [bookingStage, setBookingStage] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  
  // Shared patient media uploads (Photos & Videos)
  const [mediaItems, setMediaItems] = useState<UploadedMediaItem[]>([]);

  const handleAddMedia = (item: UploadedMediaItem) => {
    setMediaItems(prev => [...prev, item]);
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
  };

  const handleNavigateToDegree = () => {
    const el = document.getElementById('degree-assessment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToMediaUpload = () => {
    const el = document.getElementById('media-upload');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingWithScore = (score: number, ceapStage: string, mediaCount: number) => {
    setBookingScore(score);
    setBookingStage(ceapStage);
    setSelectedDoctor(null);
    setIsBookingOpen(true);
  };

  const handleSelectDoctorForBooking = (doc: DoctorProfile) => {
    setSelectedDoctor(doc);
    setIsBookingOpen(true);
  };

  const handleOpenAssistantWithContext = (prompt: string) => {
    setAssistantPrompt(prompt);
    setIsAssistantOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-[#EFF1EA] text-[#1B2430] flex flex-col font-sans selection:bg-[#2E6E62] selection:text-white">
      
      {/* Primary Sticky Header */}
      <Header
        onOpenAssistant={() => {
          setAssistantPrompt('');
          setIsAssistantOpen(true);
        }}
        onOpenBooking={() => {
          setSelectedDoctor(null);
          setIsBookingOpen(true);
        }}
        onNavigateToDegree={handleNavigateToDegree}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onStartAssessment={handleNavigateToDegree}
          onOpenAssistant={() => {
            setAssistantPrompt('');
            setIsAssistantOpen(true);
          }}
        />

        <DidYouKnow />

        <Overview />

        <Causes />

        <Symptoms />

        <LegPainDifferential />

        <ProgressionCEAP />

        {/* Dedicated Clinical Media Upload Section */}
        <ClinicalMediaSection
          mediaItems={mediaItems}
          onAddMedia={handleAddMedia}
          onRemoveMedia={handleRemoveMedia}
          onNavigateToAssessment={handleNavigateToDegree}
          onOpenBooking={() => {
            setSelectedDoctor(null);
            setIsBookingOpen(true);
          }}
        />

        {/* Degree Assessment Screener */}
        <DegreeAssessment
          onOpenBookingWithScore={handleOpenBookingWithScore}
          onOpenAssistantWithContext={handleOpenAssistantWithContext}
          mediaItems={mediaItems}
          onAddMedia={handleAddMedia}
          onRemoveMedia={handleRemoveMedia}
        />

        <DuplexUltrasoundExplorer />

        <DoctorDirectory
          onSelectDoctor={handleSelectDoctorForBooking}
        />

        <DoctorVisitGuide />

        <TreatmentModalities />

        <CampaignSection
          onOpenBooking={() => {
            setSelectedDoctor(null);
            setIsBookingOpen(true);
          }}
        />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAssistant={() => {
          setAssistantPrompt('');
          setIsAssistantOpen(true);
        }}
        onOpenBooking={() => {
          setSelectedDoctor(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Floating Action Badges: Media Uploader & ClearPix AI Assistant */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        <a
          href="#media-upload"
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#EFF1EA] text-[#1B2430] border border-[#1B2430]/15 text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
          title="Upload or review leg photos & videos"
        >
          <Camera className="w-3.5 h-3.5 text-[#6B2737]" />
          <span>Upload Media ({mediaItems.length})</span>
        </a>

        <button
          onClick={() => {
            setAssistantPrompt('');
            setIsAssistantOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2E6E62] hover:bg-[#20504A] text-white text-xs font-semibold rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          aria-label="Ask ClearPix AI Vascular Specialty Guidance"
        >
          <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
          <span>Ask ClearPix AI Guide</span>
        </button>
      </div>

      {/* ClearPix AI Assistant Drawer/Modal */}
      <ClearPixAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        initialPrompt={assistantPrompt}
        onSelectBooking={() => {
          setIsBookingOpen(true);
        }}
      />

      {/* Appointment Consultation Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefilledScore={bookingScore}
        prefilledStage={bookingStage}
        preselectedDoctor={selectedDoctor}
        attachedMediaCount={mediaItems.length}
      />

    </div>
  );
}
