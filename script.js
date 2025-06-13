// Mobile Menu Functionality
class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById("mobileMenuBtn");
    this.menu = document.getElementById("mobileMenu");
    this.closeBtn = document.getElementById("mobileMenuClose");
    this.overlay = null;
    this.isOpen = false;

    this.init();
  }

  init() {
    // Create overlay
    this.createOverlay();

    // Event listeners
    this.menuBtn?.addEventListener("click", () => this.toggle());
    this.closeBtn?.addEventListener("click", () => this.close());
    this.overlay?.addEventListener("click", () => this.close());

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Close when clicking on nav links
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.close();
      }
    });
  }

  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.className = "mobile-menu-overlay";
    document.body.appendChild(this.overlay);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.menu?.classList.add("active");
    this.overlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.isOpen = false;
    this.menu?.classList.remove("active");
    this.overlay?.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Handle all anchor links
    document.addEventListener("click", (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const href = target.getAttribute("href");
        const element = document.querySelector(href);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  }
}

// Newsletter Form Handler
class NewsletterForm {
  constructor() {
    this.form = document.querySelector(".newsletter-form");
    this.input = document.querySelector(".newsletter-input");
    this.button = this.form?.querySelector("button");

    this.init();
  }

  init() {
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.input?.value.trim();

    if (!email) {
      this.showMessage("Please enter your email address.", "error");
      return;
    }

    if (!this.isValidEmail(email)) {
      this.showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    this.button.disabled = true;
    this.button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Subscribing...
        `;

    setTimeout(() => {
      this.showMessage("Thank you for subscribing!", "success");
      this.input.value = "";
      this.button.disabled = false;
      this.button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"/>
                    <path d="M22 2 11 13"/>
                </svg>
                Subscribe
            `;
    }, 2000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(message, type) {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
            <div class="toast-content">
                <span>${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;

    // Add styles
    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            background: ${type === "success" ? "#22c55e" : "#ef4444"};
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    // Auto remove
    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);

    // Close button
    const closeBtn = toast.querySelector(".toast-close");
    closeBtn?.addEventListener("click", () => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    });
  }
}

// Scroll to Top Functionality
class ScrollToTop {
  constructor() {
    this.button = null;
    this.init();
  }

  init() {
    this.createButton();
    this.handleScroll();
    window.addEventListener("scroll", () => this.handleScroll());
  }

  createButton() {
    this.button = document.createElement("button");
    this.button.className = "scroll-to-top";
    this.button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        `;

    this.button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
            background: var(--forest-600);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 100;
        `;

    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    this.button.addEventListener("mouseenter", () => {
      this.button.style.background = "var(--forest-700)";
      this.button.style.transform = "scale(1.1)";
    });

    this.button.addEventListener("mouseleave", () => {
      this.button.style.background = "var(--forest-600)";
      this.button.style.transform = "scale(1)";
    });

    document.body.appendChild(this.button);
  }

  handleScroll() {
    const scrolled = window.pageYOffset > 300;

    if (scrolled) {
      this.button.style.opacity = "1";
      this.button.style.visibility = "visible";
    } else {
      this.button.style.opacity = "0";
      this.button.style.visibility = "hidden";
    }
  }
}

// Intersection Observer for Animations
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          root: null,
          rootMargin: "0px 0px -100px 0px",
          threshold: 0.1,
        },
      );

      this.observeElements();
    }
  }

  observeElements() {
    const elements = document.querySelectorAll(
      ".mission-card, .program-card, .update-card, .impact-stat",
    );
    elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Add initial styles for animated elements
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .mission-card,
        .program-card,
        .update-card,
        .impact-stat {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            line-height: 1;
        }
    `;
  document.head.appendChild(style);
}

// Counter Animation for Impact Numbers
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll(".impact-number");
    this.observer = null;
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        },
      );

      this.counters.forEach((counter) => this.observer.observe(counter));
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateCounter(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateCounter(element) {
    const target = element.textContent;
    const number = target.replace(/[^0-9.]/g, "");
    const suffix = target.replace(/[0-9.,]/g, "");
    const numericValue = parseFloat(number.replace(",", ""));

    let currentValue = 0;
    const increment = numericValue / 60; // 60 frames for 1 second animation
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      currentValue = numericValue * this.easeOutQuart(progress);

      let displayValue = Math.floor(currentValue);
      if (number.includes(".")) {
        displayValue = currentValue.toFixed(1);
      }

      // Add commas for thousands
      if (displayValue >= 1000) {
        displayValue = displayValue
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      element.textContent = displayValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target; // Ensure final value is exact
      }
    };

    requestAnimationFrame(updateCounter);
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
}

// Loading Animation
class LoadingAnimation {
  constructor() {
    this.init();
  }

  init() {
    // Add loading animation to body
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";

    window.addEventListener("load", () => {
      setTimeout(() => {
        document.body.style.opacity = "1";
      }, 100);
    });
  }
}

// Active Navigation Link Highlighter
class ActiveNavigation {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    this.init();
  }

  init() {
    // Set active link based on current page
    const currentPath = window.location.pathname;

    this.navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      // Remove existing active class
      link.classList.remove("active");

      // Add active class for current page
      if (
        href === currentPath ||
        (currentPath === "/" && href === "#") ||
        (currentPath === "/index.html" && href === "#")
      ) {
        link.classList.add("active");
      }
    });
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add animation styles first
  addAnimationStyles();

  // Initialize all components
  new LoadingAnimation();
  new MobileMenu();
  new SmoothScroll();
  new NewsletterForm();
  new ScrollToTop();
  new ScrollAnimations();
  new CounterAnimation();
  new ActiveNavigation();

  // Console log for developers
  console.log("🌱 Save Oxygen Foundation website loaded successfully!");
  console.log("🌍 Together, we can make a difference for our planet.");
});

// Error handling for any uncaught errors
window.addEventListener("error", function (e) {
  console.error("An error occurred:", e.error);
});

// Handle service worker registration if available
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // Service worker registration would go here if implemented
    console.log("Service Worker support detected");
  });
}

// Accessibility improvements
document.addEventListener("keydown", function (e) {
  // Skip to main content on Tab key
  if (
    e.key === "Tab" &&
    !e.shiftKey &&
    document.activeElement === document.body
  ) {
    const main = document.querySelector("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.removeAttribute("tabindex");
    }
  }
});

// Preload critical images (if any were added)
function preloadImages() {
  const imageUrls = [
    // Add any critical image URLs here
  ];

  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === "navigation") {
      console.log(
        "Page load time:",
        entry.loadEventEnd - entry.loadEventStart,
        "ms",
      );
    }
  }
});

if ("PerformanceObserver" in window) {
  perfObserver.observe({ entryTypes: ["navigation"] });
}
