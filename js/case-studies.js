/**
 * Case Studies Data & Interactive Details Controller
 */

const caseStudiesData = [
  {
    id: "ddos-detection",
    title: "DDoS Attack Detection & Mitigation",
    domain: "Cybersecurity ML",
    tagline: "96% Accuracy Multi-Model Security System",
    summary: "Designed and implemented a comprehensive DDoS attack detection system using ensemble machine learning on the CICDDoS2019 dataset, achieving 96% accuracy with intelligent feature selection.",
    problem: "Distributed Denial-of-Service (DDoS) attacks represent one of the most disruptive cyber threats, capable of taking down critical infrastructure. Traditional rule-based detection systems fail to generalize across novel attack vectors. The challenge was to build a real-time, high-accuracy detection system that could distinguish between 12 attack types while handling 87 high-dimensional network traffic features efficiently under tight latency constraints.",
    approach: "Adopted a multi-model ensemble strategy. ExtraTrees feature importance was utilized to reduce the feature space from 87 to 20 critical features — cutting inference latency by 4× without sacrificing accuracy. Four base models were trained and evaluated: Support Vector Machine (SVM), Decision Tree, Random Forest, and Long Short-Term Memory (LSTM) recurrent networks. These were unified via an MV-4 majority-voting ensemble to ensure resilience against single-model bias.",
    results: "The optimized Decision Tree achieved 96.0% test accuracy on CICDDoS2019 across 12 distinct attack vectors. In production simulation, the MV-4 majority ensemble slashed false positives by 18% on ambiguous network flows, while the 20-feature reduction enabled real-time flow classification in under 200ms per window.",
    metrics: [
      { label: "Accuracy", value: "96%", desc: "Decision Tree on CICDDoS2019" },
      { label: "Feature Space", value: "87 → 20", desc: "Via ExtraTrees importance" },
      { label: "False Positives", value: "-18%", desc: "MV-4 Ensemble reduction" },
      { label: "Inference Speed", value: "4× Faster", desc: "200ms real-time processing" }
    ],
    technologies: ["Python", "Scikit-Learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib"]
  },
  {
    id: "smartshield-malware",
    title: "SmartShield — Malware & Phishing Detector",
    domain: "Cybersecurity ML",
    tagline: "Intelligent Binary & Lexical Security Solution",
    summary: "A production-ready cybersecurity solution using Random Forest classification to detect malicious PE executables and identify phishing URLs, packaged as a lightweight REST API.",
    problem: "Antivirus systems relying solely on static signatures miss polymorphic malware and zero-day exploits. Meanwhile, malicious phishing campaigns continuously generate novel URLs to bypass static blacklists. The goal was to engineer a unified ML-powered detector for executable binaries and phishing URLs via a clean web interface.",
    approach: "Extracted structural PE (Portable Executable) header features (section entropy, export/import directory tables, DLL call signatures) from the CIC-InvesAndMal2019 dataset (18,000+ binaries) evaluated with an 80/20 train/test split. For URL analysis, extracted 25 lexical, structural, and domain features trained against PhishTank and verified benign sets. Both models were hyperparameter-tuned, serialized via Pickle, and served through a Flask REST API.",
    results: "The executable classifier scored 94.7% accuracy with a sub-3% false negative rate on held-out test binaries. The phishing URL detector achieved 92.0% precision and 89.0% recall, with end-to-end classification delivered in under 2 seconds.",
    metrics: [
      { label: "Malware Accuracy", value: "94.7%", desc: "CIC-InvesAndMal2019 test set" },
      { label: "False Negative", value: "< 3%", desc: "Critical security threshold" },
      { label: "Phishing Precision", value: "92%", desc: "25-feature lexical classifier" },
      { label: "Inference Time", value: "< 2s", desc: "Complete scanning pipeline" }
    ],
    technologies: ["Python", "Scikit-learn", "Random Forest", "Flask", "JavaScript", "pefile"]
  },
  {
    id: "network-anomaly-lstm",
    title: "Network Anomaly Detection with LSTM",
    domain: "Deep Learning",
    tagline: "Sequential Pattern Anomaly Detection",
    summary: "Explored deep learning for temporal anomaly detection in network traffic using Long Short-Term Memory (LSTM) recurrent networks benchmarked against classical machine learning baselines.",
    problem: "Modern network intrusions often exhibit gradual temporal patterns — individual packets appear completely benign in isolation, but reveal malicious coordination over time. Classical stateless ML classifiers miss these temporal dependencies, leading to elevated false alarm rates during multi-stage cyberattacks.",
    approach: "Preprocessed network connection records into sliding temporal windows with sequence lengths of 50 timesteps. Architected a two-layer LSTM recurrent network with dropout regularization to capture temporal packet arrival sequences, inter-arrival latency shifts, and volumetric surges without manual feature engineering.",
    results: "The LSTM network achieved 94.2% sequential anomaly detection rate and 98.1% AUC-ROC, outperforming stateless Random Forest baselines on multi-stage reconnaissance scans while maintaining sub-120ms sequence inference time.",
    metrics: [
      { label: "Detection Rate", value: "94.2%", desc: "Temporal sequence benchmark" },
      { label: "AUC-ROC", value: "98.1%", desc: "Across multi-stage traffic" },
      { label: "Inference Latency", value: "< 120ms", desc: "Sliding window sequence" },
      { label: "Architecture", value: "2-Layer LSTM", desc: "Bidirectional with dropout" }
    ],
    technologies: ["Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Matplotlib"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("case-studies-list");
  if (!container) return;

  container.innerHTML = "";

  caseStudiesData.forEach((study, idx) => {
    const card = document.createElement("article");
    card.className = "surface-card p-8 md:p-10 mb-8 border border-ink/10 group hover:border-accent/40 transition-all duration-300";
    card.style.animation = `fadeIn 0.4s ease forwards ${idx * 0.08}s`;

    const metricsHtml = study.metrics.map(m => `
      <div class="stat-card">
        <dt class="stat-label">${m.label}</dt>
        <dd class="text-xl md:text-2xl font-bold text-foreground mt-0.5">${m.value}</dd>
        <p class="text-xs text-muted-foreground mt-1">${m.desc}</p>
      </div>
    `).join("");

    const techTags = study.technologies.map(t => `<span class="tag text-xs">${t}</span>`).join(" ");

    card.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <span class="inline-flex items-center rounded-full bg-accent/10 border border-accent/30 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            ${study.domain}
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold text-foreground mt-3">${study.title}</h2>
          <p class="text-base text-accent font-medium mt-1">${study.tagline}</p>
        </div>
      </div>

      <div class="space-y-6 text-muted-foreground text-base leading-relaxed">
        <p class="text-lg text-foreground font-medium">${study.summary}</p>
        
        <div class="grid md:grid-cols-2 gap-6 pt-2">
          <div class="p-5 rounded-xl bg-ink/[0.02] border border-ink/10">
            <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-foreground mb-2">The Problem</h4>
            <p class="text-sm">${study.problem}</p>
          </div>
          <div class="p-5 rounded-xl bg-ink/[0.02] border border-ink/10">
            <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-foreground mb-2">The Approach</h4>
            <p class="text-sm mb-3">${study.approach}</p>
            <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-foreground mb-2">Key Results</h4>
            <p class="text-sm">${study.results}</p>
          </div>
        </div>

        <div>
          <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Quantified Outcomes</h4>
          <dl class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${metricsHtml}
          </dl>
        </div>

        <div class="pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap gap-2">
            ${techTags}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
});
