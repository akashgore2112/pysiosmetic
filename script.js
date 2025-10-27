window.addEventListener('load', () => {
  const mount = document.getElementById('pain-assessment');
  if (!mount) return;

  const template = `
    <section class="pain-assessment-section">
      <div class="assessment-shell">
        <header class="assessment-header">
          <div class="header-left">
            <span class="badge" data-i18n="badge">AI GUIDED MODULE</span>
            <h1 data-i18n="title">Advanced Pain Assessment</h1>
            <p data-i18n="subtitle">Follow the guided experience to map your discomfort, understand possible causes, and receive recovery recommendations powered by our physiotherapy AI.</p>
          </div>
          <div class="header-right">
            <div class="lang-switch" role="group" aria-label="Language switcher">
              <button type="button" class="lang-btn active" data-lang="en">EN</button>
              <button type="button" class="lang-btn" data-lang="hi">हिन्दी</button>
              <button type="button" class="lang-btn" data-lang="rg">Regional</button>
            </div>
          </div>
        </header>

        <div class="progress-track">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-steps">
            <span class="progress-dot active" data-step="0"></span>
            <span class="progress-dot" data-step="1"></span>
            <span class="progress-dot" data-step="2"></span>
          </div>
        </div>

        <div class="assessment-grid">
          <div class="interaction-stack">
            <article class="question-card" data-step="0">
              <h2 data-i18n="step1Title">Where is your pain most noticeable?</h2>
              <p data-i18n="step1Description">Select the region that best represents your current discomfort. The AI heatmap will adapt instantly.</p>
              <div class="region-grid">
                <button class="region-button" data-region="neck">
                  <strong data-i18n="region-neck-title">Neck & Upper Spine</strong>
                  <span data-i18n="region-neck-desc">Tension, stiffness, postural strain</span>
                </button>
                <button class="region-button" data-region="shoulder">
                  <strong data-i18n="region-shoulder-title">Shoulder Complex</strong>
                  <span data-i18n="region-shoulder-desc">Rotator cuff, impingement, soreness</span>
                </button>
                <button class="region-button" data-region="lower_back">
                  <strong data-i18n="region-lower_back-title">Lower Back</strong>
                  <span data-i18n="region-lower_back-desc">Lumbar tightness, nerve irritation</span>
                </button>
                <button class="region-button" data-region="knee">
                  <strong data-i18n="region-knee-title">Knee & Mobility</strong>
                  <span data-i18n="region-knee-desc">Ligament strain, instability, swelling</span>
                </button>
              </div>
            </article>

            <article class="question-card" data-step="1" hidden>
              <h2 data-i18n="step2Title">How intense and what type of pain are you feeling?</h2>
              <p data-i18n="step2Description">Adjust the slider and choose the sensation that best describes your experience today.</p>
              <div class="slider-row">
                <label for="pain-intensity" data-i18n="intensityLabel">Intensity</label>
                <input id="pain-intensity" type="range" min="1" max="10" value="4" />
                <output id="intensity-output">4</output>
              </div>
              <label for="pain-type" data-i18n="painTypeLabel">Pain character</label>
              <select id="pain-type">
                <option value="sharp" data-i18n-option="painSharp">Sharp / stabbing</option>
                <option value="dull" data-i18n-option="painDull">Dull ache</option>
                <option value="throbbing" data-i18n-option="painThrobbing">Throbbing / pulsating</option>
                <option value="burning" data-i18n-option="painBurning">Burning / tingling</option>
              </select>
              <label for="pain-notes" data-i18n="notesLabel">Add any triggers or notes</label>
              <textarea id="pain-notes" data-i18n-placeholder="notesPlaceholder" placeholder="E.g. worse after desk work, improves with rest"></textarea>
            </article>

            <article class="question-card" data-step="2" hidden>
              <h2 data-i18n="step3Title">How long has this pain persisted?</h2>
              <p data-i18n="step3Description">Tell us about duration and your current recovery goals so we can tune the plan.</p>
              <label for="pain-duration" data-i18n="durationLabel">Duration</label>
              <select id="pain-duration">
                <option value="0-2" data-i18n-option="durationShort">0 - 2 weeks</option>
                <option value="2-6" data-i18n-option="durationMid">2 - 6 weeks</option>
                <option value="6-12" data-i18n-option="durationLong">6 - 12 weeks</option>
                <option value="12+" data-i18n-option="durationChronic">12+ weeks</option>
              </select>
              <p data-i18n="goalPrompt">Select your recovery priorities</p>
              <div class="checkbox-grid">
                <label class="checkbox-tile">
                  <input type="checkbox" value="mobility" />
                  <span class="indicator">✓</span>
                  <span class="label" data-i18n="goalMobility">Regain mobility & strength</span>
                </label>
                <label class="checkbox-tile">
                  <input type="checkbox" value="stability" />
                  <span class="indicator">✓</span>
                  <span class="label" data-i18n="goalStability">Improve joint stability</span>
                </label>
                <label class="checkbox-tile">
                  <input type="checkbox" value="endurance" />
                  <span class="indicator">✓</span>
                  <span class="label" data-i18n="goalEndurance">Boost functional endurance</span>
                </label>
                <label class="checkbox-tile">
                  <input type="checkbox" value="relief" />
                  <span class="indicator">✓</span>
                  <span class="label" data-i18n="goalRelief">Sustain pain relief</span>
                </label>
              </div>
            </article>

            <div class="navigation-controls">
              <button type="button" class="prev-step" disabled data-i18n="backButton">Back</button>
              <button type="button" class="next-step" data-i18n="nextButton">Next Step</button>
            </div>
          </div>

          <aside class="insight-stack">
            <article class="visual-card">
              <h2 data-i18n="visualTitle">Your personalised pain map</h2>
              <div class="body-visual" data-region="" aria-live="polite">
                <img class="body-silhouette" src="https://cdn.jsdelivr.net/gh/physiosmetic/assets/spine-outline.svg" alt="Body silhouette" />
                <div class="heatmap-overlay"></div>
              </div>
              <div class="visual-legend">
                <span data-i18n="visualLegend">Heat intensity increases with reported pain levels</span>
                <span class="active-region" data-i18n="visualInactive">No region selected</span>
              </div>
            </article>

            <article class="insight-card" data-insight="cause">
              <h3><span class="icon">🧠</span><span data-i18n="causeTitle">Likely pain driver</span></h3>
              <p class="insight-text" data-i18n-dynamic="causeText">Select a body region to reveal possible clinical patterns.</p>
            </article>

            <article class="insight-card" data-insight="therapy">
              <h3><span class="icon">🤝</span><span data-i18n="therapyTitle">Suggested therapy focus</span></h3>
              <p class="insight-text" data-i18n-dynamic="therapyText">We'll outline a hands-on and active plan once inputs are complete.</p>
            </article>

            <article class="insight-card" data-insight="recovery">
              <h3><span class="icon">⏱️</span><span data-i18n="recoveryTitle">Estimated recovery outlook</span></h3>
              <div class="summary-panel">
                <p class="insight-text" data-i18n-dynamic="recoveryText">Share duration and goals to calculate a personalised timeline.</p>
                <div class="metrics-row">
                  <div class="metric-tile">
                    <span class="label" data-i18n="metricConfidence">Confidence score</span>
                    <span class="value" data-metric="confidence">--%</span>
                  </div>
                  <div class="metric-tile">
                    <span class="label" data-i18n="metricSessions">Suggested sessions</span>
                    <span class="value" data-metric="sessions">--</span>
                  </div>
                  <div class="metric-tile">
                    <span class="label" data-i18n="metricRecovery">Recovery window</span>
                    <span class="value" data-metric="window">--</span>
                  </div>
                </div>
                <button type="button" class="download-button" data-i18n="downloadButton">Download summary</button>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  `;

  mount.innerHTML = template;

  const translations = {
    en: {
      badge: 'AI Guided Module',
      title: 'Advanced Pain Assessment',
      subtitle: 'Follow the guided experience to map your discomfort, understand possible causes, and receive recovery recommendations powered by our physiotherapy AI.',
      step1Title: 'Where is your pain most noticeable?',
      step1Description: 'Select the region that best represents your current discomfort. The AI heatmap will adapt instantly.',
      step2Title: 'How intense and what type of pain are you feeling?',
      step2Description: 'Adjust the slider and choose the sensation that best describes your experience today.',
      step3Title: 'How long has this pain persisted?',
      step3Description: 'Tell us about duration and your current recovery goals so we can tune the plan.',
      intensityLabel: 'Intensity',
      painTypeLabel: 'Pain character',
      notesLabel: 'Add any triggers or notes',
      notesPlaceholder: 'E.g. worse after desk work, improves with rest',
      durationLabel: 'Duration',
      goalPrompt: 'Select your recovery priorities',
      goalMobility: 'Regain mobility & strength',
      goalStability: 'Improve joint stability',
      goalEndurance: 'Boost functional endurance',
      goalRelief: 'Sustain pain relief',
      backButton: 'Back',
      nextButton: 'Next Step',
      finishButton: 'Show results',
      visualTitle: 'Your personalised pain map',
      visualLegend: 'Heat intensity increases with reported pain levels',
      visualInactive: 'No region selected',
      causeTitle: 'Likely pain driver',
      therapyTitle: 'Suggested therapy focus',
      recoveryTitle: 'Estimated recovery outlook',
      causeText: 'Select a body region to reveal possible clinical patterns.',
      therapyText: 'We\'ll outline a hands-on and active plan once inputs are complete.',
      recoveryText: 'Share duration and goals to calculate a personalised timeline.',
      metricConfidence: 'Confidence score',
      metricSessions: 'Suggested sessions',
      metricRecovery: 'Recovery window',
      downloadButton: 'Download summary',
      regions: {
        neck: { title: 'Neck & Upper Spine', desc: 'Tension, stiffness, postural strain' },
        shoulder: { title: 'Shoulder Complex', desc: 'Rotator cuff, impingement, soreness' },
        lower_back: { title: 'Lower Back', desc: 'Lumbar tightness, nerve irritation' },
        knee: { title: 'Knee & Mobility', desc: 'Ligament strain, instability, swelling' }
      },
      painOptions: {
        sharp: 'Sharp / stabbing',
        dull: 'Dull ache',
        throbbing: 'Throbbing / pulsating',
        burning: 'Burning / tingling'
      },
      durationOptions: {
        '0-2': '0 - 2 weeks',
        '2-6': '2 - 6 weeks',
        '6-12': '6 - 12 weeks',
        '12+': '12+ weeks'
      },
      intensityLevels: {
        low: 'mild',
        medium: 'moderate',
        high: 'elevated'
      },
      durations: {
        short: 'short-term irritation',
        medium: 'sub-acute concern',
        long: 'long-standing pattern'
      },
      insights: {
        empty: 'Complete the steps to reveal targeted clinical guidance.',
        cause: {
          neck: 'Your reported pattern suggests cervical muscular guarding and potential nerve sensitisation from desk ergonomics.',
          shoulder: 'Symptoms align with shoulder complex overload—likely rotator cuff fatigue with scapular dyskinesis.',
          lower_back: 'Presentation points toward lumbar facet irritation with compensatory core inhibition.',
          knee: 'Findings indicate patellofemoral stress and surrounding soft tissue inflammation.'
        },
        therapy: {
          neck: 'Blend manual release with posture retraining, deep neck flexor activation, and ergonomic micro-breaks.',
          shoulder: 'Prioritise rotator cuff control, scapular setting drills, and gradual load exposure.',
          lower_back: 'Focus on lumbar decompression, core sequencing, and hip mobility restoration.',
          knee: 'Combine patellar tracking work, quadriceps strengthening, and controlled plyometrics.'
        },
        recovery: {
          acute: 'Expect meaningful relief within 2-3 weeks with structured physiotherapy and monitored load.',
          subacute: 'Plan for 4-6 weeks of progressive care with periodic reassessment.',
          chronic: 'Commit to an 8-12 week programme emphasising consistency, pacing, and long-term conditioning.'
        }
      },
      sessions: {
        light: '3-4 sessions',
        medium: '5-7 sessions',
        high: '8-10 sessions'
      },
      summaryTitle: 'Advanced Pain Assessment Summary',
      summaryIntro: 'AI-guided recommendations based on your inputs:'
    },
    hi: {
      badge: 'एआई निर्देशित मॉड्यूल',
      title: 'उन्नत दर्द मूल्यांकन',
      subtitle: 'अनुभव का अनुसरण करें और एआई से संचालित सुझावों के साथ अपनी तकलीफ का मानचित्र बनाएं।',
      step1Title: 'दर्द सबसे अधिक कहाँ महसूस होता है?',
      step1Description: 'उस क्षेत्र का चयन करें जो आपकी वर्तमान असुविधा को दर्शाता है। एआई हीटमैप तुरंत बदल जाएगा।',
      step2Title: 'दर्द की तीव्रता और प्रकार कैसा है?',
      step2Description: 'स्लाइडर समायोजित करें और वह अनुभूति चुनें जो आपके अनुभव को दर्शाती है।',
      step3Title: 'यह दर्द कितने समय से है?',
      step3Description: 'अवधि और अपने रिकवरी लक्ष्यों के बारे में बताएं ताकि योजना और सटीक बन सके।',
      intensityLabel: 'तीव्रता',
      painTypeLabel: 'दर्द का प्रकार',
      notesLabel: 'कोई ट्रिगर या नोट जोड़ें',
      notesPlaceholder: 'जैसे डेस्क वर्क के बाद बढ़ता है, आराम से कम होता है',
      durationLabel: 'अवधि',
      goalPrompt: 'अपनी रिकवरी प्राथमिकताएँ चुनें',
      goalMobility: 'गतिशीलता और शक्ति पुनः प्राप्त करें',
      goalStability: 'जोड़ों की स्थिरता बढ़ाएँ',
      goalEndurance: 'कार्यात्मक सहनशक्ति बढ़ाएँ',
      goalRelief: 'दर्द से राहत बनाए रखें',
      backButton: 'वापस',
      nextButton: 'अगला चरण',
      finishButton: 'परिणाम देखें',
      visualTitle: 'आपका व्यक्तिगत दर्द मानचित्र',
      visualLegend: 'रिपोर्ट की गई तीव्रता के साथ गर्मी बढ़ती है',
      visualInactive: 'कोई क्षेत्र चयनित नहीं',
      causeTitle: 'संभावित कारण',
      therapyTitle: 'उपचार फोकस',
      recoveryTitle: 'अनुमानित रिकवरी समय',
      causeText: 'क्लिनिकल पैटर्न देखने के लिए कोई क्षेत्र चुनें।',
      therapyText: 'इनपुट पूर्ण होते ही हम सक्रिय उपचार योजना बताएंगे।',
      recoveryText: 'व्यक्तिगत समयरेखा के लिए अवधि और लक्ष्य साझा करें।',
      metricConfidence: 'विश्वास स्कोर',
      metricSessions: 'सुझावित सत्र',
      metricRecovery: 'रिकवरी अवधि',
      downloadButton: 'सारांश डाउनलोड करें',
      regions: {
        neck: { title: 'गर्दन और ऊपरी रीढ़', desc: 'तनाव, अकड़न, पोस्टुरल स्ट्रेन' },
        shoulder: { title: 'कंधा कॉम्प्लेक्स', desc: 'रोटेटर कफ, इम्पिन्जमेंट, दर्द' },
        lower_back: { title: 'निचला कमर', desc: 'कसाव, नस की जलन' },
        knee: { title: 'घुटना और गतिशीलता', desc: 'लिगामेंट स्ट्रेन, अस्थिरता, सूजन' }
      },
      painOptions: {
        sharp: 'तेज़ / चुभता हुआ',
        dull: 'मंद दर्द',
        throbbing: 'धड़कता / स्पंदित',
        burning: 'जलन / झनझनाहट'
      },
      durationOptions: {
        '0-2': '0 - 2 सप्ताह',
        '2-6': '2 - 6 सप्ताह',
        '6-12': '6 - 12 सप्ताह',
        '12+': '12+ सप्ताह'
      },
      intensityLevels: {
        low: 'हल्का',
        medium: 'मध्यम',
        high: 'उच्च'
      },
      durations: {
        short: 'अल्पकालिक परेशानी',
        medium: 'मध्यम अवधि की चिंता',
        long: 'दीर्घकालिक पैटर्न'
      },
      insights: {
        empty: 'लक्षित मार्गदर्शन देखने के लिए सभी चरण पूरे करें।',
        cause: {
          neck: 'पैटर्न से पता चलता है कि गर्दन की मांसपेशियों में तनाव और डेस्क एर्गोनॉमिक्स से नस संवेदनशीलता हो सकती है।',
          shoulder: 'लक्षण कंधे पर अत्यधिक भार—संभावित रोटेटर कफ थकान और स्कैपुलर असंतुलन से मेल खाते हैं।',
          lower_back: 'संकेत लम्बर फेसट इरिटेशन और कोर मांसपेशियों की निष्क्रियता की ओर इशारा करते हैं।',
          knee: 'निष्कर्ष पाटेलो-फेमोरल तनाव और आसपास के मुलायम ऊतकों की सूजन दर्शाते हैं।'
        },
        therapy: {
          neck: 'मैनुअल रिलीज, मुद्रा प्रशिक्षण, और गहरे गर्दन फ्लेक्सर सक्रियण को शामिल करें।',
          shoulder: 'रोटेटर कफ नियंत्रण, स्कैपुलर सेटिंग ड्रिल, और क्रमिक लोड पर ध्यान दें।',
          lower_back: 'लम्बर डी-कम्प्रेशन, कोर अनुक्रमण, और कूल्हे की गतिशीलता पर फोकस करें।',
          knee: 'पैटेलर ट्रैकिंग, क्वाड स्ट्रेंथ, और नियंत्रित प्लायोमैट्रिक्स को मिलाएँ।'
        },
        recovery: {
          acute: 'संरचित फिजियोथेरेपी से 2-3 सप्ताह में राहत की अपेक्षा करें।',
          subacute: '4-6 सप्ताह की प्रगतिशील देखभाल और समय-समय पर पुनर्मूल्यांकन की योजना बनाएं।',
          chronic: '8-12 सप्ताह का सतत कार्यक्रम अपनाएँ जो निरंतरता और कंडीशनिंग पर जोर देता है।'
        }
      },
      sessions: {
        light: '3-4 सत्र',
        medium: '5-7 सत्र',
        high: '8-10 सत्र'
      },
      summaryTitle: 'उन्नत दर्द मूल्यांकन सारांश',
      summaryIntro: 'आपके इनपुट के आधार पर एआई सिफारिशें:'
    },
    rg: {
      badge: 'एडवांस्ड केयर मोड्युल',
      title: 'प्रगतिशील दर्द मूल्यांकन',
      subtitle: 'मार्गदर्शित चरणों से गुजरें और क्षेत्रीय भाषा में स्मार्ट फिजियो अंतर्दृष्टि प्राप्त करें।',
      step1Title: 'दर्द अधिकतम कुठे जाणवतो?',
      step1Description: 'तुमच्या त्रासाशी जुळणारा भाग निवडा. उष्णता नकाशा लगेच बदलतो.',
      step2Title: 'दुखण्याची तीव्रता आणि स्वरूप कसे आहे?',
      step2Description: 'स्लायडर हलवा आणि अनुभवाला सुसंगत पर्याय निवडा.',
      step3Title: 'हा त्रास किती काळापासून आहे?',
      step3Description: 'कालावधी आणि ध्येय सांगा म्हणजे कृती आराखडा अधिक नेमका होईल.',
      intensityLabel: 'तीव्रता',
      painTypeLabel: 'दुखण्याचा प्रकार',
      notesLabel: 'ट्रिगर किंवा टिपा लिहा',
      notesPlaceholder: 'उदा. दीर्घकाळ बसल्यानंतर वाढतो, विश्रांतीने कमी होतो',
      durationLabel: 'कालावधी',
      goalPrompt: 'रिकव्हरी ध्येय निवडा',
      goalMobility: 'गतिशीलता आणि शक्ती परत मिळवा',
      goalStability: 'सांध्यांची स्थिरता वाढवा',
      goalEndurance: 'कार्यात्मक सहनशक्ती सुधारवा',
      goalRelief: 'दुखणातून दीर्घ आराम',
      backButton: 'मागे',
      nextButton: 'पुढील चरण',
      finishButton: 'निकाल पहा',
      visualTitle: 'तुमचा वैयक्तिक वेदना नकाशा',
      visualLegend: 'नमूद केलेल्या तीव्रतेनुसार उष्णता वाढते',
      visualInactive: 'भाग निवडलेला नाही',
      causeTitle: 'संभाव्य कारण',
      therapyTitle: 'उपचार केंद्रबिंदू',
      recoveryTitle: 'रिकव्हरीचा अंदाज',
      causeText: 'क्लिनिकल पॅटर्न पाहण्यासाठी भाग निवडा.',
      therapyText: 'इनपुट पूर्ण केल्यावर उपचार मार्ग स्पष्ट करू.',
      recoveryText: 'कालावधी व ध्येय सामायिक करा म्हणजे वेळापत्रक तयार करू.',
      metricConfidence: 'विश्वास गुण',
      metricSessions: 'सुचवलेले सेशन',
      metricRecovery: 'रिकव्हरी कालखंड',
      downloadButton: 'सारांश डाउनलोड करा',
      regions: {
        neck: { title: 'मान व वरचा पाठीचा कणा', desc: 'ताण, आखडण, पोश्चर समस्या' },
        shoulder: { title: 'खांदा विभाग', desc: 'रोटेटर कफ थकवा, वेदना' },
        lower_back: { title: 'कंबरेखालील भाग', desc: 'कडकपणा, नस चाळवणे' },
        knee: { title: 'गुडघा व हालचाल', desc: 'लिगामेंट ताण, सूज' }
      },
      painOptions: {
        sharp: 'तीक्ष्ण / भोसकणारे',
        dull: 'मंद दुखणे',
        throbbing: 'धडधडणारे',
        burning: 'जळजळ / मुंग्या येणे'
      },
      durationOptions: {
        '0-2': '0 - 2 आठवडे',
        '2-6': '2 - 6 आठवडे',
        '6-12': '6 - 12 आठवडे',
        '12+': '12+ आठवडे'
      },
      intensityLevels: {
        low: 'हलका',
        medium: 'मध्यम',
        high: 'जोरदार'
      },
      durations: {
        short: 'तत्काळ त्रास',
        medium: 'मध्यम मुदतीची चिंता',
        long: 'जुना त्रास'
      },
      insights: {
        empty: 'सर्व चरण पूर्ण करा आणि तंतोतंत मार्गदर्शन पहा.',
        cause: {
          neck: 'मानेला बसणारे ताण, स्नायूंची कडकपणा आणि बसण्याच्या सवयींमुळे होणारी संवेदनशीलता सुचवते.',
          shoulder: 'खांद्यावरील ओव्हरलोड, रोटेटर कफ थकवा आणि स्कॅपुलर नियंत्रण कमी असल्याचे दिसते.',
          lower_back: 'कंबरेतील फेसट चिडचिड आणि कोर स्नायूंचा प्रतिसाद कमी झालेला वाटतो.',
          knee: 'गुडघ्यातील पॅटेलर दबाव आणि सभोवतालच्या ऊतींमध्ये दाह जाणवतो.'
        },
        therapy: {
          neck: 'मॅन्युअल रिलीज, पोश्चर प्रशिक्षण आणि डीप नेक फ्लेक्सर सक्रियण करा.',
          shoulder: 'रोटेटर कफ बळकटी, स्कॅपुलर सेटिंग आणि क्रमशः भार वाढवणे महत्त्वाचे.',
          lower_back: 'कंबर डी-कम्प्रेशन, कोर समन्वय आणि हिप मोबिलिटी वाढवा.',
          knee: 'पॅटेलर ट्रॅकिंग, क्वाड स्ट्रेंथ आणि नियंत्रित प्लायोमेट्रिक्स वापरा.'
        },
        recovery: {
          acute: 'सुयोग्य थेरपीने 2-3 आठवड्यात ठोस आराम मिळू शकतो.',
          subacute: '4-6 आठवडे सातत्यपूर्ण काळजी व पुनरावलोकन आवश्यक.',
          chronic: '8-12 आठवड्यांचा ठराविक कार्यक्रम टिकवणे फायद्याचे.'
        }
      },
      sessions: {
        light: '3-4 सत्रे',
        medium: '5-7 सत्रे',
        high: '8-10 सत्रे'
      },
      summaryTitle: 'प्रगत वेदना मूल्यांकन सारांश',
      summaryIntro: 'तुमच्या माहितीवर आधारित एआईची अंतर्दृष्टी:'
    }
  };

  const state = {
    language: 'en',
    step: 0,
    responses: {
      region: null,
      intensity: 4,
      painType: 'sharp',
      notes: '',
      duration: '0-2',
      goals: new Set()
    }
  };

  const cards = Array.from(mount.querySelectorAll('.question-card'));
  const progressFill = mount.querySelector('.progress-fill');
  const progressDots = mount.querySelectorAll('.progress-dot');
  const prevBtn = mount.querySelector('.prev-step');
  const nextBtn = mount.querySelector('.next-step');
  const intensityInput = mount.querySelector('#pain-intensity');
  const intensityOutput = mount.querySelector('#intensity-output');
  const painTypeSelect = mount.querySelector('#pain-type');
  const notesField = mount.querySelector('#pain-notes');
  const durationSelect = mount.querySelector('#pain-duration');
  const checkboxTiles = mount.querySelectorAll('.checkbox-tile');
  const langButtons = mount.querySelectorAll('.lang-btn');
  const bodyVisual = mount.querySelector('.body-visual');
  const activeRegionLabel = mount.querySelector('.active-region');
  const insightTexts = mount.querySelectorAll('[data-i18n-dynamic]');
  const metricValues = {
    confidence: mount.querySelector('[data-metric="confidence"]'),
    sessions: mount.querySelector('[data-metric="sessions"]'),
    window: mount.querySelector('[data-metric="window"]')
  };
  const downloadBtn = mount.querySelector('.download-button');

  function updateLanguage(lang) {
    state.language = lang;
    const dict = translations[lang];
    mount.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (dict[key]) {
        node.textContent = dict[key];
      }
    });
    mount.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      if (dict[key]) {
        node.placeholder = dict[key];
      }
    });
    mount.querySelectorAll('[data-i18n-option]').forEach((node) => {
      const key = node.dataset.i18nOption;
      const parent = node.closest('select');
      if (dict.painOptions && parent && parent.id === 'pain-type' && dict.painOptions[node.value]) {
        node.textContent = dict.painOptions[node.value];
      }
      if (dict.durationOptions && parent && parent.id === 'pain-duration' && dict.durationOptions[node.value]) {
        node.textContent = dict.durationOptions[node.value];
      }
    });
    mount.querySelectorAll('.region-button').forEach((button) => {
      const region = button.dataset.region;
      const label = dict.regions[region];
      if (label) {
        const [titleNode, descNode] = button.children;
        titleNode.textContent = label.title;
        descNode.textContent = label.desc;
      }
    });
    const nextLabel = state.step === cards.length - 1 ? dict.finishButton : dict.nextButton;
    nextBtn.textContent = nextLabel;
    prevBtn.textContent = dict.backButton;
    downloadBtn.textContent = dict.downloadButton;
    renderInsights();
  }

  function updateProgress() {
    const percent = ((state.step + 1) / cards.length) * 100;
    progressFill.style.width = `${percent}%`;
    progressDots.forEach((dot) => {
      const dotStep = Number(dot.dataset.step);
      dot.classList.toggle('active', dotStep <= state.step);
    });
    cards.forEach((card, index) => {
      card.hidden = index !== state.step;
    });
    prevBtn.disabled = state.step === 0;
    const dict = translations[state.language];
    nextBtn.textContent = state.step === cards.length - 1 ? dict.finishButton : dict.nextButton;
  }

  function renderInsights() {
    const dict = translations[state.language];
    const { region, intensity, duration, goals, painType } = state.responses;

    let intensityDescriptor = dict.intensityLevels.low;
    if (intensity >= 7) intensityDescriptor = dict.intensityLevels.high;
    else if (intensity >= 4) intensityDescriptor = dict.intensityLevels.medium;

    let durationKey = 'short';
    if (duration === '2-6') durationKey = 'medium';
    else if (duration === '6-12' || duration === '12+') durationKey = 'long';

    const regionLabel = region ? dict.regions[region].title : dict.visualInactive;
    activeRegionLabel.textContent = regionLabel;
    bodyVisual.className = `body-visual${region ? ` region-${region}` : ''}`;

    insightTexts.forEach((node) => {
      const key = node.dataset.i18nDynamic;
      let text = dict[key];
      if (key === 'causeText') {
        text = region ? dict.insights.cause[region] : dict.insights.empty;
      }
      if (key === 'therapyText') {
        text = region ? dict.insights.therapy[region] : dict.insights.empty;
      }
      if (key === 'recoveryText') {
        if (!duration) {
          text = dict.insights.empty;
        } else if (duration === '0-2') {
          text = dict.insights.recovery.acute;
        } else if (duration === '2-6') {
          text = dict.insights.recovery.subacute;
        } else {
          text = dict.insights.recovery.chronic;
        }
      }
      node.textContent = text;
    });

    const baseConfidence = 60;
    const regionBoost = region ? 8 : 0;
    const intensityBoost = Math.round(intensity * 2.6);
    const durationPenalty = duration === '12+' ? 6 : duration === '6-12' ? 3 : 0;
    const confidenceScore = Math.min(96, baseConfidence + regionBoost + intensityBoost - durationPenalty);
    metricValues.confidence.textContent = `${confidenceScore}%`;

    let sessionKey = 'light';
    if (intensity >= 7 || duration === '6-12' || duration === '12+') sessionKey = 'high';
    else if (intensity >= 5 || duration === '2-6') sessionKey = 'medium';
    metricValues.sessions.textContent = translations[state.language].sessions[sessionKey];

    let recoveryWindow = dict.durationOptions[duration] || '--';
    if (duration === '0-2') recoveryWindow = dict.insights.recovery.acute;
    else if (duration === '2-6') recoveryWindow = dict.insights.recovery.subacute;
    else recoveryWindow = dict.insights.recovery.chronic;
    metricValues.window.textContent = recoveryWindow;

    const overlay = bodyVisual.querySelector('.heatmap-overlay');
    overlay.style.opacity = region ? '0.8' : '0';
    overlay.style.filter = `blur(${Math.max(6, intensity * 1.2)}px)`;
    overlay.style.transform = `scale(${1 + intensity * 0.04})`;
  }

  function syncStateFromUI() {
    state.responses.intensity = Number(intensityInput.value);
    state.responses.painType = painTypeSelect.value;
    state.responses.notes = notesField.value.trim();
    state.responses.duration = durationSelect.value;
    state.responses.goals = new Set(
      Array.from(checkboxTiles)
        .filter((tile) => tile.querySelector('input').checked)
        .map((tile) => tile.querySelector('input').value)
    );
  }

  mount.querySelectorAll('.region-button').forEach((button) => {
    button.addEventListener('click', () => {
      mount.querySelectorAll('.region-button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      state.responses.region = button.dataset.region;
      renderInsights();
    });
  });

  intensityInput.addEventListener('input', (event) => {
    intensityOutput.textContent = event.target.value;
    syncStateFromUI();
    renderInsights();
  });

  painTypeSelect.addEventListener('change', () => {
    syncStateFromUI();
    renderInsights();
  });

  notesField.addEventListener('input', () => {
    syncStateFromUI();
  });

  durationSelect.addEventListener('change', () => {
    syncStateFromUI();
    renderInsights();
  });

  checkboxTiles.forEach((tile) => {
    const input = tile.querySelector('input');
    tile.addEventListener('click', (event) => {
      if (event.target.tagName !== 'INPUT') {
        input.checked = !input.checked;
      }
      syncStateFromUI();
      tile.classList.toggle('active', input.checked);
    });
  });

  prevBtn.addEventListener('click', () => {
    if (state.step === 0) return;
    state.step -= 1;
    updateProgress();
    updateLanguage(state.language);
  });

  nextBtn.addEventListener('click', () => {
    if (state.step < cards.length - 1) {
      state.step += 1;
      updateProgress();
      updateLanguage(state.language);
    } else {
      renderInsights();
    }
  });

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      langButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      updateLanguage(button.dataset.lang);
    });
  });

  downloadBtn.addEventListener('click', () => {
    const dict = translations[state.language];
    const goals = Array.from(state.responses.goals)
      .map((goal) => dict[`goal${goal.charAt(0).toUpperCase() + goal.slice(1)}`])
      .filter(Boolean);
    const summary = [
      dict.summaryTitle,
      '--------------------------------',
      `${dict.subtitle}`,
      '',
      `${dict.regions[state.responses.region]?.title || dict.visualInactive}`,
      `Intensity: ${state.responses.intensity}`,
      `${dict.painTypeLabel}: ${dict.painOptions[state.responses.painType]}`,
      `${dict.durationLabel}: ${dict.durationOptions[state.responses.duration]}`,
      goals.length ? `${dict.goalPrompt}: ${goals.join(', ')}` : '',
      state.responses.notes ? `Notes: ${state.responses.notes}` : '',
      '',
      `${translations[state.language].causeTitle}: ${mount.querySelector('[data-i18n-dynamic="causeText"]').textContent}`,
      `${translations[state.language].therapyTitle}: ${mount.querySelector('[data-i18n-dynamic="therapyText"]').textContent}`,
      `${translations[state.language].recoveryTitle}: ${mount.querySelector('[data-i18n-dynamic="recoveryText"]').textContent}`,
      '',
      `${dict.metricConfidence}: ${metricValues.confidence.textContent}`,
      `${dict.metricSessions}: ${metricValues.sessions.textContent}`,
      `${dict.metricRecovery}: ${metricValues.window.textContent}`
    ]
      .filter(Boolean)
      .join('\n');

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'pain-assessment-summary.txt';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  });

  updateProgress();
  updateLanguage(state.language);
  syncStateFromUI();
  renderInsights();
});
