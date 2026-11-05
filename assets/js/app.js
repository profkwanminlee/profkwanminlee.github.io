document.addEventListener('DOMContentLoaded', () => {
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');

  const authorConnectBtn = document.getElementById('authorConnectBtn');
  const authorUrlsWrapper = document.getElementById('authorUrlsWrapper');

  const pubSearchInput = document.getElementById('pubSearchInput');
  const pubSearchClear = document.getElementById('pubSearchClear');
  const pubSearchMeta = document.getElementById('pubSearchMeta');
  const pubEntries = document.querySelectorAll('.pub-entry, .recognition-entry');

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

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
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

  if (pubSearchInput && pubEntries.length > 0) {
    const totalPubs = pubEntries.length;

    function filterPublications() {
      const query = pubSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      if (pubSearchClear) {
        pubSearchClear.style.display = query.length > 0 ? 'block' : 'none';
      }

      pubEntries.forEach(entry => {
        const title = (entry.getAttribute('data-title') || '').toLowerCase();
        const venue = (entry.getAttribute('data-venue') || '').toLowerCase();
        const year = (entry.getAttribute('data-year') || '').toLowerCase();
        const keywords = (entry.getAttribute('data-keywords') || '').toLowerCase();
        const fullText = entry.textContent.toLowerCase();

        const isMatch = query === '' ||
          title.includes(query) ||
          venue.includes(query) ||
          year.includes(query) ||
          keywords.includes(query) ||
          fullText.includes(query);

        if (isMatch) {
          entry.style.display = '';
          visibleCount++;
        } else {
          entry.style.display = 'none';
        }
      });

      if (pubSearchMeta) {
        if (query === '') {
          pubSearchMeta.textContent = `Showing all ${totalPubs} publications`;
        } else if (visibleCount === 0) {
          pubSearchMeta.textContent = `No publications found matching "${query}"`;
        } else {
          pubSearchMeta.textContent = `Showing ${visibleCount} of ${totalPubs} publications`;
        }
      }
    }

    pubSearchInput.addEventListener('input', filterPublications);

    if (pubSearchClear) {
      pubSearchClear.addEventListener('click', () => {
        pubSearchInput.value = '';
        filterPublications();
        pubSearchInput.focus();
      });
    }

    if (pubSearchMeta) {
      pubSearchMeta.textContent = `Showing all ${totalPubs} publications`;
    }
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

  // Layout Version Switcher (V1: default without sidebar, V2: classic with sidebar)
  const btnVersion1 = document.getElementById('btnVersion1');
  const btnVersion2 = document.getElementById('btnVersion2');

  function applyVersion(ver) {
    const activeVer = ver === 'v2' ? 'v2' : 'v1';
    document.documentElement.setAttribute('data-version', activeVer);
    try {
      localStorage.setItem('site_layout_version', activeVer);
      localStorage.setItem('site_version', activeVer);
    } catch (e) { }

    if (btnVersion1 && btnVersion2) {
      if (activeVer === 'v2') {
        btnVersion2.classList.add('active');
        btnVersion2.setAttribute('aria-pressed', 'true');
        btnVersion1.classList.remove('active');
        btnVersion1.setAttribute('aria-pressed', 'false');
      } else {
        btnVersion1.classList.add('active');
        btnVersion1.setAttribute('aria-pressed', 'true');
        btnVersion2.classList.remove('active');
        btnVersion2.setAttribute('aria-pressed', 'false');
      }
    }
  }

  const initialVersion = document.documentElement.getAttribute('data-version') || 'v1';
  applyVersion(initialVersion);

  if (btnVersion1 && btnVersion2) {
    btnVersion1.addEventListener('click', () => applyVersion('v1'));
    btnVersion2.addEventListener('click', () => applyVersion('v2'));
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
