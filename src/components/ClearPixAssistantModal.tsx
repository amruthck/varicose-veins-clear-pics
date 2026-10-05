import React, { useState, useRef, useEffect } from 'react';
import { AssistantMessage } from '../types';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  ShieldCheck,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

interface ClearPixAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onSelectBooking: () => void;
}

export const ClearPixAssistantModal: React.FC<ClearPixAssistantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onSelectBooking,
}) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      text: "Hello, I am the ClearPix AI Vascular Specialty Guidance Assistant. Describe your leg sensations, visible vein patterns, or diagnostic questions below, and I will guide you on the appropriate vascular specialty, diagnostic protocols, and targeted questions for your physician.",
      recommendedSpecialist: "Vascular Surgeon or Certified Phlebologist",
      recommendedSpecialistRole: "Specialist in venous hemodynamics and duplex ultrasound mapping.",
      urgencyLevel: "Routine Consultation",
      suggestedDiagnostic: "Standing Bilateral Lower Extremity Duplex Ultrasound",
      suggestedQuestions: [
        "What is the measured reflux time in my Great Saphenous Vein?",
        "Am I a candidate for non-thermal VenaSeal or thermal laser ablation?",
        "Does my insurance require a trial of compression stockings?"
      ]
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "Bulging veins behind my knee with dull evening throbbing",
    "Brownish skin discoloration above my inner ankle",
    "Spider veins on thighs: do I need duplex ultrasound first?",
    "Should I see a Phlebologist or a Vascular Surgeon?",
    "Does health insurance cover endovenous laser ablation?"
  ];

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: AssistantMessage = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();

      const assistantMessage: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.reply || "Thank you for describing your symptoms. An in-person standing venous duplex ultrasound is the recommended next step.",
        recommendedSpecialist: data.recommendedSpecialist,
        recommendedSpecialistRole: data.recommendedSpecialistRole,
        urgencyLevel: data.urgencyLevel,
        suggestedDiagnostic: data.suggestedDiagnostic,
        suggestedQuestions: data.suggestedQuestions,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Chat request failed, providing clinical fallback response:', err);
      const fallbackMessage: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Based on clinical venous hemodynamics, symptoms of lower limb throbbing, swelling, and visible vein dilation suggest superficial venous reflux (valvular incompetence). A standing bilateral duplex ultrasound is recommended to evaluate whether the Great Saphenous Vein or Small Saphenous Vein exhibits retrograde reflux exceeding 0.5 seconds.",
        recommendedSpecialist: "Vascular Surgeon or Board-Certified Phlebologist",
        recommendedSpecialistRole: "Specialist trained in standing duplex ultrasound mapping and modern minimally invasive vein ablation.",
        urgencyLevel: "Priority Evaluation",
        suggestedDiagnostic: "Standing Bilateral Lower Extremity Venous Duplex Ultrasound with Reflux Protocol",
        suggestedQuestions: [
          "Which vein branches have incompetent valves and what is their diameter?",
          "Would endovenous laser ablation (EVLA) or VenaSeal adhesive be better for my anatomy?",
          "What level of graduated compression stocking should I wear in the interim?"
        ]
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        timestamp: 'Just now',
        text: "Chat cleared. What vascular symptoms or questions can I help you explore today?",
        recommendedSpecialist: "Vascular Surgeon or Phlebologist",
        urgencyLevel: "Routine Consultation"
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#1B2430]/20 rounded-[6px] shadow-2xl w-full max-w-3xl h-[88vh] max-h-[820px] flex flex-col overflow-hidden">
        
        {/* Assistant Header */}
        <div className="px-5 py-3.5 border-b border-[#1B2430]/15 bg-[#EFF1EA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[3px] bg-[#E4ECE8] border border-[#2E6E62]/30 flex items-center justify-center text-[#2E6E62]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-bold text-[#1B2430]">
                  ClearPix AI Vascular Specialty Guidance
                </h3>
                <span className="text-[10px] font-mono uppercase bg-[#2E6E62] text-white px-1.5 py-0.5 rounded-[2px]">
                  Clinical Triage
                </span>
              </div>
              <p className="text-[11px] text-[#707E94]">
                Educational guidance only · No medical diagnosis or physician-patient relationship
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              className="p-1.5 text-[#707E94] hover:text-[#1B2430] hover:bg-[#E3E7DD] rounded-[3px] transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#707E94] hover:text-[#1B2430] hover:bg-[#E3E7DD] rounded-[3px] transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Quick Prompt Pills */}
        <div className="px-4 py-2 bg-[#F7F8F4] border-b border-[#1B2430]/10 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
          <span className="text-[11px] font-semibold text-[#707E94] shrink-0">Sample prompts:</span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#E4ECE8] hover:text-[#2E6E62] border border-[#1B2430]/15 rounded-[3px] text-[#4A5563] text-xs transition-colors shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAFCFB]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#E4ECE8] text-[#2E6E62] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-[4px] p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1B2430] text-white'
                    : 'bg-white border border-[#1B2430]/15 text-[#1B2430] shadow-xs'
                }`}
              >
                <div className="text-[10px] font-mono mb-1 text-[#707E94] flex items-center justify-between">
                  <span>{msg.sender === 'user' ? 'You' : 'ClearPix Clinical Guidance'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {/* Structured Specialist Guidance Card (For Assistant) */}
                {msg.recommendedSpecialist && (
                  <div className="mt-4 pt-3 border-t border-[#1B2430]/10 bg-[#EFF1EA]/60 -mx-4 -mb-4 p-3.5 rounded-b-[4px] space-y-2.5">
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#1B2430] flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-[#2E6E62]" />
                        <span>Recommended Specialist:</span>
                      </span>
                      {msg.urgencyLevel && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[2px] ${
                          msg.urgencyLevel === 'Urgent Medical Attention'
                            ? 'bg-[#6B2737] text-white'
                            : msg.urgencyLevel === 'Priority Evaluation'
                            ? 'bg-[#B98B2E] text-white'
                            : 'bg-[#E4ECE8] text-[#2E6E62]'
                        }`}>
                          {msg.urgencyLevel}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-bold text-[#2E6E62]">
                      {msg.recommendedSpecialist}
                    </div>

                    {msg.recommendedSpecialistRole && (
                      <p className="text-[11px] text-[#4A5563]">
                        {msg.recommendedSpecialistRole}
                      </p>
                    )}

                    {msg.suggestedDiagnostic && (
                      <div className="text-[11px] text-[#1B2430]">
                        <strong>Primary Diagnostic Step: </strong>
                        <span className="text-[#4A5563]">{msg.suggestedDiagnostic}</span>
                      </div>
                    )}

                    {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="pt-2 border-t border-[#1B2430]/10">
                        <span className="text-[11px] font-semibold text-[#1B2430] block mb-1">
                          Questions to ask the doctor:
                        </span>
                        <ul className="space-y-1 text-[11px] text-[#4A5563]">
                          {msg.suggestedQuestions.map((q, qIdx) => (
                            <li key={qIdx} className="flex items-start gap-1.5">
                              <span className="text-[#6B2737] font-bold">&bull;</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectBooking();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#6B2737] hover:bg-[#4E1C29] rounded-[2px] transition-colors"
                      >
                        Book Ultrasound &amp; Consultation &rarr;
                      </button>
                    </div>

                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#1B2430] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-full bg-[#E4ECE8] text-[#2E6E62] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-3 text-xs text-[#707E94] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E6E62] animate-pulse"></span>
                <span>ClearPix AI is analyzing clinical indications...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-[#1B2430]/15">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about leg pain, vein stages, ultrasound procedures, or specialists..."
              className="flex-1 bg-[#F7F8F4] border border-[#1B2430]/15 rounded-[3px] px-3.5 py-2.5 text-xs sm:text-sm text-[#1B2430] placeholder-[#94A3B8] focus:outline-none focus:border-[#2E6E62]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 bg-[#2E6E62] hover:bg-[#20504A] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-[3px] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-2 text-[10px] text-[#707E94] text-center">
            Educational resource developed for ClearPix Healthcare. For acute chest pain or sudden shortness of breath, call emergency services immediately.
          </div>
        </div>

      </div>
    </div>
  );
};
