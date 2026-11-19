document.addEventListener('DOMContentLoaded', () => {
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');

  const authorConnectBtn = document.getElementById('authorConnectBtn');
  const authorUrlsWrapper = document.getElementById('authorUrlsWrapper');

  function openMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.add('is-active');
      mobileNavOverlay.setAttribute('aria-hidden', 'false');
      if (mobileNavToggle) mobileNavToggle.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove('is-active');
      mobileNavOverlay.setAttribute('aria-hidden', 'true');
      if (mobileNavToggle) mobileNavToggle.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function toggleMobileMenu() {
    if (mobileNavOverlay && mobileNavOverlay.classList.contains('is-active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        closeMobileMenu();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.classList.contains('is-active')) {
      closeMobileMenu();
    }
  });

  if (authorConnectBtn && authorUrlsWrapper) {
    authorConnectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = authorUrlsWrapper.classList.toggle('is-expanded');
      authorConnectBtn.innerHTML = isExpanded
        ? 'Close <i class="fas fa-chevron-up"></i>'
        : 'Connect <i class="fas fa-chevron-down"></i>';
    });
  }

  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.icon.sun');
  const moonIcon = document.querySelector('.icon.moon');

  function updateThemeIcons() {
    const isLight = document.documentElement.classList.contains('light-mode');
    if (sunIcon) sunIcon.classList.toggle('visible', isLight);
    if (moonIcon) moonIcon.classList.toggle('visible', !isLight);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      if (isLight) {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('site_theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('site_theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      updateThemeIcons();
    });
  }
  updateThemeIcons();

  const jttBtn = document.getElementById('jump-to-top');
  if (jttBtn) {
    jttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let jttPending = false;
    function updateJtt() {
      if (jttPending) return;
      jttPending = true;
      requestAnimationFrame(() => {
        jttPending = false;
        const scrollable = document.body.scrollHeight > window.innerHeight;
        const notAtTop = window.scrollY > 80;
        jttBtn.classList.toggle('visible', scrollable && notAtTop);
      });
    }

    setTimeout(updateJtt, 100);
    window.addEventListener('scroll', updateJtt, { passive: true });
  }

  // Feed View Switcher (LinkedIn vs Image view on Biography page)
  const btnFeedLinkedIn = document.getElementById('btnFeedLinkedIn');
  const btnFeedImages = document.getElementById('btnFeedImages');
  const feedSection = document.getElementById('linkedin-updates');

  function setFeedView(view) {
    const activeView = view === 'images' ? 'images' : 'linkedin';
    if (feedSection) {
      feedSection.setAttribute('data-feed-view', activeView);
    }
    try {
      localStorage.setItem('feed_view_mode', activeView);
    } catch (e) { }

    if (btnFeedLinkedIn && btnFeedImages) {
      if (activeView === 'images') {
        btnFeedImages.classList.add('active');
        btnFeedImages.setAttribute('aria-pressed', 'true');
        btnFeedLinkedIn.classList.remove('active');
        btnFeedLinkedIn.setAttribute('aria-pressed', 'false');
      } else {
        btnFeedLinkedIn.classList.add('active');
        btnFeedLinkedIn.setAttribute('aria-pressed', 'true');
        btnFeedImages.classList.remove('active');
        btnFeedImages.setAttribute('aria-pressed', 'false');
      }
    }
  }

  if (feedSection) {
    let savedFeedView = 'linkedin';
    try {
      savedFeedView = localStorage.getItem('feed_view_mode') || 'linkedin';
    } catch (e) { }
    setFeedView(savedFeedView);

    if (btnFeedLinkedIn && btnFeedImages) {
      btnFeedLinkedIn.addEventListener('click', () => setFeedView('linkedin'));
      btnFeedImages.addEventListener('click', () => setFeedView('images'));
    }
  }

  // Toggle showing all LinkedIn post embeds
  window.toggleAllLinkedInPosts = function() {
    const hiddenItems = document.querySelectorAll('.linkedin-embed-item.is-initially-hidden');
    const btn = document.getElementById('btnToggleMorePosts');
    if (!btn) return;

    const isExpanded = btn.getAttribute('data-expanded') === 'true';
    if (isExpanded) {
      hiddenItems.forEach(el => el.style.display = 'none');
      btn.setAttribute('data-expanded', 'false');
      const totalCount = document.querySelectorAll('.linkedin-embed-item').length;
      btn.innerHTML = `Show All ${totalCount} Updates &darr;`;
      const feedSection = document.getElementById('linkedin-updates');
      if (feedSection) feedSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      hiddenItems.forEach(el => el.style.display = 'block');
      btn.setAttribute('data-expanded', 'true');
      btn.innerHTML = 'Show Fewer Updates &uarr;';
    }
  };
});
