// ========================================
// TYPING ANIMATION
// ========================================

const typingTexts = [
  "A Passionate CSE Student 💻",
  "2★ on CodeChef",
  "1111 max on Codeforces",
  "A Competitive Programmer 🏆",
  "A Problem Solver 🔍",
  "A Lifelong Learner 📚"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeText() {
  if (prefersReducedMotion) {
    // Show the first text statically
    const typingElement = document.getElementById('typingText');
    if (typingElement) typingElement.textContent = typingTexts[0];
    return;
  }

  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typingSpeed = 500; // Pause before next text
  }

  setTimeout(typeText, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeText, 1000);
});

// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Add scroll effect to navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// THEME TOGGLE
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
  themeToggle.setAttribute('aria-label', 'Switch to dark mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
    localStorage.setItem('theme', 'dark');
  }
});

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: prefersReducedMotion ? 'instant' : 'smooth'
      });
    }
  });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections (skip animation if reduced motion)
if (!prefersReducedMotion) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Observe project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

// ========================================
// SCROLL INDICATOR
// ========================================

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  if (!scrollIndicator) return;
  if (window.pageYOffset > 300) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.visibility = 'hidden';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.visibility = 'visible';
  }
});

// ========================================
// YEAR AUTO-UPDATE (with no-JS fallback in HTML)
// ========================================

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

const heroBackground = document.querySelector('.hero-background');

if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroBackground && scrolled < window.innerHeight) {
      heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
}

// ========================================
// FORM VALIDATION & FEEDBACK
// ========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
    submitButton.disabled = true;

    // Reset button after 3 seconds (form handles actual submission)
    setTimeout(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 3000);
  });
}

// ========================================
// COMPETITIVE PROGRAMMING DATA
// ========================================

/**
 * Single source of truth for CP data.
 * TODO fields: fill in your real numbers, then the UI renders them automatically.
 * If a value is TODO (null/undefined), that row is hidden.
 */
const cp = {
  
  platforms: [
    {
      name: "Codeforces",
      handle: "abdmahdi56",
      url: "https://codeforces.com/profile/abdmahdi56",
      maxRating: "1111",   // TODO: enter your max Codeforces rating (e.g. 1111)
      maxTitle: "Newbie",    // TODO: enter your max title (e.g. "Newbie")
      solved: 307       // TODO: enter number of problems solved
    },
    {
      name: "CodeChef",
      handle: "abdmahdi56",
      url: "https://www.codechef.com/users/abdmahdi56",
      maxRating: "1426",   // TODO: enter your max CodeChef rating
      maxTitle: "2★",    // TODO: enter your max title (e.g. "2★")
      solved: 226       // TODO: enter number of problems solved
    },
    {
      name: "Serious OJ",
      handle: "mahdi256",
      url: "https://serious-oj.com/user/mahdi256",
      maxRating: "374",   // TODO: enter your max CodeChef rating
      maxTitle: null,    // TODO: enter your max title (e.g. "2★")
      solved: 15       // TODO: enter number of problems solved
    },
    {
      name: "Vjudge",
      handle: "mahdi56",
      url: "https://vjudge.net/user/mahdi56",
      maxRating: null,   // TODO: enter your max CodeChef rating
      maxTitle: null,    // TODO: enter your max title (e.g. "2★")
      solved: 13       // TODO: enter number of problems solved
    }
    // TODO: add more platforms here, e.g.:
    // { name: "LeetCode", handle: "...", url: "...", maxRating: null, maxTitle: null, solved: null }
  ],
  achievements: [
    {
      contest: "ILUPC-Intra LU Programming Contest",
      year: 2026,
      rank: "Runner-up",
      of: null,    // TODO: total number of teams/participants
      type: "Team: LU_Return0",
      certUrl: "img/ilupc-certificate.png"
    },
    {
      contest: "SUST IUPC",
      year: 2026,
      rank: "101st",
      of: null,    // TODO: total participants
      type: "Team: LU_Sukoon",  // TODO: "Individual" or "Team"
      certUrl: "img/sust-iupc-certificate.png"
    },
    {
      contest: "IEEE Junior Programming Contest",
      year: 2025,
      rank: "Top 10",
      of: null,    // TODO: total participants
      type: null,  // TODO: "Individual" or "Team"
      certUrl: "docs/ieee-junior-contest-certificate.pdf"
    }
    
  ]
};

function renderCP() {
  // --- Platform cards ---
  const platformContainer = document.getElementById('cp-platforms');
  if (platformContainer) {
    platformContainer.innerHTML = cp.platforms.map(p => {
      const ratingRow = (p.maxRating != null)
        ? `<li><span>Max Rating</span> <strong>${p.maxRating}</strong></li>` : '';
      const titleRow  = (p.maxTitle  != null)
        ? `<li><span>Max Title</span>  <strong>${p.maxTitle}</strong></li>`  : '';
      const solvedRow = (p.solved    != null)
        ? `<li><span>Solved</span>     <strong>${p.solved} problems</strong></li>` : '';

      return `
        <div class="cp-card">
          <p class="cp-card-name">${p.name}</p>
          <ul class="cp-card-meta" aria-label="${p.name} statistics">
            <li><span>Handle</span> <strong>@${p.handle}</strong></li>
            ${ratingRow}
            ${titleRow}
            ${solvedRow}
          </ul>
          <a href="${p.url}" target="_blank" rel="noopener noreferrer"
             class="cp-card-link"
             aria-label="View ${p.name} profile of ${p.handle}">
            Visit Profile <i class="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>`;
    }).join('');
  }

  // --- Total solved (sum of known platforms) ---
  const knownSolved = cp.platforms
    .map(p => p.solved)
    .filter(n => n != null);
  const totalEl = document.getElementById('cp-total-solved');
  const breakdownEl = document.getElementById('cp-breakdown');
  if (totalEl) {
    if (knownSolved.length > 0) {
      const total = knownSolved.reduce((a, b) => a + b, 0);
      totalEl.textContent = total + '+';
      if (breakdownEl) {
        const parts = cp.platforms
          .filter(p => p.solved != null)
          .map(p => `${p.solved} on ${p.name}`)
          .join(', ');
        breakdownEl.textContent = `across platforms (${parts})`;
      }
    } else {
      // All TODO — hide the summary row gracefully
      const summaryEl = document.querySelector('.cp-summary');
      if (summaryEl) summaryEl.style.display = 'none';
    }
  }

  // Update About stat
  if (knownSolved.length > 0) {
    const statEl = document.getElementById('stat-solved');
    if (statEl) statEl.textContent = knownSolved.reduce((a, b) => a + b, 0) + '+';
  }

  // --- Contest achievements ---
  const achievementsContainer = document.getElementById('cp-achievements');
  if (achievementsContainer) {
    achievementsContainer.innerHTML = cp.achievements.map(a => {
      const rankStr = a.of != null ? `Rank ${a.rank} / ${a.of}` : `Rank ${a.rank}`;
      const typeStr = a.type != null ? ` · ${a.type}` : '';
      const certBtn = a.certUrl
        ? `<a href="${a.certUrl}" target="_blank" rel="noopener noreferrer"
              class="cert-link" aria-label="View certificate for ${a.contest} ${a.year}">
              <i class="fas fa-certificate" aria-hidden="true"></i> Certificate
           </a>` : '';
      return `
        <li class="cp-achievement-item">
          <span class="cp-achievement-contest">${a.contest} <span aria-label="year">(${a.year})</span></span>
          <span class="cp-achievement-detail">${rankStr}${typeStr}</span>
          ${certBtn}
        </li>`;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', renderCP);

// ========================================
// PERFORMANCE: debounce scroll-heavy fns
// ========================================

function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', debounce(highlightNavigation, 10));

// ========================================
// KEYBOARD ACCESSIBILITY
// ========================================

document.addEventListener('keydown', (e) => {
  // ESC to close mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    navToggle.focus();
  }
});

// Focus first menu item when menu opens
navToggle.addEventListener('click', () => {
  if (navMenu.classList.contains('active')) {
    const firstLink = navMenu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c👋 Hello Developer!', 'color: #00D9FF; font-size: 24px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/abdmahdi56', 'color: #CBD5E1; font-size: 14px;');
console.log('%c💼 Let\'s connect and build something amazing together!', 'color: #00D9FF; font-size: 14px;');
