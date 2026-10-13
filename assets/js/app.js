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
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
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
});
