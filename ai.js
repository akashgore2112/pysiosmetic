const STORAGE_KEYS = {
  CACHE: 'painAssessment.ai.cache',
};

const DEFAULT_MODEL = 'gpt-4-turbo';

const LANGUAGE_COPY = {
  en: {
    fallbackSummary: (regionLabel) =>
      `Your responses point toward a musculoskeletal pattern that most often affects the ${regionLabel}.`,
    fallbackDiagnosis: (regionLabel, painStyle) =>
      `Likely ${painStyle} impacting the ${regionLabel}.`,
    fallbackPlan:
      'Begin with guided mobility work, hydration, and scheduled rest. Layer in targeted physiotherapy 2-3x per week and monitor symptom changes every 72 hours.',
    fallbackTimeline: (durationLabel) =>
      `Based on your duration profile (${durationLabel}), a recovery window of 4-6 weeks is realistic when treatment is consistent.`,
    fallbackDeepDive:
      'The pattern of intensity, duration, and lifestyle habits suggests soft-tissue overload with compensatory guarding. Focus on posture recalibration, core stability drills, and gentle neural glides.',
    disclaimer:
      'These insights are informational and do not replace personalised medical advice. Please consult a licensed clinician for a definitive diagnosis.',
    helpful: 'Helpful',
    notHelpful: 'Not Helpful',
  },
  hi: {
    fallbackSummary: (regionLabel) =>
      `${regionLabel} क्षेत्र में मांसपेशीय असंतुलन के संकेत मिल रहे हैं।`,
    fallbackDiagnosis: (regionLabel, painStyle) =>
      `संभावित रूप से ${painStyle} जो ${regionLabel} को प्रभावित कर रहा है।`,
    fallbackPlan:
      'निर्देशित स्ट्रेचिंग, हल्के व्यायाम और पर्याप्त आराम अपनाएँ। सप्ताह में 2-3 बार फिजियोथेरेपी सेशन लें और हर 3 दिन में प्रगति जाँचें।',
    fallbackTimeline: (durationLabel) =>
      `${durationLabel} की अवधि के अनुसार, नियमित देखभाल के साथ 4-6 हफ्तों में सुधार संभव है।`,
    fallbackDeepDive:
      'तीव्रता, अवधि और जीवनशैली उत्तर बताते हैं कि नरम ऊतक पर अधिक भार और सुरक्षा-प्रतिक्रिया मौजूद है। मुद्रा सुधार, कोर स्थिरता और कोमल तंत्रिका अभ्यास पर ध्यान दें।',
    disclaimer:
      'ये जानकारियाँ केवल शैक्षणिक उद्देश्यों के लिए हैं। निश्चित निदान के लिए प्रमाणित विशेषज्ञ से परामर्श करें।',
    helpful: 'सहायक',
    notHelpful: 'सहायक नहीं',
  },
  mr: {
    fallbackSummary: (regionLabel) =>
      `${regionLabel} भागात स्नायू व सांध्यांवर ताणाची चिन्हे दिसत आहेत.`,
    fallbackDiagnosis: (regionLabel, painStyle) =>
      `बहुधा ${painStyle} ज्याचा परिणाम ${regionLabel} वर होत आहे.`,
    fallbackPlan:
      'नियमित स्ट्रेचिंग, श्वसन प्रशिक्षण आणि आठवड्यातून 2-3 वेळा फिजिओथेरपी सत्र करा. लक्षणांचा आढावा दर तिसऱ्या दिवशी घ्या.',
    fallbackTimeline: (durationLabel) =>
      `${durationLabel} या कालावधीनुसार सातत्यपूर्ण उपचारांनी 4-6 आठवड्यांत सुधार अपेक्षित आहे.`,
    fallbackDeepDive:
      'तीव्रता, कालावधी आणि जीवनशैली सवयी सूचित करतात की संयोजी ऊतकांवर अतिरिक्त ताण आला आहे. शरीरबांधणी दुरुस्ती, कोर स्थिरता आणि सौम्य न्यूरो-मोबिलायझेशन वापरा.',
    disclaimer:
      'ही माहिती वैद्यकीय निदानाची जागा घेत नाही. कृपया तज्ञ फिजिओथेरपिस्टचा सल्ला घ्या.',
    helpful: 'उपयुक्त',
    notHelpful: 'उपयुक्त नाही',
  },
};

const PAIN_STYLE_MAP = {
  sharp: {
    en: 'acute sharp strain',
    hi: 'तीव्र चुभन वाला तनाव',
    mr: 'तीक्ष्ण स्नायू ताण',
  },
  dull: {
    en: 'chronic dull ache',
    hi: 'पुरानी भारी जकड़न',
    mr: 'जुना बोथट वेदना',
  },
  burning: {
    en: 'neuropathic burning irritation',
    hi: 'नाड़ी संबंधी जलन',
    mr: 'तंत्रिकाजन्य जळजळ',
  },
  throbbing: {
    en: 'vascular throbbing stress',
    hi: 'धड़कता रक्त-प्रवाह तनाव',
    mr: 'धडधडणारा रक्तवाहिनीतला ताण',
  },
};

function getLanguageCopy(language) {
  return LANGUAGE_COPY[language] || LANGUAGE_COPY.en;
}

function safeLocalStorageGet(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn('[PainAssessment][cache] unable to read localStorage', error);
    return {};
  }
}

function safeLocalStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('[PainAssessment][cache] unable to persist localStorage', error);
  }
}

function hashKey(data) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

export class AIEngine {
  constructor({ openAIKey }) {
    this.openAIKey = openAIKey;
    this.cache = new Map();
    this.cacheStore = typeof window !== 'undefined' ? safeLocalStorageGet(STORAGE_KEYS.CACHE) : {};
    Object.entries(this.cacheStore).forEach(([key, value]) => {
      this.cache.set(key, value);
    });
  }

  storeCache(key, value) {
    this.cache.set(key, value);
    if (typeof window !== 'undefined') {
      this.cacheStore[key] = value;
      safeLocalStorageSet(STORAGE_KEYS.CACHE, this.cacheStore);
    }
  }

  async generateInsights(session, language, context = {}) {
    const cacheKey = `${language}:${hashKey({ responses: session.responses })}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let insights;

    if (this.openAIKey && typeof fetch === 'function' && (typeof navigator === 'undefined' || navigator.onLine)) {
      try {
        insights = await this.queryOpenAI(session, language, context);
      } catch (error) {
        console.warn('[PainAssessment][ai] OpenAI request failed. Using fallback.', error);
        insights = this.buildFallback(session, language, context);
      }
    } else {
      insights = this.buildFallback(session, language, context);
    }

    this.storeCache(cacheKey, insights);
    return insights;
  }

  async queryOpenAI(session, language, context) {
    const prompt = this.buildPrompt(session, language, context);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.openAIKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              'You are an empathetic physiotherapy assistant. Respond in valid JSON. Include summary, probableDiagnosis, plan (array), timeline, riskScore (0-1), deepDive, disclaimer, and metrics with painIndex, confidence, recoveryCurve (array of 6 numbers), and riskBand. Tone should be professional and supportive. Mention this is not a diagnosis.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI error: ${errorText}`);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error('Empty response from OpenAI');
    }

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (error) {
      console.warn('[PainAssessment][ai] Unable to parse OpenAI JSON. Returning fallback.', rawContent);
      return this.buildFallback(session, language, context);
    }

    return parsed;
  }

  buildPrompt(session, language, context) {
    const { responses } = session;
    const { labels = {} } = context;
    const regionLabel = (responses.region || []).map((value) => labels.regions?.[value] || value).join(', ');
    const intensity = responses.intensity ?? 'unknown';
    const duration = labels.duration?.[responses.duration] || responses.duration || 'unknown';
    const painQuality = responses.painQuality
      ? labels.painQuality?.[responses.painQuality] || responses.painQuality
      : 'not described';
    const symptoms = (responses.symptoms || []).map((value) => labels.symptoms?.[value] || value).join(', ');
    const lifestyle = (responses.lifestyle || []).map((value) => labels.lifestyle?.[value] || value).join(', ');
    const sleep = responses.sleep ? labels.sleep?.[responses.sleep] || responses.sleep : 'not specified';

    return `Language: ${language}.
Pain region(s): ${regionLabel || 'not specified'}.
Pain intensity (0-10): ${intensity}.
Duration: ${duration}.
Pain quality: ${painQuality}.
Associated symptoms: ${symptoms || 'none reported'}.
Lifestyle contributors: ${lifestyle || 'none reported'}.
Sleep quality: ${sleep}.
Return insights in ${language} that match the requested JSON schema.`;
  }

  buildFallback(session, language, context) {
    const copy = getLanguageCopy(language);
    const { responses } = session;
    const { labels = {} } = context;

    const regions = responses.region?.length
      ? responses.region.map((value) => labels.regions?.[value] || value)
      : [labels.regions?.general || 'musculoskeletal chain'];
    const regionLabel = regions.join(', ');
    const durationLabel = labels.duration?.[responses.duration] || labels.duration?.default || 'moderate duration';
    const painQualityKey = responses.painQuality || 'dull';
    const painStyle = PAIN_STYLE_MAP[painQualityKey]?.[language] || PAIN_STYLE_MAP.dull[language];

    const intensity = Number(responses.intensity ?? 5);
    const durationScore = this.mapDurationToScore(responses.duration);
    const lifestyleScore = (responses.lifestyle?.length || 0) * 3;
    const painIndex = Math.min(100, Math.round(intensity * 9 + durationScore + lifestyleScore));
    const confidence = Math.max(35, Math.min(94, 92 - intensity * 4 + (responses.sleep === 'good' ? 6 : 0)));
    const riskScore = Math.min(0.95, Math.max(0.05, Number((painIndex / 130).toFixed(2))));

    const recoveryCurve = this.buildRecoveryCurve(intensity, durationScore, responses.sleep);
    const riskBand = riskScore > 0.66 ? 'high' : riskScore > 0.33 ? 'moderate' : 'low';

    return {
      summary: copy.fallbackSummary(regionLabel),
      probableDiagnosis: copy.fallbackDiagnosis(regionLabel, painStyle),
      plan: [copy.fallbackPlan],
      timeline: copy.fallbackTimeline(durationLabel),
      riskScore,
      riskBand,
      deepDive: copy.fallbackDeepDive,
      disclaimer: copy.disclaimer,
      metrics: {
        painIndex,
        confidence,
        recoveryCurve,
        riskBand,
      },
    };
  }

  mapDurationToScore(durationKey) {
    switch (durationKey) {
      case 'acute':
        return 6;
      case 'subacute':
        return 12;
      case 'chronic':
        return 24;
      case 'persistent':
        return 32;
      default:
        return 14;
    }
  }

  buildRecoveryCurve(intensity, durationScore, sleepQuality) {
    const base = 100 - intensity * 5;
    const modifier = sleepQuality === 'poor' ? -8 : sleepQuality === 'excellent' ? 6 : 0;
    return [0, 25, 45, 60, 78, Math.max(82, Math.min(96, base + modifier))];
  }
}
