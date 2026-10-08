document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.page-view');
  const desktopNavItems = document.querySelectorAll('.masthead__item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const brandHomeLink = document.getElementById('brandHomeLink');
  const mobileBrandLink = document.querySelector('.mobile-brand-link');

  const authorConnectBtn = document.getElementById('authorConnectBtn');
  const authorUrlsWrapper = document.getElementById('authorUrlsWrapper');

  const pubSearchInput = document.getElementById('pubSearchInput');
  const pubSearchClear = document.getElementById('pubSearchClear');
  const pubSearchMeta = document.getElementById('pubSearchMeta');
  const pubEntries = document.querySelectorAll('.pub-entry');

  function navigateTo(pageId, scroll = true) {
    if (!pageId || pageId === '') pageId = 'home';
    pageId = pageId.toLowerCase().replace('#', '');

    let scrollToPatents = false;
    if (pageId === 'patents') {
      pageId = 'work';
      scrollToPatents = true;
    }

    const targetView = document.getElementById(`view-${pageId}`);
    if (!targetView) {
      pageId = 'home';
    }

    views.forEach(view => {
      if (view.id === `view-${pageId}`) {
        view.classList.add('active-view');
      } else {
        view.classList.remove('active-view');
      }
    });

    desktopNavItems.forEach(item => {
      const itemPage = item.getAttribute('data-page');
      if (itemPage === pageId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    mobileNavItems.forEach(item => {
      const itemPage = item.getAttribute('data-page');
      if (itemPage === pageId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (scroll) {
      if (scrollToPatents) {
        const patentsEl = document.getElementById('patents-section');
        if (patentsEl) {
          patentsEl.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleHash() {
    const hash = window.location.hash.slice(1);
    if (hash === 'menu') {
      openMobileMenu();
      return;
    }
    if (hash === 'connect') {
      if (authorUrlsWrapper) authorUrlsWrapper.classList.add('is-expanded');
      return;
    }
    navigateTo(hash || 'home', true);
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();

  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      window.location.hash = '#home';
      navigateTo('home', true);
    });
  }

  if (mobileBrandLink) {
    mobileBrandLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      window.location.hash = '#home';
      navigateTo('home', true);
    });
  }

  function toggleMobileMenu() {
    if (mobileNavOverlay && mobileNavOverlay.classList.contains('is-active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

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

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
  }

  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
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
          entry.style.display = 'block';
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
});
