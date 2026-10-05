import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback educational clinical triage logic for reliable offline/quota operation
function generateFallbackGuidance(userQuery: string): {
  reply: string;
  recommendedSpecialist: string;
  recommendedSpecialistRole: string;
  urgencyLevel: 'Routine Consultation' | 'Priority Evaluation' | 'Urgent Medical Attention';
  suggestedDiagnostic: string;
  suggestedQuestions: string[];
} {
  const query = userQuery.toLowerCase();

  if (query.includes('ulcer') || query.includes('wound') || query.includes('open sore') || query.includes('bleeding')) {
    return {
      reply: "Your description indicates possible advanced chronic venous insufficiency with trophic skin breakdown (CEAP C5–C6) or venous stasis ulceration. Venous hypertension causes blood pooling in lower leg tissues, leading to microvascular damage, lipodermatosclerosis, and subsequent skin ulceration, typically around the medial malleolus (inner ankle). Prompt professional wound care combined with endovenous reflux correction offers high healing rates and prevents recurrence.",
      recommendedSpecialist: "Vascular Surgeon or Phlebologist",
      recommendedSpecialistRole: "Specialist trained in venous hemodynamics, endovenous thermal ablation, and comprehensive ulcer management.",
      urgencyLevel: "Urgent Medical Attention",
      suggestedDiagnostic: "Comprehensive Lower Extremity Duplex Ultrasound with Reflux Protocol & Wound Swab/Evaluation",
      suggestedQuestions: [
        "What is the underlying reflux source feeding this ulcer bed?",
        "Can minimally invasive endovenous ablation (EVLA/RFA) accelerate ulcer healing?",
        "What multi-layer compression bandage system is best indicated for my mobility level?"
      ]
    };
  }

  if (query.includes('swelling') || query.includes('edema') || query.includes('brown') || query.includes('dark') || query.includes('pigment') || query.includes('stain')) {
    return {
      reply: "The symptoms of progressive leg swelling and brownish/bronze skin discoloration (hemosiderin staining from extravasated red blood cells) are hallmark indicators of CEAP C3 to C4 chronic venous disease. When venous valves fail (venous reflux), capillary pressure spikes, driving fluid and iron pigments into surrounding dermal tissues. Early intervention prevents progression into painful lipodermatosclerosis and tissue fibrosis.",
      recommendedSpecialist: "Vascular Surgeon or Phlebologist",
      recommendedSpecialistRole: "Lower extremity venous disease specialist experienced in duplex ultrasound mapping and saphenous vein closure.",
      urgencyLevel: "Priority Evaluation",
      suggestedDiagnostic: "Standing Bilateral Venous Duplex Ultrasound with Spectral Doppler (>0.5s reflux threshold)",
      suggestedQuestions: [
        "Are the great or small saphenous veins incompetent, or are perforator veins involved?",
        "Would prescription graduated compression stockings (20-30 mmHg) provide relief while preparing for intervention?",
        "Am I a candidate for non-thermal adhesive closure (VenaSeal) or endovenous radiofrequency?"
      ]
    };
  }

  if (query.includes('spider') || query.includes('fine') || query.includes('cosmetic') || query.includes('red vein') || query.includes('purple vein')) {
    return {
      reply: "Spider veins (telangiectasias, CEAP C1) are dilated intradermal venules under 1mm in caliber, frequently accompanied by reticular veins (1-3mm). While often treated for aesthetic reasons, in approximately 25-40% of patients they are fed by underlying 'feeder' veins or saphenous reflux. Prior to cosmetic treatments like visual sclerotherapy, an ultrasound assessment is recommended to eliminate underlying axial reflux that could cause rapid recurrence or matting.",
      recommendedSpecialist: "Phlebologist or Board-Certified Dermatologist",
      recommendedSpecialistRole: "Vein specialist or cosmetic dermatologist specializing in liquid/foam sclerotherapy and surface Nd:YAG laser treatments.",
      urgencyLevel: "Routine Consultation",
      suggestedDiagnostic: "Screening Venous Duplex Ultrasound to rule out occult saphenous reflux prior to sclerotherapy",
      suggestedQuestions: [
        "Do you perform ultrasound mapping to identify feeder reticular veins before treating superficial spiders?",
        "How many sessions of micro-sclerotherapy are typically required for my vein density?",
        "What post-treatment sun avoidance and compression regimen will optimize clearance?"
      ]
    };
  }

  // General varicose vein / heaviness / ache response
  return {
    reply: "Based on your reported leg discomfort, heaviness, or visible vein protrusion, these symptoms align with venous reflux disease (venous insufficiency). Because veins return deoxygenated blood against gravity back to the heart, delicate one-way bicuspid valves prevent backflow. When these valves stretch or become incompetent, retrograde pooling creates hydrostatic pressure that causes vein elongation, tortuosity, and end-of-day achiness.",
    recommendedSpecialist: "Vascular Surgeon or Phlebologist",
    recommendedSpecialistRole: "Board-certified vascular specialist who conducts in-office duplex ultrasound diagnosis and modern ambulatory treatments.",
    urgencyLevel: "Routine Consultation",
    suggestedDiagnostic: "Bilateral Lower Extremity Duplex Ultrasound (mapping Great & Small Saphenous Veins)",
    suggestedQuestions: [
      "Which specific veins have incompetent valves and what is the reflux duration?",
      "What are the benefits of thermal ablation (EVLA/RFA) versus non-thermal treatments (VenaSeal / Foam Sclerotherapy) for my anatomy?",
      "Will my private insurance or Medicare cover the diagnostic ultrasound and corrective procedures?"
    ]
  };
}

// AI Assistant Chat endpoint
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const { prompt, messages } = req.body;
    const query = prompt || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].text : '');

    if (!query) {
      return res.status(400).json({ error: 'Query or message prompt is required.' });
    }

    if (ai) {
      try {
        const systemPrompt = `You are the ClearPix AI Vascular Specialty Guidance Assistant, an expert medical education assistant developed for Meridian Vascular & ClearPix Healthcare.
Your purpose:
1. Provide compassionate, highly accurate, educational guidance regarding varicose veins, chronic venous disease, CEAP classification (C0-C6), symptoms, and duplex ultrasound diagnosis.
2. Direct patients to the appropriate medical specialist (e.g., Board-Certified Vascular Surgeon, Phlebologist / Vein Specialist, Interventional Radiologist, Dermatologist, or Primary Care Physician).
3. Suggest evidence-based diagnostic procedures (especially standing bilateral venous duplex ultrasound with reflux protocol).
4. Provide targeted questions the patient should bring to their consultation.
5. Emphasize that your output is for educational guidance only and does not constitute a definitive medical diagnosis or replace an in-person physical examination.

Output in clean, structured JSON format with this exact schema:
{
  "reply": "string (comprehensive educational explanation in 2-3 clear paragraphs)",
  "recommendedSpecialist": "string (e.g. Vascular Surgeon, Phlebologist, etc.)",
  "recommendedSpecialistRole": "string (brief sentence describing their expertise)",
  "urgencyLevel": "Routine Consultation" | "Priority Evaluation" | "Urgent Medical Attention",
  "suggestedDiagnostic": "string (e.g. Standing Bilateral Lower Extremity Venous Duplex Ultrasound)",
  "suggestedQuestions": ["string", "string", "string"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: query,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, using intelligent clinical fallback:', geminiError);
      }
    }

    // Fallback if AI key is missing or call failed
    const fallback = generateFallbackGuidance(query);
    return res.json(fallback);
  } catch (error) {
    console.error('Error in /api/assistant/chat:', error);
    res.status(500).json({ error: 'Failed to process vascular guidance request.' });
  }
});

// Appointment booking endpoint
app.post('/api/appointments', (req, res) => {
  try {
    const { patientName, email, phone, preferredDate, preferredTime, consultationType, notes, assessmentScore } = req.body;
    
    // In-app booking confirmation
    const appointmentId = 'MV-' + Math.floor(100000 + Math.random() * 900000);
    return res.json({
      success: true,
      appointmentId,
      message: 'Appointment request received successfully.',
      details: {
        patientName,
        consultationType: consultationType || 'Comprehensive Venous Duplex Ultrasound & Consultation',
        preferredDate: preferredDate || 'Next available',
        preferredTime: preferredTime || 'Morning (9:00 AM - 12:00 PM)',
        clinicLocation: 'Meridian Vascular Center — Suite 400',
        assessmentScore: assessmentScore ?? null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process appointment booking.' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Dynamic import vite for development
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Meridian Vascular app listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
