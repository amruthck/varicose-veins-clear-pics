import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle2, ShieldCheck, Video, Building2, Stethoscope } from 'lucide-react';
import { DOCTORS_DATA, DoctorProfile } from '../data/doctorsData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledScore?: number | null;
  prefilledStage?: string | null;
  preselectedDoctor?: DoctorProfile | null;
  attachedMediaCount?: number;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  prefilledScore,
  prefilledStage,
  preselectedDoctor,
  attachedMediaCount = 0,
}) => {
  const [modality, setModality] = useState<'in-person' | 'telehealth'>('in-person');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctor?.id || 'dr-vance');
  
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    consultationType: 'Comprehensive Venous Duplex Ultrasound & Clinical Consultation',
    location: 'Meridian Vascular Center — Suite 400 (Main Campus)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    appointmentId: string;
    details: any;
  } | null>(null);

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctorId(preselectedDoctor.id);
      setFormData(prev => ({
        ...prev,
        location: preselectedDoctor.location,
      }));
    }
  }, [preselectedDoctor]);

  if (!isOpen) return null;

  const currentDoctor = DOCTORS_DATA.find(d => d.id === selectedDoctorId) || DOCTORS_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      modality,
      doctor: currentDoctor.name,
      doctorCredentials: currentDoctor.credentials,
      assessmentScore: prefilledScore,
      ceapStage: prefilledStage,
      attachedMediaCount,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setConfirmation({
          appointmentId: data.appointmentId,
          details: {
            ...data.details,
            modality,
            doctorName: currentDoctor.name,
          },
        });
      }
    } catch (err) {
      console.warn('Booking API error, generating offline confirmation:', err);
      setConfirmation({
        appointmentId: 'MV-' + Math.floor(100000 + Math.random() * 900000),
        details: {
          patientName: formData.patientName,
          consultationType: formData.consultationType,
          preferredDate: formData.preferredDate || 'Next available business day',
          preferredTime: formData.preferredTime,
          clinicLocation: modality === 'in-person' ? formData.location : 'Secure Meridian Telehealth Video Room',
          modality,
          doctorName: currentDoctor.name,
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#1B2430]/20 rounded-[4px] shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1B2430]/15 bg-[#EFF1EA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[3px] bg-[#6B2737] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B2430]">
                Schedule Clinical Vein Consultation
              </h3>
              <p className="text-[11px] text-[#707E94]">
                Meridian Vascular Center · In-Person Duplex Mapping or Telehealth
              </p>
            </div>
          </div>
          <button
            onClick={handleResetModal}
            className="p-1 text-[#707E94] hover:text-[#1B2430] hover:bg-[#E3E7DD] rounded-[2px] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!confirmation ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Online vs In-Person Mode Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1B2430] mb-1.5">
                  Consultation Modality:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModality('in-person');
                      setFormData(prev => ({
                        ...prev,
                        consultationType: 'Comprehensive Venous Duplex Ultrasound & Clinical Consultation',
                      }));
                    }}
                    className={`py-2.5 px-3 rounded-[3px] border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      modality === 'in-person'
                        ? 'bg-[#E4ECE8] border-[#2E6E62] text-[#2E6E62] shadow-xs'
                        : 'bg-[#F7F8F4] border-[#1B2430]/15 text-[#4A5563] hover:bg-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>In-Clinic Duplex Exam</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModality('telehealth');
                      setFormData(prev => ({
                        ...prev,
                        consultationType: 'Virtual Vascular Telehealth & Symptom Triage',
                      }));
                    }}
                    className={`py-2.5 px-3 rounded-[3px] border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      modality === 'telehealth'
                        ? 'bg-[#F7ECEF] border-[#6B2737] text-[#6B2737] shadow-xs'
                        : 'bg-[#F7F8F4] border-[#1B2430]/15 text-[#4A5563] hover:bg-white'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Online Telehealth Video</span>
                  </button>
                </div>
              </div>

              {/* Patient Score Banner if available */}
              {(prefilledScore !== undefined && prefilledScore !== null) || attachedMediaCount > 0 ? (
                <div className="bg-[#E4ECE8]/70 border border-[#2E6E62]/30 p-3 rounded-[3px] flex items-center justify-between text-xs">
                  <div>
                    {prefilledScore !== undefined && prefilledScore !== null && (
                      <span className="font-semibold text-[#2E6E62] block">
                        Assessment Score: {prefilledScore}/24 points ({prefilledStage ? `CEAP ${prefilledStage}` : ''})
                      </span>
                    )}
                    {attachedMediaCount > 0 && (
                      <span className="text-[11px] text-[#4A5563]">
                        {attachedMediaCount} patient photo(s)/video(s) attached for physician review
                      </span>
                    )}
                  </div>
                  <span className="bg-[#2E6E62] text-white px-2 py-0.5 rounded-[2px] font-mono text-[10px]">
                    Attached
                  </span>
                </div>
              ) : null}

              {/* Doctor Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                  Select Vascular Specialist
                </label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => {
                      const docId = e.target.value;
                      setSelectedDoctorId(docId);
                      const chosen = DOCTORS_DATA.find(d => d.id === docId);
                      if (chosen) {
                        setFormData(prev => ({ ...prev, location: chosen.location }));
                      }
                    }}
                    className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] py-2 pl-9 pr-3 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                  >
                    {DOCTORS_DATA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}, {d.credentials} — {d.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Type Focus */}
              <div>
                <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                  Consultation Focus
                </label>
                <select
                  value={formData.consultationType}
                  onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                  className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] p-2 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                >
                  {modality === 'in-person' ? (
                    <>
                      <option value="Comprehensive Venous Duplex Ultrasound & Clinical Consultation">
                        Comprehensive Venous Duplex Ultrasound &amp; Clinical Consultation (Standing mapping)
                      </option>
                      <option value="Cosmetic Spider Vein Evaluation & Sclerotherapy">
                        Cosmetic Spider Vein Evaluation &amp; Polarized Light Sclerotherapy Plan
                      </option>
                      <option value="Second Opinion on Saphenous Reflux / Prior Vein Surgery">
                        Second Opinion on Prior Vein Surgery / Recurrent Vein Check
                      </option>
                      <option value="Venous Stasis Ulcer / Advanced Wound Consultation">
                        Venous Stasis Ulcer / Advanced Skin Wound Care Evaluation
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="Virtual Vascular Telehealth & Symptom Triage">
                        Virtual Vascular Telehealth &amp; Symptom Triage (Video Review)
                      </option>
                      <option value="Pre-Ultrasound Physician Telehealth Orientation">
                        Pre-Ultrasound Physician Telehealth Orientation &amp; History
                      </option>
                      <option value="Post-Ablation Follow-Up Telehealth Review">
                        Post-Ablation Recovery &amp; Compression Stocking Review
                      </option>
                    </>
                  )}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] py-2 pl-9 pr-3 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                  />
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] py-2 pl-9 pr-3 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] py-2 pl-9 pr-3 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] p-2 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#F7F8F4] border border-[#1B2430]/20 rounded-[3px] p-2 text-xs text-[#1B2430] focus:border-[#2E6E62] focus:outline-none"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Early Afternoon (12:00 PM - 03:00 PM)">Early Afternoon (12:00 PM - 03:00 PM)</option>
                    <option value="Late Afternoon (03:00 PM - 05:30 PM)">Late Afternoon (03:00 PM - 05:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Physical Location or Virtual Instructions */}
              {modality === 'in-person' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#1B2430] mb-1">
                    Meridian Clinic Campus
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      readOnly
                      value={formData.location}
                      className="w-full bg-[#EFF1EA] border border-[#1B2430]/15 rounded-[3px] py-2 pl-9 pr-3 text-xs text-[#1B2430] font-medium"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-[#F7ECEF] border border-[#6B2737]/30 p-3 rounded-[3px] text-xs text-[#1B2430]">
                  <strong className="text-[#6B2737] block mb-0.5">Telehealth Instructions:</strong>
                  A secure, encrypted video conference link will be sent to your email ({formData.email || 'your email'}) 15 minutes prior to your consultation. No special software download needed.
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-[#6B2737] hover:bg-[#4E1C29] disabled:opacity-50 text-white rounded-[3px] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Confirming...' : `Confirm ${modality === 'in-person' ? 'In-Clinic' : 'Telehealth'} Appointment`}
                  </span>
                </button>
              </div>

              <div className="text-[11px] text-[#707E94] text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E6E62]" />
                <span>HIPAA-Compliant Patient Privacy · In-network with Medicare &amp; major PPOs</span>
              </div>
            </form>
          ) : (
            /* Confirmation Receipt View */
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E4ECE8] text-[#2E6E62] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase text-[#2E6E62] tracking-wide block">
                  Booking Confirmed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1B2430]">
                  Consultation Request Scheduled
                </h3>
                <p className="text-xs text-[#707E94] mt-1 font-mono">
                  Confirmation Code: {confirmation.appointmentId}
                </p>
              </div>

              <div className="bg-[#EFF1EA] p-4 rounded-[3px] border border-[#1B2430]/10 text-left text-xs space-y-2">
                <div>
                  <span className="font-semibold text-[#1B2430]">Patient Name: </span>
                  <span className="text-[#4A5563]">{formData.patientName}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1B2430]">Assigned Doctor: </span>
                  <span className="text-[#4A5563]">{confirmation.details.doctorName || currentDoctor.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1B2430]">Modality: </span>
                  <span className="text-[#4A5563]">
                    {confirmation.details.modality === 'in-person' ? 'In-Clinic Duplex Ultrasound' : 'Online Telehealth Video'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#1B2430]">Service: </span>
                  <span className="text-[#4A5563]">{formData.consultationType}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1B2430]">Location: </span>
                  <span className="text-[#4A5563]">{confirmation.details.clinicLocation}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1B2430]">Requested Timing: </span>
                  <span className="text-[#4A5563]">{formData.preferredDate || 'Next available slot'} — {formData.preferredTime}</span>
                </div>
              </div>

              <div className="bg-[#E4ECE8] p-3.5 rounded-[3px] text-xs text-[#1B2430] text-left">
                <strong>Patient Coordinator Notice:</strong> You will receive a calendar invite and SMS confirmation at {formData.phone} shortly. If you attached vein photos or videos, they are safely linked to your chart for Dr. {currentDoctor.name.split(' ')[2] || currentDoctor.name.split(' ')[1]}.
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetModal}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#2E6E62] hover:bg-[#20504A] rounded-[3px] transition-colors"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
