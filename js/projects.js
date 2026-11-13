/**
 * Projects Dataset and Interactive Filter/Search/Modal Controller
 */

const projectsData = [
  {
    id: "hr-system",
    title: "HR System / ATS Platform",
    category: "web",
    featured: true,
    completedDate: "Updated October 2026",
    description: "A high-performance, multi-tenant applicant-tracking system with resume parsing, duplicate detection, and secure recruitment workflows.",
    longDescription: "A modern enterprise ATS built around Java 21 and Spring Boot. It uses PostgreSQL Row-Level Security for tenant isolation, Redis for caching and pub/sub, Flyway migrations, JobRunr background processing, and a React portal for HR and client workflows. The document pipeline supports Apache PDFBox and Tess4J OCR for resilient resume ingestion.",
    technologies: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "React", "Docker"],
    githubUrl: "https://github.com/ansariamann/hr-system",
    highlights: [
      "Multi-tenant architecture with PostgreSQL Row-Level Security for strict client isolation",
      "Automated resume parsing with PDF and OCR fallback support",
      "Candidate pipeline management with duplicate detection",
      "Separate HR and client portals backed by Spring Boot APIs",
      "Containerized services with health, API, and worker dashboards"
    ]
  },
  {
    id: "tasbih-counter",
    title: "Tasbih Counter",
    category: "web",
    featured: true,
    completedDate: "Updated May 2026",
    description: "A polished digital tasbih app with persistent counting, progress tracking, vibration feedback, and audio chimes.",
    longDescription: "A devotional utility that turns a simple tasbih counter into a smooth daily-use experience. It persists count, total dhikr, target, multiplier, sound, and vibration preferences in local storage, then layers on animated feedback, completion chimes, progress visualization, and a mobile-friendly interface.",
    technologies: ["React", "Vite", "shadcn/ui", "Framer Motion", "LocalStorage"],
    liveUrl: "https://tasbiy.netlify.app",
    githubUrl: "https://github.com/ansariamann/tasbih_counter",
    highlights: [
      "Full offline support and zero-latency localStorage persistence",
      "Tactile haptic feedback and custom audio synthesis for completion cues",
      "Responsive, touch-optimized fluid interface with dark mode"
    ]
  },
  {
    id: "cart-calculator",
    title: "Cart Calculator / QuickMart",
    category: "web",
    featured: true,
    completedDate: "Updated April 2026",
    description: "A grocery-list and budget companion with barcode scanning, automatic totals, saved favorites, and transaction history.",
    longDescription: "QuickMart helps shoppers build and manage grocery lists while tracking totals, taxes, discounts, and spending. It includes camera-based barcode scanning, favorites for recurring items, transaction history, and installable offline-friendly app support.",
    technologies: ["React", "JavaScript", "shadcn/ui", "html5-qrcode", "PWA"],
    githubUrl: "https://github.com/ansariamann/cart-calculator",
    highlights: [
      "Client-side barcode scanner integration with camera stream access",
      "Automatic totals, taxes, discounts, and budget tracking",
      "Favorites and transaction history for repeat shopping trips",
      "Installable PWA support for a mobile-friendly experience"
    ]
  },
  {
    id: "mini-crm",
    title: "Mini CRM",
    category: "web",
    featured: true,
    completedDate: "June 2025",
    description: "A compact Laravel CRM for managing employees linked to companies, with full CRUD operations, authentication, and relational data management.",
    longDescription: "Built a complete CRM application in Laravel for managing employees and their associated companies. The app features login-based access control, full CRUD for both employees and companies, relational data where employees belong to companies (with cascading deletes), factory-seeded demo data, and Blade-based views.",
    technologies: ["PHP", "Laravel", "MySQL", "Blade", "Vite", "Bootstrap"],
    githubUrl: "https://github.com/ansariamann/mini-crm",
    highlights: [
      "Full CRUD for both companies and employees with RESTful resource routes",
      "Relational data model with cascading deletes on company removal",
      "Role-based authentication flow with seeded admin credentials",
      "Seeders and factories for instant demo dataset generation"
    ]
  },
  {
    id: "smartshield-malware",
    title: "SmartShield Malware & Phishing Detector",
    category: "ml",
    featured: true,
    completedDate: "April 2025",
    description: "ML-powered cybersecurity solution identifying malicious PE executables and phishing URLs via a clean web interface.",
    longDescription: "Developed a dual-engine security system using Random Forest classifiers. Extracted structural PE header features, section entropy, and import tables for binary classification, and 25 lexical features for phishing URL identification. Packaged as a lightweight Flask API with an intuitive dashboard.",
    technologies: ["Python", "Random Forest", "Flask", "JavaScript", "HTML/CSS", "pefile"],
    githubUrl: "https://github.com/ansariamann/MALWARE",
    highlights: [
      "94.7% accuracy with sub-3% false negative rate for executable binaries",
      "92% precision on real-time lexical phishing URL detection",
      "Complete end-to-end analysis delivered in under 2 seconds"
    ]
  },
  {
    id: "ddos-detection",
    title: "DDoS Attack Detection & Mitigation",
    category: "ml",
    featured: true,
    completedDate: "September 2024",
    description: "High-accuracy multi-model ensemble detection system classifying network intrusions across 12 DDoS vectors on CICDDoS2019 dataset.",
    longDescription: "Engineered an intelligent cybersecurity solution utilizing ExtraTrees feature selection to compress 87 high-dimensional flow features down to 20 critical features without sacrificing accuracy. Formed a majority-voting ensemble with Decision Trees, Random Forests, SVM, and LSTM networks to reach 96% accuracy while achieving 4× faster real-time inference.",
    technologies: ["Python", "Scikit-Learn", "TensorFlow", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      "96% detection accuracy across 12 distinct DDoS attack profiles",
      "Feature space reduced from 87 to 20 via ExtraTrees importance scoring",
      "4× inference acceleration supporting 200ms real-time classification",
      "18% reduction in false positives through MV-4 ensemble voting"
    ]
  },
  {
    id: "hospital-management",
    title: "Hospital Management System",
    category: "fullstack",
    featured: true,
    completedDate: "December 2024",
    description: "Enterprise healthcare portal managing patient records, appointment scheduling, billing, and staff allocations.",
    longDescription: "A comprehensive hospital administration system built with Java Spring Boot and MySQL. Includes role-based security (Doctor, Patient, Admin), automated prescription logging, appointment scheduling, and invoice generation with report exports.",
    technologies: ["Java", "Spring Boot", "Spring Security", "MySQL", "Thymeleaf", "Bootstrap"],
    highlights: [
      "Role-Based Access Control (RBAC) securing medical history",
      "Automated appointment booking and calendar coordination",
      "Transactional billing system generating PDF invoices"
    ]
  }
];

// Initialize Projects Page Logic if on projects.html
let lastFocusedTrigger = null;

document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) return;

  const filterButtons = document.querySelectorAll("[data-project-filter]");
  const searchInput = document.getElementById("project-search");
  let currentCategory = "all";
  let searchQuery = "";

  function renderProjects() {
    projectsGrid.innerHTML = "";
    
    const filtered = projectsData.filter((project) => {
      const matchesCategory = currentCategory === "all" || project.category === currentCategory;
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery) ||
        (project.longDescription && project.longDescription.toLowerCase().includes(searchQuery)) ||
        project.technologies.some(t => t.toLowerCase().includes(searchQuery)) ||
        (project.highlights && project.highlights.some(h => h.toLowerCase().includes(searchQuery)));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-muted-foreground">
          <p class="text-lg font-medium">No projects found matching your criteria.</p>
          <button id="reset-filters" class="mt-4 px-4 py-2 text-sm text-accent underline cursor-pointer">Reset filters</button>
        </div>
      `;
      document.getElementById("reset-filters")?.addEventListener("click", () => {
        currentCategory = "all";
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        filterButtons.forEach(b => b.classList.remove("bg-foreground", "text-background"));
        document.querySelector("[data-project-filter='all']")?.classList.add("bg-foreground", "text-background");
        renderProjects();
      });
      return;
    }

    filtered.forEach((project, idx) => {
      const card = document.createElement("article");
      card.className = "project-archive-card surface-card p-6 sm:p-7 flex flex-col justify-between group hover:border-accent/40 hover:shadow-card-hover transition-all duration-300";
      card.style.animation = `fadeIn 0.3s ease forwards ${idx * 0.05}s`;

      const techBadges = project.technologies.map(t => `<span class="tag text-[10px] py-1 px-2.5">${t}</span>`).join(" ");

      card.innerHTML = `
        <div>
          <div class="project-card-top flex items-center justify-between gap-2 mb-5">
            <span class="project-number">0${idx + 1}</span>
            <span class="font-mono text-xs uppercase tracking-wider text-muted-foreground">${project.completedDate}</span>
            ${project.featured ? '<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/20">Featured</span>' : ''}
          </div>
          <h3 class="project-card-title text-xl font-bold text-foreground group-hover:text-accent transition-colors">${project.title}</h3>
          <p class="mt-3 text-muted-foreground text-sm leading-relaxed">${project.description}</p>
          <div class="flex flex-wrap gap-1.5 mt-4">
            ${techBadges}
          </div>
        </div>

        <div class="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
          <button data-open-modal="${project.id}" class="font-mono text-xs font-semibold uppercase tracking-wider text-accent hover:underline flex items-center gap-1 cursor-pointer">
            Details <span>&rarr;</span>
          </button>
          <div class="flex items-center gap-3">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono font-medium text-foreground hover:text-accent flex items-center gap-1">
                Code &nearr;
              </a>` : ''}
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-accent text-accent-foreground hover:bg-accent-hover transition-colors">
                Live &nearr;
              </a>` : ''}
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Attach delegated modal open listeners
    projectsGrid.querySelectorAll("[data-open-modal]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-open-modal");
        lastFocusedTrigger = btn;
        openProjectModal(id);
      });
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.className = "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border bg-transparent text-muted-foreground border-ink/15 hover:border-ink/30 hover:text-foreground cursor-pointer";
      });
      btn.className = "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border bg-foreground text-background border-foreground cursor-pointer";
      currentCategory = btn.dataset.projectFilter;
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }

  renderProjects();

  // Auto-open modal if highlight parameter is present in URL
  const urlParams = new URLSearchParams(window.location.search);
  const highlightParam = urlParams.get('highlight');
  if (highlightParam) {
    const numMap = { "6": "hr-system", "5": "tasbih-counter", "4": "cart-calculator", "7": "mini-crm" };
    const targetId = numMap[highlightParam] || highlightParam;
    setTimeout(() => {
      openProjectModal(targetId);
    }, 250);
  }

});

/* ─── Modal Functionality & Accessible Focus Trap ─── */
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  let modal = document.getElementById("project-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "project-modal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const highlightsHtml = project.highlights 
    ? project.highlights.map(h => `<li class="flex items-start gap-2 text-sm text-foreground"><span class="text-accent font-bold">✓</span> ${h}</li>`).join("")
    : "";

  const techBadges = project.technologies.map(t => `<span class="tag text-xs">${t}</span>`).join(" ");

  modal.innerHTML = `
    <div class="modal-content p-6 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="flex items-start justify-between border-b border-ink/10 pb-4 mb-5">
        <div>
          <span class="font-mono text-xs uppercase tracking-wider text-muted-foreground">${project.completedDate} &middot; ${project.category.toUpperCase()}</span>
          <h2 id="modal-title" class="text-2xl sm:text-3xl font-bold text-foreground mt-1">${project.title}</h2>
        </div>
        <button id="modal-close-btn" aria-label="Close dialog" class="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-foreground hover:bg-ink/5 text-lg font-bold cursor-pointer">&times;</button>
      </div>

      <div class="space-y-5">
        <div>
          <h3 class="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Overview</h3>
          <p class="text-muted-foreground leading-relaxed text-sm sm:text-base">${project.longDescription || project.description}</p>
        </div>

        ${highlightsHtml ? `
        <div>
          <h3 class="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Highlights</h3>
          <ul class="space-y-2 mt-2">
            ${highlightsHtml}
          </ul>
        </div>` : ''}

        <div>
          <h3 class="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Technologies</h3>
          <div class="flex flex-wrap gap-2 mt-1">
            ${techBadges}
          </div>
        </div>

        <div class="pt-6 border-t border-ink/10 flex flex-wrap gap-4 justify-end">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary !text-sm !py-2.5 !px-5 !min-h-[44px]">Source Code &nearr;</a>` : ''}
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary !text-sm !py-2.5 !px-5 !min-h-[44px]">Live Demo &nearr;</a>` : ''}
          <button id="modal-footer-close-btn" class="btn-secondary !bg-transparent !text-foreground !border-ink/20 !text-sm !py-2.5 !px-5 !min-h-[44px] cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Modal event listeners
  const modalContent = modal.querySelector(".modal-content");
  modalContent.addEventListener("click", (e) => e.stopPropagation());

  modal.addEventListener("click", closeProjectModal);
  modal.querySelector("#modal-close-btn")?.addEventListener("click", closeProjectModal);
  modal.querySelector("#modal-footer-close-btn")?.addEventListener("click", closeProjectModal);

  // Focus the close button or first focusable element inside modal
  const firstFocusable = modal.querySelector("#modal-close-btn");
  firstFocusable?.focus();

  // Escape key handler & focus trap
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeProjectModal();
      return;
    }
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  modal._handleKeyDown = handleKeyDown;
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (modal._handleKeyDown) {
      document.removeEventListener("keydown", modal._handleKeyDown);
      modal._handleKeyDown = null;
    }
  }
  if (lastFocusedTrigger) {
    lastFocusedTrigger.focus();
    lastFocusedTrigger = null;
  }
}
