import React, { useState } from 'react';
import { DOCTORS_DATA, DoctorProfile } from '../data/doctorsData';
import { Stethoscope, Star, MapPin, Calendar, Video, Award, CheckCircle2 } from 'lucide-react';

interface DoctorDirectoryProps {
  onSelectDoctor: (doctor: DoctorProfile) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({ onSelectDoctor }) => {
  const [filterSpecialty, setFilterSpecialty] = useState<string>('All');

  const specialties = ['All', 'Vascular Surgery', 'Phlebology', 'Wound Care', 'Aesthetic Vein'];

  const filteredDoctors = filterSpecialty === 'All'
    ? DOCTORS_DATA
    : DOCTORS_DATA.filter(doc => doc.specialty === filterSpecialty);

  return (
    <section id="doctors" className="py-16 bg-[#F7F8F4] border-b border-[#1B2430]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1B2430]/10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#2E6E62] mb-1">
              Board-Certified Clinical Team
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2430]">
              Meet Our Vascular Surgeons &amp; Phlebologists
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4A5563] max-w-xl">
              Our fellowship-trained physicians are diplomates of the American Board of Venous &amp; Lymphatic Medicine and American College of Surgeons, offering in-person duplex mapping and virtual consults.
            </p>
          </div>

          {/* Specialty Filter Buttons */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5 bg-[#E3E7DD] p-1 rounded-[3px]">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setFilterSpecialty(spec)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[2px] transition-all cursor-pointer ${
                  filterSpecialty === spec
                    ? 'bg-white text-[#1B2430] shadow-xs'
                    : 'text-[#4A5563] hover:text-[#1B2430]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-[#1B2430]/15 rounded-[4px] p-6 shadow-xs hover:border-[#2E6E62]/40 transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Doctor Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1B2430]/10">
                  <div className="flex items-center gap-3.5">
                    {/* Doctor Avatar / Monogram */}
                    <div className="w-12 h-12 rounded-full bg-[#E4ECE8] border border-[#2E6E62]/30 flex items-center justify-center text-[#2E6E62] font-serif font-bold text-lg shrink-0">
                      {doc.name.split(' ').map(n => n[0]).slice(1).join('')}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#1B2430]">
                          {doc.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#6B2737]">
                          {doc.credentials}
                        </span>
                      </div>
                      <span className="text-xs text-[#707E94] block">
                        {doc.title}
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-[#F6F1E3] border border-[#B98B2E]/30 px-2 py-0.5 rounded-[2px] text-xs font-semibold text-[#B98B2E] shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{doc.rating}</span>
                    <span className="text-[10px] text-[#707E94]">({doc.reviewCount})</span>
                  </div>
                </div>

                {/* Bio & Education */}
                <p className="text-xs sm:text-sm text-[#4A5563] mt-4 leading-relaxed">
                  {doc.bio}
                </p>

                <div className="mt-3 text-[11px] text-[#707E94] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#2E6E62] shrink-0" />
                  <span>{doc.education}</span>
                </div>

                {/* Clinical Expertise Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {doc.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-[#EFF1EA] text-[#1B2430] px-2 py-0.5 rounded-[2px] font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

              </div>

              {/* Doctor Card Footer & Actions */}
              <div className="mt-6 pt-4 border-t border-[#1B2430]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-[#1B2430] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#6B2737] shrink-0" />
                    <span className="truncate max-w-[220px]">{doc.location}</span>
                  </div>
                  <div className="text-[11px] text-[#2E6E62] font-semibold mt-0.5 flex items-center gap-2">
                    <span>Next: {doc.nextAvailable}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3" /> Telehealth Available
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectDoctor(doc)}
                  className="px-3.5 py-2 bg-[#6B2737] hover:bg-[#4E1C29] text-white font-semibold rounded-[3px] transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {doc.name.split(' ')[2] || doc.name.split(' ')[1]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
