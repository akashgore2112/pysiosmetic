import { PainAssessmentUI } from './ui.js';
import { AIEngine } from './ai.js';

const STORAGE_KEYS = {
  SESSION: 'painAssessment.session.state',
  METRICS: 'painAssessment.session.metrics',
};

const LANGUAGE_PACKS = {
  en: {
    locale: 'en',
    badge: 'AI-Guided Pain Assessment',
    heading: 'Advanced Pain Assessment',
    subheading:
      'Answer a few clinically informed questions so our AI physiotherapist can interpret your pain profile in real time.',
    progress: {
      initial: 'Step 1 of {total}',
      label: 'Step {current} of {total}',
      resumed: 'Session resumed',
      completed: 'Assessment complete',
    },
    meta: {
      timer: 'Session time • {value}',
      resumed: 'Continuing saved session',
      newSession: 'New session started',
    },
    actions: {
      next: 'Next insight',
      finish: 'View insights',
      skip: 'Skip',
      back: 'Back',
      autoDetect: 'Auto-detect from history',
    },
    ai: {
      assistant: 'Astra Physio AI',
      deepDive: 'Show clinical detail',
      hideDeepDive: 'Hide detail',
    },
    feedback: {
      prompt: 'Was this guidance helpful?',
      helpful: 'Helpful',
      notHelpful: 'Not Helpful',
    },
    metrics: {
      title: 'Live rehab intelligence',
      painIndex: 'Pain index',
      confidence: 'Recovery confidence',
      risk: 'Risk band',
      chartLabels: ['Now', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 6'],
      chartTitle: 'Projected recovery (%)',
    },
    insights: {
      summaryTitle: 'AI Summary',
      summaryPlaceholder: 'Complete the workflow to see your personalised summary.',
      diagnosisTitle: 'Probable pattern',
      diagnosisPlaceholder: 'We will outline likely pain patterns once we have more data.',
      planTitle: 'Recommended actions',
      planPlaceholder: 'Therapy suggestions will appear here.',
      timelineTitle: 'Recovery timeline',
      timelinePlaceholder: 'Your projected timeline will populate after the AI review.',
      disclaimer:
        'The following insights are educational and do not replace medical diagnosis. Please consult a licensed clinician for individual care.',
    },
    completion: {
      title: 'Assessment complete',
      subtitle: 'Hold tight while we translate your responses into clinical insights.',
    },
    languages: [
      { code: 'en', label: 'EN' },
      { code: 'hi', label: 'हिन्दी' },
      { code: 'mr', label: 'मराठी' },
    ],
    questions: {
      region: {
        title: 'Where are you feeling discomfort?',
        subtitle: 'Select up to two regions that feel most irritated today.',
      },
      intensity: {
        title: 'How intense is the pain right now?',
        subtitle: '0 = calm, 10 = unbearable. Slide to the level that best represents your current intensity.',
      },
      duration: {
        title: 'How long has this discomfort persisted?',
        subtitle: 'Understanding duration helps the AI balance acute vs. chronic patterns.',
      },
      painQuality: {
        title: 'Which description fits the pain quality?',
        subtitle: 'Pick the closest match so the AI can classify the tissue response.',
      },
      symptoms: {
        title: 'Any other symptoms accompanying the pain?',
        subtitle: 'Select up to three signs you have noticed recently.',
      },
      lifestyle: {
        title: 'Lifestyle or daily habits influencing the pain?',
        subtitle: 'Choose all that apply. These help estimate recovery velocity.',
      },
      sleep: {
        title: 'How are you sleeping lately?',
        subtitle: 'Poor sleep can slow down healing. Let us know your recent trend.',
      },
      mobility: {
        title: 'Mobility impact check',
        subtitle: 'How much is movement limited during daily tasks?',
      },
    },
    options: {
      regions: {
        neck: 'Neck & shoulders',
        mid_back: 'Mid-back',
        lower_back: 'Lower back & sacrum',
        hip: 'Hip & pelvis',
        knee: 'Knee & leg',
        ankle: 'Ankle & foot',
        shoulder: 'Shoulder & arm',
        general: 'your kinetic chain',
      },
      duration: {
        acute: '< 2 weeks',
        subacute: '2-6 weeks',
        chronic: '6-12 weeks',
        persistent: '> 3 months',
        default: 'moderate duration',
      },
      painQuality: {
        sharp: 'Sharp / stabbing',
        dull: 'Dull / heavy ache',
        burning: 'Burning / electric',
        throbbing: 'Pulsating / throbbing',
      },
      symptoms: {
        stiffness: 'Morning stiffness',
        tingling: 'Tingling or numbness',
        swelling: 'Swelling or inflammation',
        weakness: 'Muscle weakness',
        headaches: 'Headaches or migraines',
        clicking: 'Joint clicking',
      },
      lifestyle: {
        desk: 'Desk work / long sitting',
        lifting: 'Heavy lifting',
        sports: 'High-impact sports',
        stress: 'High stress levels',
        hydration: 'Low hydration',
        sleep: 'Irregular sleep schedule',
      },
      sleep: {
        excellent: 'Excellent (7-8 hrs uninterrupted)',
        good: 'Good (6-7 hrs, minor disturbances)',
        fair: 'Fair (5-6 hrs, broken sleep)',
        poor: 'Poor (<5 hrs, restless)',
      },
      mobility: {
        free: 'Full range, no limitation',
        mild: 'Mild stiffness with activity',
        moderate: 'Noticeable restriction daily',
        severe: 'Severe limitation, needs support',
      },
    },
  },
  hi: {
    locale: 'hi',
    badge: 'एआई निर्देशित दर्द मूल्यांकन',
    heading: 'उन्नत दर्द आकलन',
    subheading:
      'कुछ नैदानिक प्रश्नों का उत्तर दें ताकि हमारा एआई फिजियोथेरेपिस्ट आपके दर्द प्रोफ़ाइल का वास्तविक समय में विश्लेषण कर सके।',
    progress: {
      initial: 'चरण 1 / {total}',
      label: 'चरण {current} / {total}',
      resumed: 'सेशन पुनः शुरू',
      completed: 'आकलन पूर्ण',
    },
    meta: {
      timer: 'सेशन समय • {value}',
      resumed: 'सहेजा हुआ सेशन जारी',
      newSession: 'नया सेशन',
    },
    actions: {
      next: 'अगला चरण',
      finish: 'इनसाइट देखें',
      skip: 'छोड़ें',
      back: 'वापस',
      autoDetect: 'इतिहास से अनुमान',
    },
    ai: {
      assistant: 'एस्ट्रा फिजियो एआई',
      deepDive: 'क्लिनिकल विवरण देखें',
      hideDeepDive: 'विवरण छिपाएँ',
    },
    feedback: {
      prompt: 'क्या यह मार्गदर्शन सहायक था?',
      helpful: 'सहायक',
      notHelpful: 'सहायक नहीं',
    },
    metrics: {
      title: 'लाइव रिहैब इंटेलिजेंस',
      painIndex: 'दर्द सूचकांक',
      confidence: 'रिकवरी भरोसा',
      risk: 'जोखिम स्तर',
      chartLabels: ['अभी', 'सप्ताह 1', 'सप्ताह 2', 'सप्ताह 3', 'सप्ताह 4', 'सप्ताह 6'],
      chartTitle: 'अनुमानित रिकवरी (%)',
    },
    insights: {
      summaryTitle: 'एआई सारांश',
      summaryPlaceholder: 'व्यक्तिगत सारांश देखने के लिए आकलन पूरा करें।',
      diagnosisTitle: 'संभावित पैटर्न',
      diagnosisPlaceholder: 'जैसे ही हम और डेटा पाएंगे, संभावित कारण साझा करेंगे।',
      planTitle: 'अनुशंसित क्रियाएँ',
      planPlaceholder: 'थेरैपी सुझाव यहाँ दिखाई देंगे।',
      timelineTitle: 'रिकवरी टाइमलाइन',
      timelinePlaceholder: 'एआई समीक्षा के बाद समयरेखा दिखाई देगी।',
      disclaimer: 'यह जानकारी शैक्षिक है और चिकित्सीय निदान का स्थान नहीं लेती। कृपया विशेषज्ञ से सलाह लें।',
    },
    completion: {
      title: 'आकलन पूरा हुआ',
      subtitle: 'आपके उत्तरों पर आधारित एआई इनसाइट तैयार की जा रही है।',
    },
    languages: [
      { code: 'en', label: 'EN' },
      { code: 'hi', label: 'हिन्दी' },
      { code: 'mr', label: 'मराठी' },
    ],
    questions: {
      region: {
        title: 'कौन-से हिस्से में दर्द है?',
        subtitle: 'आज सबसे ज़्यादा प्रभावित दो क्षेत्रों तक चुनें।',
      },
      intensity: {
        title: 'दर्द की तीव्रता कितनी है?',
        subtitle: '0 = आराम, 10 = असहनीय। स्लाइडर को सही स्तर पर रखें।',
      },
      duration: {
        title: 'यह असुविधा कब से चल रही है?',
        subtitle: 'अवधि समझने से एआई को तीव्र/दीर्घकालिक अंतर समझने में मदद मिलती है।',
      },
      painQuality: {
        title: 'दर्द का स्वरूप कैसा है?',
        subtitle: 'सबसे नज़दीकी विवरण चुनें ताकि एआई ऊतक प्रतिक्रिया समझ सके।',
      },
      symptoms: {
        title: 'क्या अन्य लक्षण भी हैं?',
        subtitle: 'तीन तक संकेत चुनें जो आपने महसूस किए हैं।',
      },
      lifestyle: {
        title: 'जीवनशैली की कौन-सी आदतें असर डाल रही हैं?',
        subtitle: 'सभी लागू विकल्प चुनें।',
      },
      sleep: {
        title: 'हाल में नींद कैसी रही?',
        subtitle: 'कमजोर नींद रिकवरी को धीमा कर सकती है।',
      },
      mobility: {
        title: 'गतिशीलता पर असर',
        subtitle: 'रोज़मर्रा के कार्यों में कितनी बाधा है?',
      },
    },
    options: {
      regions: {
        neck: 'गर्दन और कंधे',
        mid_back: 'मध्य पीठ',
        lower_back: 'निचली पीठ व सैक्रम',
        hip: 'हिप व पेल्विस',
        knee: 'घुटना व पैर',
        ankle: 'टखना व पंजा',
        shoulder: 'कंधा व भुजा',
        general: 'आपकी गतिशील श्रृंखला',
      },
      duration: {
        acute: '2 सप्ताह से कम',
        subacute: '2-6 सप्ताह',
        chronic: '6-12 सप्ताह',
        persistent: '3 माह से अधिक',
        default: 'मध्यम अवधि',
      },
      painQuality: {
        sharp: 'तीखा / चुभन',
        dull: 'भारी / सुन्न दर्द',
        burning: 'जलन / बिजली जैसा',
        throbbing: 'धड़कता / धड़कन',
      },
      symptoms: {
        stiffness: 'सुबह अकड़न',
        tingling: 'झुनझुनी या सुन्नपन',
        swelling: 'सूजन या सूजन',
        weakness: 'मांसपेशी कमजोरी',
        headaches: 'सिरदर्द / माइग्रेन',
        clicking: 'जोड़ों में आवाज़',
      },
      lifestyle: {
        desk: 'डेस्क जॉब / बैठना',
        lifting: 'भारी वजन उठाना',
        sports: 'हाई-इम्पैक्ट खेल',
        stress: 'उच्च तनाव',
        hydration: 'कम पानी पीना',
        sleep: 'अनियमित नींद',
      },
      sleep: {
        excellent: 'उत्कृष्ट (7-8 घं.)',
        good: 'अच्छी (6-7 घं.)',
        fair: 'औसत (5-6 घं.)',
        poor: 'कमज़ोर (<5 घं.)',
      },
      mobility: {
        free: 'पूर्ण गति, कोई बाधा नहीं',
        mild: 'हल्की जकड़न',
        moderate: 'दैनिक गतिविधि में कठिनाई',
        severe: 'गंभीर बाधा, सहारे की ज़रूरत',
      },
    },
  },
  mr: {
    locale: 'mr',
    badge: 'एआय मार्गदर्शित वेदना मूल्यांकन',
    heading: 'प्रगत वेदना विश्लेषण',
    subheading:
      'काही नैदानिक प्रश्नांची उत्तरे द्या म्हणजे आमचा एआय फिजिओथेरपिस्ट तुमच्या वेदनेचे प्रोफाइल त्वरित समजू शकेल.',
    progress: {
      initial: 'पायरी 1 / {total}',
      label: 'पायरी {current} / {total}',
      resumed: 'सेशन पुन्हा सुरु',
      completed: 'मूल्यांकन पूर्ण',
    },
    meta: {
      timer: 'सेशन वेळ • {value}',
      resumed: 'जतन केलेले सेशन सुरु आहे',
      newSession: 'नवीन सेशन',
    },
    actions: {
      next: 'पुढे',
      finish: 'इनसाइट पहा',
      skip: 'वगळा',
      back: 'मागे',
      autoDetect: 'इतिहासातून अंदाज',
    },
    ai: {
      assistant: 'अस्त्रा फिजिओ एआय',
      deepDive: 'क्लिनिकल तपशील दाखवा',
      hideDeepDive: 'तपशील लपवा',
    },
    feedback: {
      prompt: 'हे मार्गदर्शन उपयुक्त होते का?',
      helpful: 'उपयुक्त',
      notHelpful: 'उपयुक्त नाही',
    },
    metrics: {
      title: 'थेट पुनर्वसन विश्लेषण',
      painIndex: 'वेदना निर्देशांक',
      confidence: 'रिकव्हरी आत्मविश्वास',
      risk: 'जोखमीची पातळी',
      chartLabels: ['आत्ता', 'आठवडा 1', 'आठवडा 2', 'आठवडा 3', 'आठवडा 4', 'आठवडा 6'],
      chartTitle: 'अनुमानित रिकव्हरी (%)',
    },
    insights: {
      summaryTitle: 'एआय सारांश',
      summaryPlaceholder: 'व्यक्तिगत सारांशासाठी मूल्यांकन पूर्ण करा.',
      diagnosisTitle: 'संभाव्य नमुना',
      diagnosisPlaceholder: 'अधिक डेटा मिळाल्यावर संभाव्य कारण दर्शवू.',
      planTitle: 'सुचवलेली कृती',
      planPlaceholder: 'थेरपी सूचना येथे दिसतील.',
      timelineTitle: 'रिकव्हरी टाइमलाइन',
      timelinePlaceholder: 'एआय विश्लेषणानंतर टाइमलाइन दिसेल.',
      disclaimer: 'ही माहिती शैक्षणिक असून वैद्यकीय निदानाची जागा घेत नाही. कृपया तज्ञांचा सल्ला घ्या.',
    },
    completion: {
      title: 'मूल्यांकन पूर्ण',
      subtitle: 'तुमच्या उत्तरांवर आधारित एआय इनसाइट तयार होत आहे.',
    },
    languages: [
      { code: 'en', label: 'EN' },
      { code: 'hi', label: 'हिन्दी' },
      { code: 'mr', label: 'मराठी' },
    ],
    questions: {
      region: {
        title: 'दुखणे कोणत्या भागात आहे?',
        subtitle: 'आज सर्वाधिक त्रासदायक दोन भाग निवडा.',
      },
      intensity: {
        title: 'सध्या वेदना किती तीव्र आहे?',
        subtitle: '0 = आराम, 10 = असह्य. योग्य पातळीवर स्लायडर सेट करा.',
      },
      duration: {
        title: 'ही अस्वस्थता किती काळापासून आहे?',
        subtitle: 'कालावधी समजल्याने तीव्र व दीर्घकालीन वेदनांमध्ये फरक ओळखता येतो.',
      },
      painQuality: {
        title: 'वेदनेचा प्रकार कसा आहे?',
        subtitle: 'सर्वात जवळची व्याख्या निवडा.',
      },
      symptoms: {
        title: 'इतर कोणती लक्षणे आहेत?',
        subtitle: 'जास्तीत जास्त तीन लक्षणे निवडा.',
      },
      lifestyle: {
        title: 'जीवनशैलीतील कोणत्या सवयी परिणाम करत आहेत?',
        subtitle: 'लागू असलेले सर्व पर्याय निवडा.',
      },
      sleep: {
        title: 'अलीकडे झोप कशी आहे?',
        subtitle: 'कमकुवत झोप बरे होण्यास वेळ लावू शकते.',
      },
      mobility: {
        title: 'हालचालीवर परिणाम',
        subtitle: 'दररोजच्या कामांमध्ये किती मर्यादा येतात?',
      },
    },
    options: {
      regions: {
        neck: 'मान आणि खांदे',
        mid_back: 'मध्य पाठीचा भाग',
        lower_back: 'कंबर व सॅक्रम',
        hip: 'हिप व पेल्विस',
        knee: 'गुडघा व पाय',
        ankle: 'घोटा व पंजा',
        shoulder: 'खांदा व हात',
        general: 'तुमची स्नायूंची साखळी',
      },
      duration: {
        acute: '2 आठवड्यांपेक्षा कमी',
        subacute: '2-6 आठवडे',
        chronic: '6-12 आठवडे',
        persistent: '3 महिन्यांपेक्षा जास्त',
        default: 'मध्यम कालावधी',
      },
      painQuality: {
        sharp: 'तीक्ष्ण / भोसकणारी',
        dull: 'बोथट / जड वेदना',
        burning: 'जळजळ / वीजेसारखी',
        throbbing: 'धडधडणारी',
      },
      symptoms: {
        stiffness: 'सकाळी कडकपणा',
        tingling: 'सुन्नपणा किंवा झिणझिण्या',
        swelling: 'सुज किंवा दाह',
        weakness: 'स्नायू दुर्बलता',
        headaches: 'डोकेदुखी / माइग्रेन',
        clicking: 'सांध्यात आवाज',
      },
      lifestyle: {
        desk: 'डेस्क जॉब / बसणे',
        lifting: 'जड वजन उचलणे',
        sports: 'हाय-इम्पॅक्ट खेळ',
        stress: 'जास्त ताण',
        hydration: 'कमी पाणी पिणे',
        sleep: 'अनियमित झोप',
      },
      sleep: {
        excellent: 'उत्कृष्ट (7-8 तास)',
        good: 'चांगली (6-7 तास)',
        fair: 'मध्यम (5-6 तास)',
        poor: 'कमजोर (<5 तास)',
      },
      mobility: {
        free: 'पूर्ण हालचाल, अडथळा नाही',
        mild: 'हलकी कडकपणा',
        moderate: 'दररोज मर्यादा जाणवते',
        severe: 'गंभीर मर्यादा, सहाय्याची गरज',
      },
    },
  },
};

const QUESTION_FLOW = [
  { id: 'region', type: 'multi', optionGroup: 'regions', max: 2, optional: false },
  { id: 'intensity', type: 'slider', min: 0, max: 10, step: 1 },
  { id: 'duration', type: 'single', optionGroup: 'duration' },
  { id: 'painQuality', type: 'single', optionGroup: 'painQuality' },
  { id: 'symptoms', type: 'multi', optionGroup: 'symptoms', max: 3, optional: true },
  { id: 'lifestyle', type: 'multi', optionGroup: 'lifestyle', max: 3, optional: true },
  {
    id: 'sleep',
    type: 'single',
    optionGroup: 'sleep',
    condition: (state) => (state.responses.intensity ?? 0) >= 6,
  },
  {
    id: 'mobility',
    type: 'single',
    optionGroup: 'mobility',
    condition: (state) => {
      const regions = state.responses.region || [];
      return regions.includes('hip') || regions.includes('knee') || regions.includes('ankle');
    },
    optional: true,
  },
];

const DEFAULT_OPTIONS = {
  containerId: 'pain-assessment',
  language: 'en',
  theme: 'dark',
  openAIKey: null,
};

export class PainAssessmentAI {
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.language = this.options.language;
    this.session = this.createEmptySession();
    this.copy = this.getCopy(this.language);
    this.ui = null;
    this.ai = new AIEngine({ openAIKey: this.options.openAIKey });
    this.timerInterval = null;
    this.resumeLoaded = false;
    this.cachedInsights = null;
  }

  createEmptySession() {
    return {
      responses: {},
      order: [],
      stepIndex: 0,
      startedAt: Date.now(),
      completed: false,
    };
  }

  init() {
    const root = document.getElementById(this.options.containerId);
    if (!root) {
      throw new Error(`PainAssessmentAI: container #${this.options.containerId} not found`);
    }

    this.restoreSession();

    this.ui = new PainAssessmentUI({
      root,
      onLanguageChange: (code) => this.handleLanguageChange(code),
      theme: this.options.theme,
    });

    this.ui.mountShell(this.copy);
    this.ui.registerFeedbackHandler((type) => this.handleFeedback(type));

    this.startTimer();
    this.renderCurrentQuestion();
    if (this.resumeLoaded) {
      this.ui.setResumeState(this.copy.progress.resumed);
    }
  }

  getCopy(language) {
    const pack = LANGUAGE_PACKS[language] || LANGUAGE_PACKS.en;
    return {
      ...pack,
      languages: [...LANGUAGE_PACKS.en.languages],
      locale: pack.locale,
      badge: pack.badge,
      heading: pack.heading,
      subheading: pack.subheading,
      progress: { ...pack.progress },
      meta: { ...pack.meta },
      actions: { ...pack.actions },
      ai: { ...pack.ai },
      feedback: { ...pack.feedback },
      metrics: { ...pack.metrics },
      insights: { ...pack.insights },
      completion: { ...pack.completion },
      questions: { ...pack.questions },
      options: { ...pack.options },
    };
  }

  restoreSession() {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.responses) {
        this.session = { ...this.createEmptySession(), ...data };
        this.language = data.language || this.language;
        this.copy = this.getCopy(this.language);
        this.resumeLoaded = true;
      }
    } catch (error) {
      console.warn('[PainAssessment][session] unable to restore session', error);
    }
  }

  persistSession() {
    if (typeof window === 'undefined') return;
    try {
      const payload = { ...this.session, language: this.language };
      window.localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(payload));
    } catch (error) {
      console.warn('[PainAssessment][session] unable to persist session', error);
    }
  }

  clearSessionStorage() {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (error) {
      console.warn('[PainAssessment][session] unable to clear session', error);
    }
  }

  startTimer() {
    const update = () => {
      const elapsed = Date.now() - this.session.startedAt;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000)
        .toString()
        .padStart(2, '0');
      const formatted = `${minutes}:${seconds}`;
      const text = this.copy.meta.timer.replace('{value}', formatted);
      this.ui.updateTimer(text);
    };

    update();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(update, 1000);
  }

  getOrderedQuestions() {
    return QUESTION_FLOW.filter((question) => {
      if (typeof question.condition === 'function') {
        return question.condition(this.session);
      }
      return true;
    });
  }

  renderCurrentQuestion() {
    const questions = this.getOrderedQuestions();
    const total = questions.length;

    if (this.session.stepIndex >= total) {
      this.finaliseAssessment();
      return;
    }

    const question = questions[this.session.stepIndex];
    const response = this.session.responses[question.id];

    const progressText = this.copy.progress.label
      .replace('{current}', this.session.stepIndex + 1)
      .replace('{total}', total);

    this.ui.updateProgress({ text: progressText, percent: ((this.session.stepIndex) / total) * 100 });

    const questionCopy = this.copy.questions[question.id];
    const title = questionCopy?.title || '';
    const subtitle = questionCopy?.subtitle || '';

    let submitLabel = this.copy.actions.next;
    if (this.session.stepIndex === total - 1) {
      submitLabel = this.copy.actions.finish;
    }

    const builder = this.getContentBuilder(question, response);
    const canSubmit = this.canSubmit(question, response);

    this.pendingAnswer = Array.isArray(response) ? [...response] : response;

    this.ui.updateQuestion({
      title,
      subtitle,
      contentBuilder: builder,
      submitLabel,
      canSubmit,
      showSkip: question.optional ?? false,
      showBack: this.session.stepIndex > 0,
      skipLabel: this.copy.actions.skip,
      backLabel: this.copy.actions.back,
    });

    this.ui.bindQuestionHandlers({
      onSubmit: () => this.handleSubmit(question),
      onSkip: () => this.skipQuestion(question),
      onBack: () => this.goBack(),
    });
  }

  getContentBuilder(question, response) {
    switch (question.type) {
      case 'multi':
        return () => this.buildMultiSelect(question, response);
      case 'single':
        return () => this.buildSingleSelect(question, response);
      case 'slider':
        return () => this.buildSlider(question, response);
      default:
        return () => document.createElement('div');
    }
  }

  canSubmit(question, response) {
    if (question.optional) return true;
    if (question.type === 'multi') {
      return Array.isArray(response) && response.length > 0;
    }
    if (question.type === 'slider') {
      return typeof response === 'number';
    }
    return Boolean(response);
  }

  buildMultiSelect(question, response) {
    const container = document.createElement('div');
    container.className = 'option-grid';
    const selected = new Set(response || []);
    const options = this.copy.options[question.optionGroup] || {};

    Object.entries(options).forEach(([value, label]) => {
      const chip = document.createElement('label');
      chip.className = 'option-chip';
      if (selected.has(value)) {
        chip.classList.add('active');
      }
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = value;
      input.checked = selected.has(value);
      const strong = document.createElement('strong');
      strong.textContent = label;
      const span = document.createElement('span');
      span.textContent = '';
      chip.appendChild(input);
      const wrapper = document.createElement('div');
      wrapper.append(strong, span);
      chip.appendChild(wrapper);

      chip.addEventListener('click', (event) => {
        event.preventDefault();
        if (selected.has(value)) {
          selected.delete(value);
        } else {
          if (question.max && selected.size >= question.max) {
            selected.delete(Array.from(selected)[0]);
          }
          selected.add(value);
        }
        input.checked = selected.has(value);
        chip.classList.toggle('active', selected.has(value));
        this.pendingAnswer = Array.from(selected);
        this.ui.setSubmitEnabled(this.canSubmit(question, this.pendingAnswer));
      });

      container.appendChild(chip);
    });

    this.pendingAnswer = Array.from(selected);
    this.ui.setSubmitEnabled(this.canSubmit(question, this.pendingAnswer));
    return container;
  }

  buildSingleSelect(question, response) {
    const container = document.createElement('div');
    container.className = 'option-grid';
    const current = response;
    const options = this.copy.options[question.optionGroup] || {};

    Object.entries(options).forEach(([value, label]) => {
      const chip = document.createElement('label');
      chip.className = 'option-chip';
      if (current === value) {
        chip.classList.add('active');
      }
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = question.id;
      input.value = value;
      input.checked = current === value;
      const strong = document.createElement('strong');
      strong.textContent = label;
      const span = document.createElement('span');
      span.textContent = '';
      chip.appendChild(input);
      const wrapper = document.createElement('div');
      wrapper.append(strong, span);
      chip.appendChild(wrapper);

      chip.addEventListener('click', (event) => {
        event.preventDefault();
        this.pendingAnswer = value;
        Array.from(container.children).forEach((child) => child.classList.remove('active'));
        chip.classList.add('active');
        this.ui.setSubmitEnabled(true);
      });

      container.appendChild(chip);
    });

    this.pendingAnswer = current;
    this.ui.setSubmitEnabled(this.canSubmit(question, this.pendingAnswer));
    return container;
  }

  buildSlider(question, response) {
    const container = document.createElement('div');
    container.className = 'slider-field';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = question.min ?? 0;
    slider.max = question.max ?? 10;
    slider.step = question.step ?? 1;
    slider.value = typeof response === 'number' ? response : Math.round((slider.max - slider.min) / 2);

    const valueRow = document.createElement('div');
    valueRow.className = 'slider-value';
    const label = document.createElement('span');
    label.textContent = `${slider.value}/10`;
    const detectButton = document.createElement('button');
    detectButton.type = 'button';
    detectButton.className = 'secondary';
    detectButton.textContent = this.copy.actions.autoDetect;

    detectButton.addEventListener('click', () => {
      const inferred = this.inferIntensityFromHistory();
      slider.value = inferred;
      label.textContent = `${inferred}/10`;
      this.pendingAnswer = Number(inferred);
      this.ui.setSubmitEnabled(true);
    });

    slider.addEventListener('input', () => {
      label.textContent = `${slider.value}/10`;
      this.pendingAnswer = Number(slider.value);
      this.ui.setSubmitEnabled(true);
    });

    valueRow.append(label, detectButton);
    container.append(valueRow, slider);

    this.pendingAnswer = Number(slider.value);
    this.ui.setSubmitEnabled(true);
    return container;
  }

  inferIntensityFromHistory() {
    if (typeof window === 'undefined') return 5;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.METRICS);
      if (!raw) return 6;
      const history = JSON.parse(raw);
      if (!Array.isArray(history) || !history.length) return 6;
      const recent = history[history.length - 1];
      if (!recent || typeof recent !== 'object') return 6;
      const inferred = recent.metrics?.painIndex ?? recent.painIndex;
      if (typeof inferred !== 'number') return 6;
      return Math.max(1, Math.min(10, Math.round(inferred / 10)));
    } catch (error) {
      console.warn('[PainAssessment][metrics] unable to infer intensity', error);
      return 6;
    }
  }

  handleSubmit(question) {
    const value = this.pendingAnswer;
    if (!this.canSubmit(question, value)) {
      return;
    }

    this.session.responses[question.id] = value;
    if (!this.session.order.includes(question.id)) {
      this.session.order.push(question.id);
    }
    this.session.stepIndex += 1;

    this.persistSession();
    this.renderCurrentQuestion();
  }

  skipQuestion(question) {
    this.session.responses[question.id] = null;
    this.session.stepIndex += 1;
    this.persistSession();
    this.renderCurrentQuestion();
  }

  goBack() {
    if (this.session.stepIndex === 0) return;
    this.session.stepIndex -= 1;
    this.persistSession();
    this.renderCurrentQuestion();
  }

  async finaliseAssessment() {
    if (this.session.completed && this.cachedInsights) {
      this.displayInsights(this.cachedInsights);
      return;
    }

    this.session.completed = true;
    this.persistSession();

    this.ui.updateQuestion({
      title: this.copy.completion.title,
      subtitle: this.copy.completion.subtitle,
      contentBuilder: () => document.createElement('div'),
      submitLabel: this.copy.actions.finish,
      canSubmit: false,
      showSkip: false,
      showBack: false,
      skipLabel: this.copy.actions.skip,
      backLabel: this.copy.actions.back,
    });

    this.ui.updateProgress({
      text: this.copy.progress.completed,
      percent: 100,
    });

    this.ui.showTypingIndicator(true);

    const context = {
      labels: this.copy.options,
    };

    try {
      const insights = await this.ai.generateInsights(this.session, this.language, context);
      this.cachedInsights = insights;
      this.displayInsights(insights);
      this.logSessionMetrics(insights.metrics);
    } catch (error) {
      console.error('[PainAssessment][ai] unable to generate insights', error);
      this.ui.showTypingIndicator(false);
    } finally {
      this.clearSessionStorage();
      this.ui.setResumeState('');
    }
  }

  displayInsights(insights) {
    if (!insights) return;
    const copy = this.copy;
    this.ui.animateAIResponse(insights.summary, insights.deepDive, copy);
    this.ui.updateInsights(insights, copy);
  }

  async handleLanguageChange(language) {
    this.language = language;
    this.copy = this.getCopy(language);
    this.ui.refreshStaticCopy(this.copy);
    this.startTimer();
    this.renderCurrentQuestion();

    if (this.session.completed) {
      this.ui.showTypingIndicator(true);
      const insights = await this.ai.generateInsights(this.session, language, {
        labels: this.copy.options,
      });
      this.cachedInsights = insights;
      this.displayInsights(insights);
      this.ui.showTypingIndicator(false);
    }
  }

  handleFeedback(type) {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.METRICS);
      const history = raw ? JSON.parse(raw) : [];
      history.push({
        timestamp: Date.now(),
        feedback: type,
        language: this.language,
      });
      window.localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(history));
    } catch (error) {
      console.warn('[PainAssessment][feedback] unable to log feedback', error);
    }
  }

  logSessionMetrics(metrics) {
    if (typeof window === 'undefined' || !metrics) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.METRICS);
      const history = raw ? JSON.parse(raw) : [];
      const duration = Date.now() - this.session.startedAt;
      const regions = this.session.responses.region || [];
      history.push({
        timestamp: Date.now(),
        duration,
        regions,
        intensity: this.session.responses.intensity,
        metrics,
      });
      window.localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(history));
      console.table({ durationSeconds: Math.round(duration / 1000), regions: regions.join(', '), intensity: this.session.responses.intensity });
    } catch (error) {
      console.warn('[PainAssessment][metrics] unable to persist metrics', error);
    }
  }
}
