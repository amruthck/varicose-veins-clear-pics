export interface DoctorProfile {
  id: string;
  name: string;
  credentials: string;
  title: string;
  specialty: 'Vascular Surgery' | 'Phlebology' | 'Wound Care' | 'Aesthetic Vein';
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  location: string;
  modalities: ('In-Person' | 'Telehealth')[];
  nextAvailable: string;
  education: string;
  expertise: string[];
}

export const DOCTORS_DATA: DoctorProfile[] = [
  {
    id: 'dr-vance',
    name: 'Dr. Eleanor Vance',
    credentials: 'MD, FACS, RPVI',
    title: 'Chief of Vascular Surgery & Phlebology',
    specialty: 'Vascular Surgery',
    yearsExperience: 16,
    rating: 4.94,
    reviewCount: 188,
    bio: 'Fellow of the American College of Surgeons with specialized fellowship training in endovenous ablation (EVLA/RFA) and deep venous reflux management.',
    location: 'Meridian Vascular Center — Main Campus (Suite 400)',
    modalities: ['In-Person', 'Telehealth'],
    nextAvailable: 'Tomorrow, 10:30 AM',
    education: 'Johns Hopkins School of Medicine · Harvard Vascular Surgery Fellowship',
    expertise: ['Endovenous Laser Ablation (EVLA)', 'Saphenous Reflux Mapping', 'Ambulatory Microphlebectomy']
  },
  {
    id: 'dr-thorne',
    name: 'Dr. Marcus Thorne',
    credentials: 'MD, DABVLM, RVT',
    title: 'Director of Venous Medicine & Sclerotherapy',
    specialty: 'Phlebology',
    yearsExperience: 13,
    rating: 4.96,
    reviewCount: 215,
    bio: 'Diplomate of the American Board of Venous & Lymphatic Medicine. Pioneer in non-thermal VenaSeal medical adhesive and ultrasound-guided foam sclerotherapy.',
    location: 'Meridian Westside Vein Pavilion — Suite 120',
    modalities: ['In-Person', 'Telehealth'],
    nextAvailable: 'Thursday, 01:15 PM',
    education: 'Stanford University School of Medicine · Mayo Clinic Phlebology',
    expertise: ['VenaSeal Medical Adhesive', 'Ultrasound-Guided Foam Sclerotherapy', 'Reticular Vein Clearance']
  },
  {
    id: 'dr-chen',
    name: 'Dr. Sophia Chen',
    credentials: 'MD, RPVI, CWSP',
    title: 'Director of Advanced Venous Wound Care',
    specialty: 'Wound Care',
    yearsExperience: 15,
    rating: 4.91,
    reviewCount: 142,
    bio: 'Double board-certified in vascular medicine and certified wound specialist physician, focusing on CEAP C4–C6 advanced venous hypertension, lipodermatosclerosis, and stasis ulcer healing.',
    location: 'Meridian North Diagnostic Imaging Center',
    modalities: ['In-Person', 'Telehealth'],
    nextAvailable: 'Friday, 09:00 AM',
    education: 'Columbia University Vagelos College of Physicians and Surgeons',
    expertise: ['Venous Stasis Ulcer Healing', 'Perforator Vein Ablation', 'Multi-Layer Compression Systems']
  },
  {
    id: 'dr-alverez',
    name: 'Dr. Julian Alverez',
    credentials: 'DO, DABVLM',
    title: 'Lead Aesthetic Phlebologist',
    specialty: 'Aesthetic Vein',
    yearsExperience: 10,
    rating: 4.89,
    reviewCount: 110,
    bio: 'Dedicated to cosmetic and symptomatic spider and reticular vein clearance using high-magnification polarized light microsclerotherapy and dual-wavelength surface vascular lasers.',
    location: 'Meridian Vascular Center — Main Campus (Suite 400)',
    modalities: ['In-Person', 'Telehealth'],
    nextAvailable: 'Wednesday, 03:00 PM',
    education: 'Georgetown University School of Medicine · Aesthetic Phlebology Fellowship',
    expertise: ['Microsclerotherapy (Telangiectasias)', 'Surface Nd:YAG Laser', 'Spider Vein Feeder Mapping']
  }
];
