const STORAGE_KEYS = {
  FEEDBACK: 'painAssessment.feedback.log',
};

export class PainAssessmentUI {
  constructor({ root, onLanguageChange, theme }) {
    this.root = root;
    this.onLanguageChange = onLanguageChange;
    this.theme = theme;
    this.elements = {};
    this.chart = null;
    this.feedbackHandler = null;
    this.language = 'en';
    this.resumeActive = false;
    this.typingInterval = null;
  }

  mountShell(copy) {
    this.language = copy.locale;
    const section = document.createElement('section');
    section.className = 'pain-assessment-section';
    section.dataset.theme = this.theme;

    const shell = document.createElement('div');
    shell.className = 'assessment-shell';

    const header = this.buildHeader(copy);
    const grid = this.buildGrid(copy);

    shell.appendChild(header);
    shell.appendChild(grid);
    section.appendChild(shell);

    this.root.innerHTML = '';
    this.root.appendChild(section);
    this.elements.section = section;
    this.elements.shell = shell;
    this.elements.grid = grid;

    this.restoreFeedbackState();
  }

  buildHeader(copy) {
    const header = document.createElement('header');
    header.className = 'assessment-header';

    const left = document.createElement('div');
    left.className = 'header-left';

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = copy.badge;

    const title = document.createElement('h1');
    title.textContent = copy.heading;

    const subtitle = document.createElement('p');
    subtitle.textContent = copy.subheading;

    const progressTrack = document.createElement('div');
    progressTrack.className = 'progress-track';

    const progressLabel = document.createElement('div');
    progressLabel.className = 'progress-label';

    const progressText = document.createElement('span');
    progressText.textContent = copy.progress.initial;

    const resumeIndicator = document.createElement('span');
    resumeIndicator.className = 'resume-indicator';
    resumeIndicator.textContent = '';

    progressLabel.append(progressText, resumeIndicator);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressBar.appendChild(progressFill);

    progressTrack.append(progressLabel, progressBar);

    left.append(badge, title, subtitle, progressTrack);

    const right = document.createElement('div');
    right.className = 'header-right';

    const langSwitch = document.createElement('div');
    langSwitch.className = 'lang-switch';

    copy.languages.forEach((lang) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.lang = lang.code;
      button.textContent = lang.label;
      if (lang.code === copy.locale) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        this.handleLanguageToggle(lang.code);
      });
      langSwitch.appendChild(button);
    });

    const meta = document.createElement('div');
    meta.className = 'session-meta';
    const sessionTimer = document.createElement('span');
    sessionTimer.dataset.role = 'timer';
    sessionTimer.textContent = copy.meta.timer.replace('{value}', '0:00');

    const resume = document.createElement('span');
    resume.dataset.role = 'resume';
    resume.textContent = copy.meta.newSession;

    meta.append(sessionTimer, resume);

    right.append(langSwitch, meta);

    this.elements.badge = badge;
    this.elements.title = title;
    this.elements.subtitle = subtitle;
    this.elements.progressText = progressText;
    this.elements.resumeIndicator = resumeIndicator;
    this.elements.progressFill = progressFill;
    this.elements.timer = sessionTimer;
    this.elements.resumeLabel = resume;
    this.elements.langSwitch = langSwitch;

    header.append(left, right);
    return header;
  }

  buildGrid(copy) {
    const grid = document.createElement('div');
    grid.className = 'assessment-grid';

    const flowColumn = document.createElement('div');
    flowColumn.className = 'flow-column';

    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';

    const questionHeader = document.createElement('header');
    const questionTitle = document.createElement('h2');
    questionTitle.className = 'question-title';
    const questionSubtitle = document.createElement('p');
    questionSubtitle.className = 'question-subtitle';
    questionHeader.append(questionTitle, questionSubtitle);

    const questionForm = document.createElement('form');
    questionForm.className = 'question-form';

    const questionActions = document.createElement('div');
    questionActions.className = 'question-actions';

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'ghost';
    backButton.textContent = copy.actions.back;

    const skipButton = document.createElement('button');
    skipButton.type = 'button';
    skipButton.className = 'secondary';
    skipButton.textContent = copy.actions.skip;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'primary';
    submitButton.textContent = copy.actions.next;

    questionActions.append(backButton, skipButton, submitButton);

    questionCard.append(questionHeader, questionForm, questionActions);

    const aiCard = document.createElement('div');
    aiCard.className = 'ai-response-card';

    const aiHeader = document.createElement('header');
    const liveDot = document.createElement('span');
    liveDot.className = 'dot';
    const aiTitle = document.createElement('h3');
    aiTitle.textContent = copy.ai.assistant;
    aiHeader.append(liveDot, aiTitle);

    const typing = document.createElement('div');
    typing.className = 'ai-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    typing.style.display = 'none';

    const responseContent = document.createElement('div');
    responseContent.className = 'ai-response-content';

    const feedbackBar = document.createElement('div');
    feedbackBar.className = 'feedback-bar';

    const feedbackLabel = document.createElement('span');
    feedbackLabel.textContent = copy.feedback.prompt;

    const feedbackActions = document.createElement('div');
    feedbackActions.className = 'feedback-actions';

    const helpfulButton = document.createElement('button');
    helpfulButton.type = 'button';
    helpfulButton.textContent = copy.feedback.helpful;

    const notHelpfulButton = document.createElement('button');
    notHelpfulButton.type = 'button';
    notHelpfulButton.textContent = copy.feedback.notHelpful;

    feedbackActions.append(helpfulButton, notHelpfulButton);
    feedbackBar.append(feedbackLabel, feedbackActions);

    aiCard.append(aiHeader, typing, responseContent, feedbackBar);

    this.elements.questionCard = questionCard;
    this.elements.questionTitle = questionTitle;
    this.elements.questionSubtitle = questionSubtitle;
    this.elements.questionForm = questionForm;
    this.elements.submitButton = submitButton;
    this.elements.skipButton = skipButton;
    this.elements.backButton = backButton;
    this.elements.typing = typing;
    this.elements.responseContent = responseContent;
    this.elements.aiTitle = aiTitle;
    this.elements.feedbackLabel = feedbackLabel;
    this.elements.feedbackHelpful = helpfulButton;
    this.elements.feedbackNotHelpful = notHelpfulButton;

    flowColumn.append(questionCard, aiCard);

    const insightColumn = document.createElement('div');
    insightColumn.className = 'insight-column';

    const metricsPanel = document.createElement('div');
    metricsPanel.className = 'metrics-panel';

    const metricsTitle = document.createElement('h3');
    metricsTitle.textContent = copy.metrics.title;

    const metricPills = document.createElement('div');
    metricPills.className = 'metric-pills';

    const painPill = this.buildMetricPill(copy.metrics.painIndex, '--');
    const confidencePill = this.buildMetricPill(copy.metrics.confidence, '--%');
    const riskPill = this.buildMetricPill(copy.metrics.risk, '--');

    metricPills.append(painPill, confidencePill, riskPill);

    const chartCard = document.createElement('div');
    chartCard.className = 'chart-card';
    const canvas = document.createElement('canvas');
    canvas.id = 'recovery-chart';
    chartCard.appendChild(canvas);

    metricsPanel.append(metricsTitle, metricPills, chartCard);

    const insightCards = document.createElement('div');
    insightCards.className = 'insight-cards';

    const summaryCard = this.buildInsightCard(copy.insights.summaryTitle, copy.insights.summaryPlaceholder);
    const diagnosisCard = this.buildInsightCard(copy.insights.diagnosisTitle, copy.insights.diagnosisPlaceholder);
    const planCard = this.buildInsightCard(copy.insights.planTitle, copy.insights.planPlaceholder, true);
    const timelineCard = this.buildInsightCard(copy.insights.timelineTitle, copy.insights.timelinePlaceholder);

    insightCards.append(summaryCard, diagnosisCard, planCard, timelineCard);

    const disclaimer = document.createElement('p');
    disclaimer.className = 'disclaimer';
    disclaimer.textContent = copy.insights.disclaimer;

    insightColumn.append(metricsPanel, insightCards, disclaimer);

    this.elements.metricPain = painPill.querySelector('strong');
    this.elements.metricConfidence = confidencePill.querySelector('strong');
    this.elements.metricRisk = riskPill.querySelector('strong');
    this.elements.metricPainLabel = painPill.querySelector('span');
    this.elements.metricConfidenceLabel = confidencePill.querySelector('span');
    this.elements.metricRiskLabel = riskPill.querySelector('span');
    this.elements.chartCanvas = canvas;
    this.elements.summaryHeading = summaryCard.querySelector('h4');
    this.elements.diagnosisHeading = diagnosisCard.querySelector('h4');
    this.elements.planHeading = planCard.querySelector('h4');
    this.elements.timelineHeading = timelineCard.querySelector('h4');
    this.elements.insightSummary = summaryCard.querySelector('p');
    this.elements.insightDiagnosis = diagnosisCard.querySelector('p');
    this.elements.planPlaceholder = planCard.querySelector('p');
    this.elements.insightPlan = planCard.querySelector('ul');
    this.elements.insightTimeline = timelineCard.querySelector('p');
    this.elements.metricsTitle = metricsTitle;
    this.elements.disclaimer = disclaimer;

    grid.append(flowColumn, insightColumn);
    return grid;
  }

  buildMetricPill(label, value) {
    const pill = document.createElement('div');
    pill.className = 'metric-pill';
    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;
    const strong = document.createElement('strong');
    strong.textContent = value;
    pill.append(labelSpan, strong);
    return pill;
  }

  buildInsightCard(title, placeholder, withList = false) {
    const card = document.createElement('div');
    card.className = 'insight-card';
    const heading = document.createElement('h4');
    heading.textContent = title;
    const content = document.createElement('p');
    content.textContent = placeholder;
    card.append(heading, content);

    if (withList) {
      const list = document.createElement('ul');
      list.style.display = 'none';
      list.className = 'plan-list';
      card.appendChild(list);
    }
    return card;
  }

  updateCopy(copy) {
    this.language = copy.locale;
    this.elements.badge && (this.elements.badge.textContent = copy.badge);
  }

  refreshStaticCopy(copy) {
    this.language = copy.locale;
    if (this.elements.badge) this.elements.badge.textContent = copy.badge;
    if (this.elements.title) this.elements.title.textContent = copy.heading;
    if (this.elements.subtitle) this.elements.subtitle.textContent = copy.subheading;
    if (this.elements.progressText) this.elements.progressText.textContent = copy.progress.initial;
    if (this.elements.resumeLabel) this.elements.resumeLabel.textContent = copy.meta.newSession;
    if (this.elements.resumeIndicator && this.resumeActive) {
      this.elements.resumeIndicator.textContent = copy.progress.resumed;
    }
    if (this.elements.aiTitle) this.elements.aiTitle.textContent = copy.ai.assistant;
    if (this.elements.feedbackLabel) this.elements.feedbackLabel.textContent = copy.feedback.prompt;
    if (this.elements.feedbackHelpful) this.elements.feedbackHelpful.textContent = copy.feedback.helpful;
    if (this.elements.feedbackNotHelpful) this.elements.feedbackNotHelpful.textContent = copy.feedback.notHelpful;
    if (this.elements.submitButton) this.elements.submitButton.textContent = copy.actions.next;
    if (this.elements.skipButton) this.elements.skipButton.textContent = copy.actions.skip;
    if (this.elements.backButton) this.elements.backButton.textContent = copy.actions.back;
    if (this.elements.metricsTitle) this.elements.metricsTitle.textContent = copy.metrics.title;
    if (this.elements.metricPainLabel) this.elements.metricPainLabel.textContent = copy.metrics.painIndex;
    if (this.elements.metricConfidenceLabel) this.elements.metricConfidenceLabel.textContent = copy.metrics.confidence;
    if (this.elements.metricRiskLabel) this.elements.metricRiskLabel.textContent = copy.metrics.risk;
    if (this.elements.summaryHeading) this.elements.summaryHeading.textContent = copy.insights.summaryTitle;
    if (this.elements.diagnosisHeading) this.elements.diagnosisHeading.textContent = copy.insights.diagnosisTitle;
    if (this.elements.planHeading) this.elements.planHeading.textContent = copy.insights.planTitle;
    if (this.elements.timelineHeading) this.elements.timelineHeading.textContent = copy.insights.timelineTitle;
    if (this.elements.insightSummary) this.elements.insightSummary.textContent = copy.insights.summaryPlaceholder;
    if (this.elements.insightDiagnosis) this.elements.insightDiagnosis.textContent = copy.insights.diagnosisPlaceholder;
    if (this.elements.planPlaceholder) this.elements.planPlaceholder.textContent = copy.insights.planPlaceholder;
    if (this.elements.insightTimeline) this.elements.insightTimeline.textContent = copy.insights.timelinePlaceholder;
    if (this.elements.disclaimer) this.elements.disclaimer.textContent = copy.insights.disclaimer;
    this.updateLanguageSwitch(copy.locale);
  }

  setResumeState(resumeText) {
    if (this.elements.resumeIndicator) {
      this.elements.resumeIndicator.textContent = resumeText || '';
      this.resumeActive = Boolean(resumeText);
    }
  }

  updateTimer(text) {
    if (this.elements.timer) {
      this.elements.timer.textContent = text;
    }
  }

  updateProgress({ text, percent }) {
    if (this.elements.progressText) {
      this.elements.progressText.textContent = text;
    }
    if (this.elements.progressFill) {
      const width = `${Math.min(100, Math.max(0, percent))}%`;
      if (window.gsap) {
        window.gsap.to(this.elements.progressFill, {
          width,
          duration: 0.6,
          ease: 'power2.out',
        });
      } else {
        this.elements.progressFill.style.width = width;
      }
    }
  }

  updateQuestion({
    title,
    subtitle,
    contentBuilder,
    submitLabel,
    canSubmit,
    showSkip,
    showBack,
    skipLabel,
    backLabel,
  }) {
    if (!this.elements.questionTitle || !this.elements.questionForm) return;
    this.elements.questionTitle.textContent = title;
    this.elements.questionSubtitle.textContent = subtitle || '';

    const form = this.elements.questionForm;
    form.innerHTML = '';
    const content = contentBuilder();
    if (content) {
      form.appendChild(content);
    }

    if (this.elements.submitButton) {
      this.elements.submitButton.textContent = submitLabel;
      this.elements.submitButton.disabled = !canSubmit;
    }

    if (this.elements.skipButton) {
      this.elements.skipButton.style.display = showSkip ? 'inline-flex' : 'none';
      if (skipLabel) {
        this.elements.skipButton.textContent = skipLabel;
      }
    }

    if (this.elements.backButton) {
      this.elements.backButton.style.visibility = showBack ? 'visible' : 'hidden';
      if (backLabel) {
        this.elements.backButton.textContent = backLabel;
      }
    }
  }

  bindQuestionHandlers({ onSubmit, onSkip, onBack }) {
    if (this.currentSubmitHandler) {
      this.elements.questionForm?.removeEventListener('submit', this.currentSubmitHandler);
    }

    this.currentSubmitHandler = (event) => {
      event.preventDefault();
      onSubmit?.();
    };

    this.elements.questionForm?.addEventListener('submit', this.currentSubmitHandler);
    if (this.skipHandler) {
      this.elements.skipButton?.removeEventListener('click', this.skipHandler);
    }
    if (this.backHandler) {
      this.elements.backButton?.removeEventListener('click', this.backHandler);
    }

    this.skipHandler = () => onSkip?.();
    this.backHandler = () => onBack?.();

    this.elements.skipButton?.addEventListener('click', this.skipHandler);
    this.elements.backButton?.addEventListener('click', this.backHandler);
  }

  setSubmitEnabled(enabled) {
    if (this.elements.submitButton) {
      this.elements.submitButton.disabled = !enabled;
    }
  }

  showTypingIndicator(show) {
    if (this.elements.typing) {
      this.elements.typing.style.display = show ? 'inline-flex' : 'none';
    }
  }

  animateAIResponse(text, deepDive, copy) {
    if (!this.elements.responseContent) return;
    this.elements.responseContent.innerHTML = '';

    const paragraph = document.createElement('p');
    paragraph.textContent = '';
    this.elements.responseContent.appendChild(paragraph);

    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    let index = 0;
    this.showTypingIndicator(true);

    this.typingInterval = setInterval(() => {
      paragraph.textContent = text.slice(0, index);
      index += 3;
      if (index >= text.length) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
        paragraph.textContent = text;
        this.showTypingIndicator(false);
        if (deepDive) {
          const details = document.createElement('div');
          details.className = 'deeper-details';
          const detailText = document.createElement('p');
          detailText.textContent = deepDive;
          const toggle = document.createElement('button');
          toggle.type = 'button';
          toggle.className = 'secondary';
          toggle.textContent = copy.ai.deepDive;
          let expanded = false;
          detailText.style.display = 'none';
          toggle.addEventListener('click', () => {
            expanded = !expanded;
            detailText.style.display = expanded ? 'block' : 'none';
            toggle.textContent = expanded ? copy.ai.hideDeepDive : copy.ai.deepDive;
          });
          details.append(toggle, detailText);
          this.elements.responseContent.appendChild(details);
        }
      }
    }, 16);
  }

  updateInsights({ summary, probableDiagnosis, plan, timeline, disclaimer, metrics }, copy) {
    if (this.elements.insightSummary) {
      this.elements.insightSummary.textContent = summary;
    }
    if (this.elements.insightDiagnosis) {
      this.elements.insightDiagnosis.textContent = probableDiagnosis;
    }
    if (this.elements.insightPlan) {
      const list = this.elements.insightPlan;
      list.innerHTML = '';
      const planItems = Array.isArray(plan) ? plan : plan ? [plan] : [];
      if (planItems.length) {
        list.style.display = 'grid';
        this.elements.planPlaceholder.style.display = 'none';
        planItems.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });
      } else {
        list.style.display = 'none';
        if (this.elements.planPlaceholder) {
          this.elements.planPlaceholder.style.display = 'block';
        }
      }
    }
    if (this.elements.insightTimeline) {
      this.elements.insightTimeline.textContent = timeline;
    }
    if (this.elements.disclaimer && disclaimer) {
      this.elements.disclaimer.textContent = disclaimer;
    }

    if (metrics) {
      const painValue = metrics.painIndex ?? '--';
      const confidenceValue =
        typeof metrics.confidence === 'number'
          ? `${metrics.confidence}%`
          : metrics.confidence || '--';
      const riskValue = metrics.riskBand ? String(metrics.riskBand).toUpperCase() : '--';
      this.elements.metricPain.textContent = painValue;
      this.elements.metricConfidence.textContent = confidenceValue;
      this.elements.metricRisk.textContent = riskValue;
      const chartLabels = metrics.labels || copy.metrics.chartLabels;
      const chartTitle = metrics.chartTitle || copy.metrics.chartTitle;
      this.updateChart(metrics.recoveryCurve, chartLabels, chartTitle);
    }
  }

  updateChart(data, labels, title) {
    if (!this.elements.chartCanvas || !window.Chart) return;
    const ctx = this.elements.chartCanvas.getContext('2d');
    if (!this.chart) {
      this.chart = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: title,
              data: data || [],
              borderColor: '#f37021',
              backgroundColor: 'rgba(243, 112, 33, 0.12)',
              tension: 0.38,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255,255,255,0.08)',
              },
              ticks: {
                color: '#b4c0d7',
              },
            },
            x: {
              grid: {
                color: 'rgba(255,255,255,0.04)',
              },
              ticks: {
                color: '#b4c0d7',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    } else {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }

  registerFeedbackHandler(handler) {
    this.feedbackHandler = handler;
    if (this.elements.feedbackHelpful) {
      this.elements.feedbackHelpful.addEventListener('click', () => this.handleFeedback('helpful'));
    }
    if (this.elements.feedbackNotHelpful) {
      this.elements.feedbackNotHelpful.addEventListener('click', () => this.handleFeedback('not_helpful'));
    }
  }

  handleFeedback(type) {
    if (!this.feedbackHandler) return;
    this.feedbackHandler(type);
    this.storeFeedback(type);
    if (type === 'helpful') {
      this.elements.feedbackHelpful?.classList.add('active');
      this.elements.feedbackNotHelpful?.classList.remove('active');
    } else {
      this.elements.feedbackNotHelpful?.classList.add('active');
      this.elements.feedbackHelpful?.classList.remove('active');
    }
  }

  storeFeedback(type) {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      const data = raw ? JSON.parse(raw) : [];
      data.push({ type, language: this.language, timestamp: Date.now() });
      window.localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(data));
    } catch (error) {
      console.warn('[PainAssessment][feedback] unable to persist feedback', error);
    }
  }

  restoreFeedbackState() {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!Array.isArray(data) || !data.length) return;
      const latest = data[data.length - 1];
      if (latest.type === 'helpful') {
        this.elements.feedbackHelpful?.classList.add('active');
      } else if (latest.type === 'not_helpful') {
        this.elements.feedbackNotHelpful?.classList.add('active');
      }
    } catch (error) {
      console.warn('[PainAssessment][feedback] unable to restore feedback', error);
    }
  }

  updateLanguageSwitch(activeLang) {
    if (!this.elements.langSwitch) return;
    Array.from(this.elements.langSwitch.children).forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === activeLang);
    });
  }

  handleLanguageToggle(code) {
    if (code === this.language) return;
    this.language = code;
    this.updateLanguageSwitch(code);
    this.onLanguageChange?.(code);
  }
}
