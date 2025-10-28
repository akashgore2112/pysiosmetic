import { PainAssessmentAI } from './core.js';

window.addEventListener('load', () => {
  const painAssessment = new PainAssessmentAI({
    containerId: 'pain-assessment',
    language: 'en',
    theme: 'dark',
    openAIKey: window.PAIN_ASSESSMENT_OPENAI_KEY || null,
  });

  painAssessment.init();
  window.painAssessment = painAssessment;
});
