/**
 * Aman Ansari Portfolio - Core Client JavaScript
 * Pure Vanilla JavaScript: Theme, Mobile Menu, Scrollspy, Skills Filtering, Contact Form & EmailJS
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initSkillsFilter();
  initContactForm();
  initCodingPlatforms();
});

/* ─── Theme Management (Dark / Light) ─── */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll("#theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Default to stored theme, or system preference (or dark as default fallback)
  const isDark = storedTheme !== null ? storedTheme === "dark" : (systemQuery.matches ?? true);
  document.documentElement.classList.toggle("dark", isDark);
  updateThemeIcon(isDark);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const willBeDark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", willBeDark);
      localStorage.setItem("theme", willBeDark ? "dark" : "light");
      updateThemeIcon(willBeDark);
    });
  });

  // Listen to OS theme changes if user hasn't set an explicit preference
  systemQuery.addEventListener("change", (e) => {
    if (localStorage.getItem("theme") === null) {
      document.documentElement.classList.toggle("dark", e.matches);
      updateThemeIcon(e.matches);
    }
  });
}

function updateThemeIcon(isDark) {
  const sunIcons = document.querySelectorAll(".lucide-sun, #theme-icon-sun");
  const moonIcons = document.querySelectorAll(".lucide-moon, #theme-icon-moon");
  const tooltips = document.querySelectorAll("#theme-tooltip, #theme-toggle span");

  sunIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove("hidden");
      icon.style.display = "";
    } else {
      icon.classList.add("hidden");
      icon.style.display = "none";
    }
  });

  moonIcons.forEach(icon => {
    if (isDark) {
      icon.classList.add("hidden");
      icon.style.display = "none";
    } else {
      icon.classList.remove("hidden");
      icon.style.display = "";
    }
  });

  tooltips.forEach(t => {
    t.textContent = isDark ? "Light mode" : "Dark mode";
  });
}

/* ─── Navigation, Scrollspy & Mobile Menu ─── */
function initNavigation() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuLines = mobileMenuBtn?.querySelectorAll("span");

  if (mobileMenuBtn && mobileMenu) {
    let isOpen = false;

    mobileMenuBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      mobileMenu.classList.toggle("hidden", !isOpen);
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));

      if (menuLines && menuLines.length === 3) {
        if (isOpen) {
          menuLines[0].style.transform = "rotate(45deg) translateY(-1px)";
          menuLines[1].style.opacity = "0";
          menuLines[2].style.transform = "rotate(-45deg) translateY(1px)";
        } else {
          menuLines[0].style.transform = "none";
          menuLines[1].style.opacity = "1";
          menuLines[2].style.transform = "none";
        }
      }
    });

    // Close on navigation link click
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        isOpen = false;
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        if (menuLines && menuLines.length === 3) {
          menuLines[0].style.transform = "none";
          menuLines[1].style.opacity = "1";
          menuLines[2].style.transform = "none";
        }
      });
    });
  }

  // Active section indicator on scroll (Scrollspy)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header nav .nav-link");

  function onScroll() {
    let current = "hero";
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top >= -220 && top <= 260) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href === `#${current}` || href === `/#${current}`) {
        link.classList.add("nav-link-active");
      } else if (href.startsWith("#") || href.startsWith("/#")) {
        link.classList.remove("nav-link-active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ─── Interactive Skills Category Filtering ─── */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll("[data-skill-filter]");
  const skillTiles = document.querySelectorAll(".skill-grid-item");

  if (!filterButtons.length || !skillTiles.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.skillFilter;

      // Update button styling matching active state
      filterButtons.forEach(b => {
        b.className = "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border bg-transparent text-muted-foreground border-ink/15 hover:border-ink/30 hover:text-foreground cursor-pointer";
      });
      btn.className = "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border bg-foreground text-background border-foreground cursor-pointer";

      // Filter skill tiles
      skillTiles.forEach((tile, index) => {
        const cat = tile.dataset.category;
        const matches = filter === "all" || cat === filter;

        if (matches) {
          tile.style.display = "";
          tile.style.animation = `fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.02}s`;
        } else {
          tile.style.display = "none";
        }
      });
    });
  });
}

/* ─── Contact Form with EmailJS & Netlify fallback ─── */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const EMAILJS_PUBLIC_KEY = "ZXR52sn5HeoeR55nF";
  const EMAILJS_SERVICE_ID = "service_g8xhg9n";
  const EMAILJS_TEMPLATE_ID = "template_eiulj7m";

  if (window.emailjs) {
    try {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (err) {
      console.warn("EmailJS init note:", err);
    }
  }

  const nameInput = form.querySelector('input[name="name"], #name');
  const emailInput = form.querySelector('input[name="email"], #email');
  const messageInput = form.querySelector('textarea[name="message"], #message');
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusContainer = document.getElementById("contact-status");

  function isFormValid() {
    const isNameValid = (nameInput?.value.trim().length || 0) >= 2;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput?.value.trim() || "");
    const isMessageValid = (messageInput?.value.trim().length || 0) >= 10;
    return isNameValid && isEmailValid && isMessageValid;
  }

  function updateButtonState() {
    if (submitBtn) {
      const valid = isFormValid();
      submitBtn.disabled = !valid;
      submitBtn.style.opacity = valid ? "1" : "0.7";
      submitBtn.style.cursor = valid ? "pointer" : "not-allowed";
    }
  }

  // Visual validation cues on blur
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener("input", updateButtonState);
    input.addEventListener("blur", () => {
      if (input === nameInput && input.value.trim().length > 0 && input.value.trim().length < 2) {
        input.classList.add("border-red-400");
      } else if (input === emailInput && input.value.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.classList.add("border-red-400");
      } else if (input === messageInput && input.value.trim().length > 0 && input.value.trim().length < 10) {
        input.classList.add("border-red-400");
      } else {
        input.classList.remove("border-red-400");
      }
      updateButtonState();
    });
  });

  updateButtonState();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const message = messageInput?.value.trim() || "";

    if (!name || !email || !message) {
      showStatus("Please complete all required fields (name, valid email, and message).", "error");
      return;
    }

    if (message.length < 10) {
      showStatus("Please provide a message with at least 10 characters.", "error");
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <div class="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin mr-3"></div>
        <span>Sending...</span>
      `;
    }

    let sentVia = null;

    // 1. Try sending via EmailJS
    if (window.emailjs) {
      try {
        const templateParams = {
          name: name,
          email: email,
          message: message,
          from_name: name,
          from_email: email,
          to_name: "Aman Ansari",
          to_email: "iamamanansari786a@gmail.com"
        };

        const res = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        if (res.status === 200 || res.text === "OK") {
          sentVia = "emailjs";
        }
      } catch (emailErr) {
        console.warn("EmailJS attempt result:", emailErr);
      }
    }

    // 2. Try Netlify Form POST submission
    if (!sentVia) {
      try {
        const formData = new FormData(form);
        const netlifyRes = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        });
        if (netlifyRes.ok) {
          sentVia = "netlify";
        }
      } catch (netlifyErr) {
        console.warn("Netlify form attempt result:", netlifyErr);
      }
    }

    // 3. Fallback to client mailto link
    if (!sentVia) {
      const mailtoLink = `mailto:iamamanansari786a@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoLink;
      showStatus("Opening your email client to send your message. Please click send in your mail app!", "info");
    } else {
      showStatus("Message sent successfully! I'll get back to you soon. ✨", "success");
      form.reset();
    }

    if (submitBtn) {
      submitBtn.innerHTML = `<span>Send message</span>`;
      updateButtonState();
    }
  });

  function showStatus(text, type) {
    if (!statusContainer) return;
    const isSuccess = type === "success";
    const isInfo = type === "info";
    
    let colorClasses = "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800";
    if (isSuccess) {
      colorClasses = "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-800";
    } else if (isInfo) {
      colorClasses = "bg-accent/10 text-accent border border-accent/30";
    }

    statusContainer.className = `flex items-center p-4 rounded-xl mt-4 ${colorClasses}`;

    statusContainer.innerHTML = `
      <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${isSuccess
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
          : isInfo
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
      </svg>
      <p class="text-sm font-medium">${text}</p>
    `;
    statusContainer.classList.remove("hidden");

    setTimeout(() => {
      statusContainer.classList.add("hidden");
    }, 8000);
  }
}

/* ─── Coding Platform Tabs (Key Metrics & Progress Bars) ─── */
function initCodingPlatforms() {
  const tabButtons = document.querySelectorAll('[role="tablist"] [role="tab"]');
  const tabPanels = {
    "chart-panel-trends": document.getElementById("chart-panel-trends"),
    "chart-panel-progress": document.getElementById("chart-panel-progress")
  };

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");
      tabButtons.forEach(b => {
        b.setAttribute("aria-selected", "false");
        b.className = "px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer";
      });

      btn.setAttribute("aria-selected", "true");
      btn.className = "px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent bg-accent text-accent-foreground shadow-lg cursor-pointer";

      Object.entries(tabPanels).forEach(([id, panel]) => {
        if (!panel) return;
        if (id === targetId) {
          panel.classList.remove("hidden");
        } else {
          panel.classList.add("hidden");
        }
      });
    });
  });
}
