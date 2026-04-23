// ===== TRILOGY FLORAL - MAIN JS =====

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile nav toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navWrapper = document.querySelector('.nav-wrapper');
  if (hamburger && navWrapper) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navWrapper.classList.toggle('open');
      document.body.style.overflow = navWrapper.classList.contains('open') ? 'hidden' : '';
    });
  }

  // --- Mobile dropdown toggles ---
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const menu = link.nextElementSibling;
        if (menu) menu.classList.toggle('open');
      }
    });
  });

  // --- Close mobile nav on link click ---
  document.querySelectorAll('.dropdown-menu a, .dropdown-mega a').forEach(link => {
    link.addEventListener('click', () => {
      if (navWrapper) navWrapper.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Hero parallax background slow-zoom ---
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    requestAnimationFrame(() => heroBg.classList.add('loaded'));
  }

  // --- Fade-in on scroll ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // --- Cookie banner ---
  const banner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-accept');
  if (banner && !localStorage.getItem('cookies-accepted')) {
    setTimeout(() => banner.classList.add('show'), 1500);
  }
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      banner.classList.remove('show');
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
  });

  // --- Lazy loading images ---
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => imgObs.observe(img));
  } else {
    lazyImages.forEach(img => { img.src = img.dataset.src; });
  }

  // --- Floating buy button show/hide on homepage ---
  const floatingBuy = document.querySelector('.floating-buy');
  if (floatingBuy) {
    floatingBuy.style.opacity = '0';
    floatingBuy.style.transform = 'translateY(20px)';
    const showFloat = () => {
      if (window.scrollY > 400) {
        floatingBuy.style.opacity = '1';
        floatingBuy.style.transform = 'translateY(0)';
      }
    };
    window.addEventListener('scroll', showFloat, { passive: true });
    showFloat();
  }
});
