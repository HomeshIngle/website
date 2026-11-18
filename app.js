/* ============================================================
   FOODRESCUE – app.js
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Tab switching (Sign-up form) ----
function switchTab(type) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.register-form').forEach(f => f.classList.remove('active'));

  if (type === 'donor') {
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.getElementById('donorForm').classList.add('active');
  } else {
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    document.getElementById('ngoForm').classList.add('active');
  }
}

// ---- Login Modal ----
const loginModal = document.getElementById('loginModal');

function showLogin() {
  loginModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function hideLogin() {
  loginModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Open modal when Login button in navbar is clicked
document.querySelectorAll('a[href="#login"]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
  });
});

// Close modal when clicking overlay background
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) hideLogin();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideLogin();
});

// ---- Toast notification ----
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function showAlert(msg) {
  showToast('✅ ' + msg);
}

// ---- Form handlers ----
function handleSignup(e, type) {
  e.preventDefault();
  const label = type === 'donor' ? 'Donor account created! Welcome to FoodRescue 🎉' : 'You\'re in! Welcome to the FoodRescue volunteer network 💚';
  showToast('✅ ' + label);
  e.target.reset();
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 2000);
}

function handleLogin(e) {
  e.preventDefault();
  hideLogin();
  showToast('✅ Logged in successfully! Welcome back 👋');
}

function handleContact(e) {
  e.preventDefault();
  showToast('📨 Message sent! We\'ll get back to you within 24 hours.');
  e.target.reset();
}

// ---- Animated counters ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Trigger counters when section enters viewport
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#login') return; // handled by modal
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Scroll-reveal animation ----
const revealEls = document.querySelectorAll(
  '.step-card, .feature-card, .impact-card, .team-card, .segment-card, .pricing-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ---- Active nav link highlighting on scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--green-dark)';
      a.style.background = 'var(--green-light)';
    }
  });
});

console.log('%c🍱 FoodRescue – Rescue Food. Fight Hunger. Save the Planet.', 'color: #22c55e; font-weight: bold; font-size: 14px;');

