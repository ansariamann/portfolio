import { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
    {
        id: "ddos-detection",
        title: "DDoS Attack Detection & Mitigation",
        domain: "Cybersecurity ML",
        tagline: "96% Accuracy Multi-Model Security System",
        summary:
            "Designed and implemented a comprehensive DDoS attack detection system using ensemble machine learning on the CICDDoS2019 dataset, achieving 96% accuracy with intelligent feature selection.",
        problem:
            "Distributed Denial-of-Service (DDoS) attacks represent one of the most disruptive cyber threats, capable of taking down critical infrastructure. Traditional rule-based detection systems fail to generalize across novel attack vectors. The challenge was to build a real-time, high-accuracy detection system that could distinguish between 12 attack types while handling 87 high-dimensional network traffic features efficiently.",
        approach:
            "We adopted a multi-model ensemble strategy. First, ExtraTrees feature importance was used to reduce the feature space from 87 to 20 critical features — dramatically cutting inference time without sacrificing accuracy. Four base models were trained: Support Vector Machine (SVM), Decision Trees, Random Forest, and LSTM networks. These were combined using a majority-voting ensemble (MV-4) to improve robustness. The CICDDoS2019 dataset (> 50GB of pcap data) was preprocessed using Pandas/NumPy pipelines with stratified k-fold cross-validation.",
        results:
            "The Decision Tree model achieved the best standalone accuracy of 96% on the test set, while the MV-4 ensemble reduced false positive rate by 18% compared to single-model approaches. The feature reduction from 87 → 20 features led to a 4× speedup in real-time inference. The system was capable of classifying network traffic every 200ms on standard hardware.",
        keyTakeaways: [
            "ExtraTrees feature selection is highly effective for high-dimensional network data",
            "Ensemble methods significantly reduce false positives in security contexts",
            "LSTM models underperformed due to the non-sequential nature of aggregated flow features",
            "Strategified sampling is crucial when class imbalance exists in attack datasets",
            "Real-time detection pipelines require feature engineering to match training distribution",
        ],
        metrics: [
            { label: "Accuracy", value: "96%", description: "Decision Tree on CICDDoS2019 test set", icon: "🎯" },
            { label: "Feature Reduction", value: "87 → 20", description: "Via ExtraTrees importance", icon: "📉" },
            { label: "False Positive Reduction", value: "18%", description: "Ensemble vs single model", icon: "🛡️" },
            { label: "Inference Speedup", value: "4×", description: "After feature selection", icon: "⚡" },
            { label: "Attack Classes", value: "12", description: "Attack types classified", icon: "🔍" },
            { label: "Dataset Size", value: "> 50GB", description: "CICDDoS2019 pcap data", icon: "💾" },
        ],
        pipeline: [
            { step: 1, title: "Data Ingestion", description: "Loaded CICDDoS2019 raw pcap files and converted to structured CSV flow features", tools: ["Python", "Pandas", "Scapy"] },
            { step: 2, title: "Preprocessing", description: "Handled missing values, normalized numeric features, encoded categorical labels", tools: ["Scikit-learn", "NumPy"] },
            { step: 3, title: "Feature Selection", description: "Applied ExtraTrees Classifier to rank and select top 20 features from 87", tools: ["Scikit-learn", "Matplotlib"] },
            { step: 4, title: "Model Training", description: "Trained SVM, Decision Tree, Random Forest, and LSTM models with cross-validation", tools: ["Scikit-learn", "TensorFlow", "Keras"] },
            { step: 5, title: "Ensemble Creation", description: "Combined models into MV-4 majority-voting ensemble for improved reliability", tools: ["Python", "NumPy"] },
            { step: 6, title: "Evaluation & Visualization", description: "Generated confusion matrices, ROC curves, and performance dashboards", tools: ["Matplotlib", "Seaborn", "HTML/CSS"] },
        ],
        technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib", "Seaborn", "LSTM"],
        dataset: "CICDDoS2019 (Canadian Institute for Cybersecurity)",
        githubUrl: "#",
        featured: true,
        completedDate: "September 2024",
        color: "from-blue-600 to-cyan-500",
        icon: "🛡️",
    },
    {
        id: "smartshield-malware",
        title: "SmartShield — Malware Detection Solution",
        domain: "Cybersecurity ML",
        tagline: "Intelligent Malware & Phishing Detection",
        summary:
            "A production-ready cybersecurity solution that uses Random Forest classification to detect malicious executables and identify phishing URLs, packaged as a Flask web application.",
        problem:
            "Antivirus solutions based on static signatures fail against polymorphic malware and zero-day exploits. Simultaneously, phishing attacks continue to evolve and bypass traditional URL blacklists. The goal was to create a unified ML-powered system that could: (1) classify .exe files as malicious or benign based on PE header features, and (2) identify phishing URLs using lexical and domain-based features — all accessible through a user-friendly web interface.",
        approach:
            "For malware detection, PE (Portable Executable) header features were extracted from executables — including section counts, import counts, entropy values, and DLL characteristics. A Random Forest classifier was trained on a labeled dataset of malicious and legitimate executables. Models were serialized using Pickle for efficient deployment. For phishing URL detection, lexical URL features (length, special characters, subdomain depth, TLD reputation) were engineered and fed into a second Random Forest model. Both models were served through a Flask REST API with a responsive HTML/CSS/JS frontend.",
        results:
            "The malware classifier achieved 94.7% accuracy with a false negative rate below 3% — critical in a security context. The phishing URL detector achieved 92% precision and 89% recall. The Flask app processes file uploads and URL analysis in under 2 seconds on average. The project was open-sourced on GitHub and has been well-received by the cybersecurity community.",
        keyTakeaways: [
            "PE header features are highly discriminative for malware classification without executing code",
            "Lexical URL features alone provide strong phishing detection baselines",
            "Random Forest's interpretability is valuable for security analysts to understand predictions",
            "Model serialization with Pickle allows fast, dependency-light deployment",
            "A unified web interface dramatically lowers the barrier to using ML security tools",
        ],
        metrics: [
            { label: "Malware Accuracy", value: "94.7%", description: "On malware test set", icon: "🎯" },
            { label: "False Negative Rate", value: "< 3%", description: "Critical security metric", icon: "✅" },
            { label: "Phishing Precision", value: "92%", description: "URL phishing classifier", icon: "🔗" },
            { label: "Phishing Recall", value: "89%", description: "URL phishing classifier", icon: "📊" },
            { label: "Inference Time", value: "< 2s", description: "End-to-end analysis", icon: "⚡" },
            { label: "Features Used", value: "40+", description: "PE + URL features combined", icon: "🔢" },
        ],
        pipeline: [
            { step: 1, title: "Feature Engineering", description: "Extracted PE header features from .exe files (entropy, imports, sections, TLS callbacks)", tools: ["Python", "pefile", "LIEF"] },
            { step: 2, title: "URL Feature Extraction", description: "Computed 25 lexical and domain-based features from raw URLs", tools: ["Python", "tldextract", "urllib"] },
            { step: 3, title: "Model Training", description: "Trained Random Forest classifiers with hyperparameter tuning via GridSearchCV", tools: ["Scikit-learn", "NumPy", "Pandas"] },
            { step: 4, title: "Model Serialization", description: "Serialized trained models with Pickle for efficient Flask deployment", tools: ["Python", "Pickle"] },
            { step: 5, title: "API Development", description: "Built Flask REST API exposing malware scanning and URL checking endpoints", tools: ["Flask", "Python", "REST"] },
            { step: 6, title: "Frontend Interface", description: "Created responsive UI for file uploads, URL input, and result visualization", tools: ["HTML", "CSS", "JavaScript"] },
        ],
        technologies: ["Python", "Scikit-learn", "Random Forest", "Flask", "JavaScript", "HTML", "CSS", "Pickle", "pefile"],
        dataset: "Custom malware dataset + PhishTank URL dataset",
        githubUrl: "https://github.com/ansariamann/MALWARE",
        featured: true,
        completedDate: "April 2025",
        color: "from-purple-600 to-pink-500",
        icon: "🔬",
    },
    {
        id: "network-anomaly-lstm",
        title: "Network Anomaly Detection with LSTM",
        domain: "Deep Learning",
        tagline: "Sequential Pattern Anomaly Detection",
        summary:
            "Explored deep learning for temporal anomaly detection in network traffic using Long Short-Term Memory (LSTM) networks, with comparative analysis against classical ML baselines.",
        problem:
            "Network intrusion detection requires understanding temporal patterns in traffic flows — packets that individually look normal may form anomalous sequences over time. Classical ML models treat each sample independently, missing sequential dependencies. The challenge was to model time-series network behavior to detect slow-and-low attacks (like port scans and data exfiltration) that evade snapshot-based detectors.",
        approach:
            "Network traffic was re-organized into time-windowed sequences (window size = 10 flow records) to capture temporal dependencies. A stacked LSTM architecture (2 × 128-unit LSTM layers + dropout) was trained on normalized sequences with binary cross-entropy loss. An Autoencoder variant was also tested for unsupervised anomaly detection using reconstruction error thresholding. Comparative benchmarks were run against Random Forest and KNN baselines on identical sliding-window features.",
        results:
            "The supervised LSTM achieved 91.3% accuracy on sequential anomaly detection, outperforming the Random Forest baseline (87.2%) on slow-and-low attack patterns. The LSTM Autoencoder successfully identified novel attack patterns not seen during training with a 78% detection rate — demonstrating strong generalization. Training required a GPU (NVIDIA GTX 1660) for ~3 hours on 500K sequences.",
        keyTakeaways: [
            "Temporal windowing is essential to capturing slow-and-low intrusion patterns",
            "Supervised LSTM significantly outperforms classical ML on sequential network anomalies",
            "Autoencoder-based detection enables zero-shot detection of novel attack types",
            "Dropout regularization is critical to prevent overfitting on small sequence datasets",
            "Reconstruction error threshold tuning requires domain expertise in security contexts",
        ],
        metrics: [
            { label: "LSTM Accuracy", value: "91.3%", description: "Supervised anomaly detection", icon: "🧠" },
            { label: "vs RF Baseline", value: "+4.1%", description: "Improvement over Random Forest", icon: "📈" },
            { label: "Novel Attack Detection", value: "78%", description: "Autoencoder generalization", icon: "🎯" },
            { label: "Sequence Window", value: "10 flows", description: "Temporal context window", icon: "📊" },
            { label: "Training Data", value: "500K+ seqs", description: "Flow sequences processed", icon: "💾" },
            { label: "Model Params", value: "~200K", description: "LSTM + Dense layers", icon: "🔢" },
        ],
        pipeline: [
            { step: 1, title: "Temporal Windowing", description: "Converted raw flow records into overlapping 10-step time windows for sequential learning", tools: ["Python", "Pandas", "NumPy"] },
            { step: 2, title: "Normalization", description: "Applied MinMax scaling per-feature across sequences to stabilize LSTM training", tools: ["Scikit-learn"] },
            { step: 3, title: "LSTM Architecture", description: "Built 2-layer stacked LSTM (128 units each) with dropout and dense output", tools: ["TensorFlow", "Keras"] },
            { step: 4, title: "Autoencoder Training", description: "Trained LSTM Autoencoder on benign traffic; anomalies flagged by reconstruction error", tools: ["TensorFlow", "Keras"] },
            { step: 5, title: "Comparative Analysis", description: "Benchmarked against Random Forest and KNN on identical feature sets", tools: ["Scikit-learn", "Matplotlib"] },
            { step: 6, title: "Evaluation", description: "Computed precision/recall curves, confusion matrices, and ROC-AUC scores", tools: ["Scikit-learn", "Seaborn"] },
        ],
        technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "LSTM", "Autoencoder"],
        dataset: "NSL-KDD + CICIDS2017 subsets",
        githubUrl: "#",
        featured: false,
        completedDate: "January 2025",
        color: "from-emerald-600 to-teal-500",
        icon: "🧠",
    },
];

export const getCaseStudyById = (id: string) =>
    caseStudies.find((cs) => cs.id === id);

export const getFeaturedCaseStudies = () =>
    caseStudies.filter((cs) => cs.featured);
