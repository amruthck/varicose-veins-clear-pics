import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    title: "1. Visible Veins",
    desc: "Do you have visible, enlarged, or twisted veins on your legs?",
    clinicalSignificance: "Evaluates physical dilation of the subcutaneous and superficial venous network (saphenous tributaries).",
    options: [
      { label: "No visible veins noticed", score: 0, description: "Normal appearance with smooth skin contour." },
      { label: "Mild spider veins (fine web-like lines)", score: 1, description: "Telangiectasias (<1mm) or reticular veins (1-3mm), reddish or bluish." },
      { label: "Noticeably raised or bulging veins in a few areas", score: 2, description: "Palpable, elevated varicose cords (>3mm) typically along calf or thigh." },
      { label: "Extensive, prominent, twisted veins along calves or thighs", score: 3, description: "Severe, tortuous, clustered vein ropes visible while standing." }
    ]
  },
  {
    id: 2,
    title: "2. Pain / Aching",
    desc: "How often do you experience aching, throbbing, or discomfort in your legs?",
    clinicalSignificance: "Reflects elevated venous hypertension stretching perivascular nociceptors and myofascial compartments.",
    options: [
      { label: "Never or rarely", score: 0, description: "No regular leg discomfort or ache." },
      { label: "Mild ache after strenuous activity", score: 1, description: "Discomfort only following rigorous gym workouts or long walks." },
      { label: "Frequent dull ache by the end of the day", score: 2, description: "Consistent tired, burning, or throbbing feeling in calves by evening." },
      { label: "Persistent, severe pain affecting everyday tasks", score: 3, description: "Debilitating chronic ache that interferes with standing, work, or leisure." }
    ]
  },
  {
    id: 3,
    title: "3. Leg Heaviness",
    desc: "Do your legs feel heavy or tired, especially after sitting or standing?",
    clinicalSignificance: "Hallmark sensation of impaired venous return, where pooled blood adds hydrostatic column weight.",
    options: [
      { label: "Never", score: 0, description: "Legs feel light and energetic throughout the day." },
      { label: "Occasionally after very long shifts", score: 1, description: "Mild heaviness after 8+ hours on feet or long international travel." },
      { label: "Frequently noticeable in the afternoons or evenings", score: 2, description: "Regular heavy, leaden sensation that makes climbing stairs feel taxing." },
      { label: "Constant heavy feeling almost every day", score: 3, description: "Chronic fatigue in legs that is present even in morning hours." }
    ]
  },
  {
    id: 4,
    title: "4. Swelling (Edema)",
    desc: "Do you notice swelling around your ankles, feet, or lower legs?",
    clinicalSignificance: "High capillary hydrostatic pressure pushes plasma filtrate into interstitial lower limb spaces (CEAP C3).",
    options: [
      { label: "No swelling", score: 0, description: "Ankles and feet remain defined and slender." },
      { label: "Mild swelling on hot days or long flights", score: 1, description: "Slight transient puffiness that resolves completely overnight." },
      { label: "Regular ankle swelling that leaves sock marks by evening", score: 2, description: "Visible pitting edema and tight shoe fit after normal daily routines." },
      { label: "Persistent, significant swelling throughout the day", score: 3, description: "Chronic edema extending up calves that fails to fully resolve with elevation." }
    ]
  },
  {
    id: 5,
    title: "5. Itching or Burning",
    desc: "Do you experience itching, burning, or heat sensations near your veins?",
    clinicalSignificance: "Leukocyte extravasation and inflammatory cytokine release cause stasis dermatitis and pruritus.",
    options: [
      { label: "None", score: 0, description: "Skin feels calm with no burning or itching sensations." },
      { label: "Occasional mild itchiness", score: 1, description: "Intermittent mild itch, often mistaken for dry winter skin." },
      { label: "Frequent burning sensation or itching around visible veins", score: 2, description: "Hot, stinging or itchy patches directly over varicosities." },
      { label: "Severe, persistent itch, burning or eczema-like skin irritation", score: 3, description: "Intense stasis dermatitis with flaky, irritated, or fragile red skin." }
    ]
  },
  {
    id: 6,
    title: "6. Skin Changes & Discoloration",
    desc: "Have you observed skin darkening, hardening, or eczema patches on your lower leg or ankle?",
    clinicalSignificance: "Critical indicator of CEAP C4 (hemosiderin staining or lipodermatosclerosis) preceding ulceration.",
    options: [
      { label: "Normal skin tone and texture", score: 0, description: "Uniform skin color without dark pigmentation or induration." },
      { label: "Slight brownish or reddish freckling near inner ankles", score: 1, description: "Early hemosiderin deposition from lysed red blood cells." },
      { label: "Thickened, hardened, or dark bronze leathery skin (lipodermatosclerosis)", score: 2, description: "Firm, bound-down skin resembling an inverted champagne bottle leg contour." },
      { label: "Active open sore or history of healed venous leg ulcer", score: 3, description: "Skin breakdown (CEAP C5/C6) requiring immediate clinical intervention." }
    ]
  },
  {
    id: 7,
    title: "7. Nocturnal Symptoms & Night Cramps",
    desc: "Do painful muscle spasms, calf cramps, or restless leg sensations wake you during the night?",
    clinicalSignificance: "Nocturnal venous stasis and local metabolic waste buildup trigger involuntary muscle contractions.",
    options: [
      { label: "Sleep uninterrupted without leg discomfort", score: 0, description: "No muscle cramps or leg restlessness during sleep." },
      { label: "Mild calf tightness or rare cramp after exertion", score: 1, description: "Infrequent night cramp once a month or less." },
      { label: "Frequent calf cramps or restless legs disturbing sleep", score: 2, description: "Wake up 2-3 times weekly needing to massage or shake legs." },
      { label: "Severe nightly throbbing cramps or crawling sensations", score: 3, description: "Severe disruption of restorative sleep every night." }
    ]
  },
  {
    id: 8,
    title: "8. Occupational Posture & Standing",
    desc: "What best describes your average daytime standing or sitting routine?",
    clinicalSignificance: "Inactivity of the calf muscle pump allows venous pressures to remain at continuous hydrostatic maximum (~90 mmHg).",
    options: [
      { label: "Active movement with frequent walking & posture shifts", score: 0, description: "Dynamic daily routine that continually activates calf muscle pumps." },
      { label: "Continuous sitting or standing for 2–4 hours", score: 1, description: "Moderate desk work with intermittent walking breaks." },
      { label: "Static standing or chair sitting for 5–7 hours daily", score: 2, description: "Prolonged desk bound or retail posture with infrequent walking." },
      { label: "Prolonged static standing or sitting >8 hours daily", score: 3, description: "Healthcare, manufacturing, or commercial driving with virtually no leg elevation." }
    ]
  }
];

export function calculateAssessmentResult(answers: Record<number, number>): import('../types').AssessmentResult {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = ASSESSMENT_QUESTIONS.length * 3; // 24
  const percentage = Math.round((totalScore / maxScore) * 100);

  if (totalScore <= 3) {
    return {
      totalScore,
      maxScore,
      percentage,
      ceapStage: "C0 – C1",
      ceapTitle: "Minimal / Pre-Clinical Venous Reflux",
      severityLevel: "Minimal",
      severityColor: "#2E6E62", // Teal
      summary: "Your responses suggest very healthy venous circulation or minimal cosmetic telangiectasias (spider veins) with no significant hemodynamic impairment.",
      pathologyDetails: "The venous bicuspid valves in your great and small saphenous trunks appear competent. Your calf muscle pump efficiently clears venous volume against gravity.",
      recommendedAction: "Maintain preventive habits: regular walking, avoiding prolonged static standing, and elevating legs after long journeys.",
      suggestedSpecialist: "Primary Care Physician or Phlebologist (if spider vein cosmetic clearance is desired)",
      diagnosticRecommendation: "Routine health checks. No formal ultrasound mapping is currently urgent unless visual spider veins become bothersome.",
      lifestyleMeasures: [
        "Stay active: aim for 30 minutes of aerobic walking daily to engage calf muscle pump",
        "Take 2-minute walking or ankle-pumping breaks every 60 minutes of desk sitting",
        "Maintain adequate hydration to support optimal blood rheology",
        "Consider mild 15-20 mmHg travel socks on flights or long road trips"
      ]
    };
  }

  if (totalScore <= 8) {
    return {
      totalScore,
      maxScore,
      percentage,
      ceapStage: "C1 – C2",
      ceapTitle: "Mild to Moderate Superficial Venous Insufficiency",
      severityLevel: "Mild",
      severityColor: "#B98B2E", // Gold
      summary: "You are experiencing early symptoms of venous reflux with noticeable vein dilation, leg heaviness, or evening fatigue.",
      pathologyDetails: "One-way valves in superficial saphenous branches may have developed partial incompetence, allowing retrograde blood pooling under gravitational stress.",
      recommendedAction: "A formal baseline venous duplex ultrasound is indicated to pinpoint incompetent valve segments before further vein enlargement occurs.",
      suggestedSpecialist: "Phlebologist or Board-Certified Vascular Specialist",
      diagnosticRecommendation: "Standing Bilateral Lower Extremity Venous Duplex Ultrasound with Valsalva and calf release maneuvers.",
      lifestyleMeasures: [
        "Incorporate graduated compression stockings (Class 1, 15-20 mmHg or Class 2, 20-30 mmHg) during work hours",
        "Elevate legs above heart level for 15-20 minutes every evening",
        "Avoid high-temperature baths, saunas, and prolonged hot tubs that cause venous vasodilatation",
        "Perform heel-to-toe calf raises when standing in stationary lines"
      ]
    };
  }

  if (totalScore <= 14) {
    return {
      totalScore,
      maxScore,
      percentage,
      ceapStage: "C2 – C3",
      ceapTitle: "Moderate Chronic Venous Disease with Dependent Edema",
      severityLevel: "Moderate",
      severityColor: "#D97706", // Amber
      summary: "Your symptoms indicate established chronic venous hypertension with regular leg swelling, aching, and noticeable vein tortuosity.",
      pathologyDetails: "Reflux duration in the great saphenous, small saphenous, or accessory veins likely exceeds the diagnostic threshold (>0.5 seconds), causing fluid leakage into subcutaneous tissues.",
      recommendedAction: "Consult a vascular specialist for in-office duplex ultrasound and discuss modern minimally invasive outpatient corrective options (EVLA, RFA, or VenaSeal).",
      suggestedSpecialist: "Board-Certified Vascular Surgeon or Phlebologist",
      diagnosticRecommendation: "Full Anatomical & Hemodynamic Venous Duplex Mapping to evaluate saphenofemoral junction (SFJ) competence.",
      lifestyleMeasures: [
        "Wear prescription graduated compression stockings (Class 2, 20-30 mmHg) daily from morning until evening",
        "Frequent leg elevation (at least 3-4 times daily for 15 minutes)",
        "Gentle non-impact exercise: swimming, cycling, and brisk walking",
        "Inspect lower leg skin regularly for redness, flakiness, or heat"
      ]
    };
  }

  if (totalScore <= 19) {
    return {
      totalScore,
      maxScore,
      percentage,
      ceapStage: "C4a – C4b",
      ceapTitle: "Advanced Venous Hypertension & Trophic Skin Changes",
      severityLevel: "Advanced",
      severityColor: "#EA580C", // Deep Orange
      summary: "Significant venous disease with cutaneous manifestations such as pigmentation (hemosiderin staining), stasis dermatitis, or hardened leathery skin (lipodermatosclerosis).",
      pathologyDetails: "Sustained high venous pressure has caused microvascular extravasation of erythrocytes, chronic inflammatory tissue remodeling, and subcutaneous fibrosis.",
      recommendedAction: "Priority evaluation by a vascular surgeon is strongly advised to arrest disease progression and protect skin integrity before open ulceration develops.",
      suggestedSpecialist: "Vascular Surgeon or Vein Clinic Medical Director",
      diagnosticRecommendation: "Urgent Comprehensive Venous Duplex Ultrasound with Perforator Vein Mapping.",
      lifestyleMeasures: [
        "Strict compliance with physician-prescribed 20-30 or 30-40 mmHg compression therapy",
        "Hydrate and protect fragile skin with barrier emollients (avoid fragranced lotions)",
        "Prompt medical attention if skin feels warm, tight, or displays new localized red tender spots",
        "Minimally invasive closure of axial reflux source to reduce capillary bed pressure"
      ]
    };
  }

  return {
    totalScore,
    maxScore,
    percentage,
    ceapStage: "C5 – C6",
    ceapTitle: "Severe Chronic Venous Insufficiency (Ulcer Risk / Active Ulcer)",
    severityLevel: "Severe",
    severityColor: "#6B2737", // Wine
    summary: "Your assessment indicates severe, complicated chronic venous disease with high vulnerability to or presence of venous stasis ulceration and chronic tissue impairment.",
    pathologyDetails: "Severe multi-level venous reflux (superficial and/or deep venous system) with high venous hypertension that prevents normal cellular nutrient exchange and epidermal healing.",
    recommendedAction: "Immediate vascular evaluation. Combining modern endovenous saphenous ablation with targeted wound care offers up to 90%+ ulcer healing and dramatically lowers recurrence.",
    suggestedSpecialist: "Vascular Surgeon, Phlebologist, and Wound Care Specialist",
    diagnosticRecommendation: "Immediate Lower Extremity Duplex Ultrasound, Ankle-Brachial Index (ABI) to rule out arterial disease, and wound assessment.",
    lifestyleMeasures: [
      "Follow specialized multi-layer compression bandage protocols under clinical supervision",
      "Do not walk barefoot; protect ankles and gaiter zones from micro-trauma",
      "Keep wounds clean, dry, and dressed with non-adherent foam dressings",
      "Schedule immediate diagnostic consultation at Meridian Vascular"
    ]
  };
}
