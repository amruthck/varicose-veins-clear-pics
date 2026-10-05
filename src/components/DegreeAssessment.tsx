import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS, calculateAssessmentResult } from '../data/assessmentQuestions';
import { AssessmentResult } from '../types';
import { MediaUploader, UploadedMediaItem } from './MediaUploader';
import { generatePdfReport } from '../utils/generatePdfReport';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  FileDown,
  Calendar,
  Sparkles,
  Info,
  ShieldCheck,
  Camera,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DegreeAssessmentProps {
  onOpenBookingWithScore: (score: number, ceapStage: string, mediaCount: number) => void;
  onOpenAssistantWithContext: (contextPrompt: string) => void;
  mediaItems: UploadedMediaItem[];
  onAddMedia: (item: UploadedMediaItem) => void;
  onRemoveMedia: (id: string) => void;
}

export const DegreeAssessment: React.FC<DegreeAssessmentProps> = ({
  onOpenBookingWithScore,
  onOpenAssistantWithContext,
  mediaItems,
  onAddMedia,
  onRemoveMedia,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [patientName, setPatientName] = useState<string>('');
  const [showMediaUploader, setShowMediaUploader] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (score: number) => {
    const updatedAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(updatedAnswers);

    // Auto-advance if not on last question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final result
      const calculated = calculateAssessmentResult(updatedAnswers);
      setResult(calculated);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setShowMediaUploader(false);
  };

  const handleDownloadPdf = () => {
    if (!result) return;
    setIsPdfGenerating(true);
    try {
      const imagesCount = mediaItems.filter(m => m.type === 'image').length;
      const videosCount = mediaItems.filter(m => m.type === 'video').length;

      generatePdfReport({
        result,
        answers,
        patientName: patientName.trim() || 'Patient Self-Evaluation',
        imageCount: imagesCount,
        videoCount: videosCount,
      });
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <section id="degree-assessment" className="py-16 bg-[#EFF1EA] border-b border-[#1B2430]/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#6B2737] bg-[#F7ECEF] px-3 py-1 rounded-[2px] mb-2">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Interactive Clinical Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1B2430]">
            Vascular Degree &amp; CEAP Stage Assessment
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-[#4A5563] leading-relaxed">
            Answer 8 clinical screening questions to evaluate your venous hypertension level, determine your estimated CEAP degree, and attach photo/video context for your clinical evaluation.
          </p>

          {/* Quick jump banner to Media Upload section */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white border border-[#1B2430]/15 rounded-full px-4 py-1.5 text-xs text-[#1B2430] shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#2E6E62]" />
            <span>Want to upload photos or videos first?</span>
            <a href="#media-upload" className="font-bold text-[#2E6E62] hover:underline flex items-center gap-1">
              <span>Go to Media Uploader ({mediaItems.length} attached)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Assessment Card Container */}
        <div className="bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[4px] shadow-md overflow-hidden">
          
          {/* Header Progress Bar */}
          <div className="bg-[#E3E7DD] p-4 border-b border-[#1B2430]/10">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1B2430] mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E6E62]" />
                <span>Meridian Clinical Screener</span>
              </span>
              <span className="font-mono text-[#707E94]">
                {result ? "Assessment Complete" : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-[#CBD5E1] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2E6E62] h-full transition-all duration-300"
                style={{ width: `${result ? 100 : progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* ACTIVE QUESTION VIEW */}
          {!result ? (
            <div className="p-6 sm:p-8">
              
              {/* Question Title & Description */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#6B2737] tracking-wide uppercase block mb-1">
                  Item 0{currentQ.id}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B2430] leading-snug">
                  {currentQ.desc}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#707E94]">
                  <Info className="w-3.5 h-3.5 text-[#2E6E62] shrink-0" />
                  <span>Clinical significance: {currentQ.clinicalSignificance}</span>
                </div>
              </div>

              {/* Options Grid */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.score)}
                      className={`w-full text-left p-4 rounded-[3px] border transition-all flex items-start justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-[#E4ECE8] border-[#2E6E62] shadow-xs'
                          : 'bg-white border-[#1B2430]/15 hover:bg-[#EFF1EA]/60 hover:border-[#1B2430]/30'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="text-sm sm:text-base font-semibold text-[#1B2430] group-hover:text-[#2E6E62] transition-colors">
                          {opt.label}
                        </div>
                        {opt.description && (
                          <div className="text-xs text-[#4A5563] mt-1 leading-relaxed">
                            {opt.description}
                          </div>
                        )}
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-[#2E6E62] border-[#2E6E62] text-white'
                          : 'border-[#94A3B8] bg-white group-hover:border-[#2E6E62]'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="mt-8 pt-4 border-t border-[#1B2430]/10 flex items-center justify-between">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-3.5 py-2 text-xs font-semibold text-[#1B2430] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E3E7DD] rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {answers[currentQ.id] !== undefined && currentQuestionIndex < totalQuestions - 1 && (
                  <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2E6E62] hover:bg-[#20504A] rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* COMPLETED RESULT REPORT VIEW */
            <div className="p-6 sm:p-8 animate-in fade-in duration-200">
              
              {/* Result Summary Banner */}
              <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-6 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1B2430]/10">
                  <div>
                    <div className="text-xs font-semibold uppercase text-[#707E94] tracking-wide">
                      Clinical Triage Evaluation
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2430]">
                        Degree: {result.severityLevel}
                      </span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-[2px] text-white"
                        style={{ backgroundColor: result.severityColor }}
                      >
                        CEAP {result.ceapStage}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-serif font-medium text-[#4A5563] mt-0.5">
                      {result.ceapTitle}
                    </div>
                  </div>

                  {/* Score Gauge */}
                  <div className="text-left md:text-right bg-[#EFF1EA] p-3 rounded-[3px] border border-[#1B2430]/10">
                    <span className="text-[11px] text-[#707E94] block uppercase">Reflux Risk Score</span>
                    <span className="text-2xl font-serif font-bold text-[#1B2430] tabular-nums">
                      {result.totalScore} <span className="text-sm font-sans font-normal text-[#707E94]">/ {result.maxScore}</span>
                    </span>
                    <span className="text-[11px] text-[#2E6E62] font-semibold block">
                      ({result.percentage}% severity index)
                    </span>
                  </div>
                </div>

                {/* Clinical Interpretation */}
                <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#4A5563] leading-relaxed">
                  <p>
                    <strong className="text-[#1B2430]">Summary: </strong>
                    {result.summary}
                  </p>
                  <p>
                    <strong className="text-[#1B2430]">Hemodynamic Pathology: </strong>
                    {result.pathologyDetails}
                  </p>
                </div>
              </div>

              {/* Action Recommendations Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                
                {/* Specialist Recommendation */}
                <div className="bg-white border border-[#1B2430]/15 rounded-[3px] p-5 shadow-xs">
                  <span className="text-xs font-semibold uppercase text-[#2E6E62] block mb-1">
                    Recommended Specialist
                  </span>
                  <div className="font-serif text-base font-bold text-[#1B2430] mb-2">
                    {result.suggestedSpecialist}
                  </div>
                  <p className="text-xs text-[#4A5563] leading-relaxed mb-3">
                    {result.recommendedAction}
                  </p>
                  <div className="pt-2 border-t border-[#1B2430]/10 text-[11px] text-[#707E94]">
                    <strong>Indicated Diagnostic:</strong> {result.diagnosticRecommendation}
                  </div>
                </div>

                {/* Conservative Lifestyle Checklist */}
                <div className="bg-white border border-[#1B2430]/15 rounded-[3px] p-5 shadow-xs">
                  <span className="text-xs font-semibold uppercase text-[#6B2737] block mb-2">
                    Conservative Self-Care Plan
                  </span>
                  <ul className="space-y-2 text-xs text-[#4A5563]">
                    {result.lifestyleMeasures.map((measure, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6E62] shrink-0 mt-0.5" />
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Patient Name & Visual Evidence Accordion Panel */}
              <div className="mb-6 space-y-4">
                
                <div className="bg-white border border-[#1B2430]/15 rounded-[3px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                      Patient Name for Clinical Report &amp; PDF:
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Jane Doe (optional for report personalization)"
                      className="w-full bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] px-3 py-1.5 text-xs text-[#1B2430] focus:outline-none focus:border-[#2E6E62]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMediaUploader(!showMediaUploader)}
                    className="self-end sm:self-center px-3.5 py-2 text-xs font-semibold text-[#2E6E62] bg-[#E4ECE8] hover:bg-[#2E6E62] hover:text-white border border-[#2E6E62]/30 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>
                      {showMediaUploader ? 'Hide Media Attachments' : `Attach / Review Photos & Videos (${mediaItems.length})`}
                    </span>
                    {showMediaUploader ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                  </button>
                </div>

                {/* Media Uploader Section */}
                {showMediaUploader && (
                  <div className="animate-in fade-in duration-200">
                    <MediaUploader
                      mediaItems={mediaItems}
                      onAddMedia={onAddMedia}
                      onRemoveMedia={onRemoveMedia}
                    />
                  </div>
                )}

              </div>

              {/* Result Action Buttons: PDF Generation, Appointment, AI Assistant */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1B2430]/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-2 text-xs font-semibold text-[#1B2430] bg-white border border-[#1B2430]/20 rounded-[3px] hover:bg-[#E3E7DD] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Screener</span>
                  </button>

                  {/* Client-Side Downloadable PDF Report */}
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isPdfGenerating}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-[#1B2430] hover:bg-[#334155] rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Download client-side PDF clinical report with scores and answers"
                  >
                    <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isPdfGenerating ? 'Generating PDF...' : 'Download Clinical PDF'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAssistantWithContext(
                      `I completed the Meridian Vascular degree assessment with a score of ${result.totalScore}/24 (estimated CEAP stage ${result.ceapStage}, ${result.severityLevel} severity) and have ${mediaItems.length} photos/videos attached. What specific questions should I ask during my ultrasound consultation?`
                    )}
                    className="px-4 py-2 text-xs font-semibold text-[#2E6E62] bg-[#E4ECE8] border border-[#2E6E62]/30 rounded-[3px] hover:bg-[#2E6E62] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Discuss with AI Assistant</span>
                  </button>

                  <button
                    onClick={() => onOpenBookingWithScore(result.totalScore, result.ceapStage, mediaItems.length)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#6B2737] hover:bg-[#4E1C29] rounded-[3px] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment with this Result</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
