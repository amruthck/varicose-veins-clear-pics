export interface AssessmentOption {
  label: string;
  score: number;
  description?: string;
}

export interface AssessmentQuestion {
  id: number;
  title: string;
  desc: string;
  clinicalSignificance: string;
  options: AssessmentOption[];
}

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  ceapStage: string;
  ceapTitle: string;
  severityLevel: 'Minimal' | 'Mild' | 'Moderate' | 'Advanced' | 'Severe';
  severityColor: string;
  summary: string;
  pathologyDetails: string;
  recommendedAction: string;
  suggestedSpecialist: string;
  diagnosticRecommendation: string;
  lifestyleMeasures: string[];
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  recommendedSpecialist?: string;
  recommendedSpecialistRole?: string;
  urgencyLevel?: 'Routine Consultation' | 'Priority Evaluation' | 'Urgent Medical Attention';
  suggestedDiagnostic?: string;
  suggestedQuestions?: string[];
}

export interface CEAPStageInfo {
  stage: string;
  name: string;
  clinicalDescription: string;
  physicalManifestations: string[];
  refluxMechanism: string;
  treatmentApproaches: string[];
  reversibility: string;
  urgency: 'Low' | 'Moderate' | 'High' | 'Immediate';
}
