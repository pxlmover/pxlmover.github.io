let userExpandedCategories = new Set();
const EXPANDED_CATEGORIES_STORAGE_KEY = 'arExpandedCatsV2';
const LAST_ACTIVE_CATEGORY_STORAGE_KEY = 'arLastActiveCategoryV1';
const MIN_SEARCH_CHARS = 2;
const navStateStorage = window.sessionStorage;

function getSearchStatusElement() {
  return document.getElementById('search-status');
}

function getCategoryKeyFromElement(categoryEl) {
  return categoryEl ? categoryEl.getAttribute('data-cat-key') : null;
}

function renderGuideItem(item, parentCategoryKey) {
  const subcategoryEl = document.createElement('div');
  subcategoryEl.className = 'subcategory';

  if (item.href) {
    const linkEl = document.createElement('a');
    linkEl.className = `subcategory-title ${item.className || ''}`.trim();
    linkEl.href = item.href;
    if (parentCategoryKey) {
      linkEl.setAttribute('data-parent-cat-key', parentCategoryKey);
    }
    if (item.external) {
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
    }
    linkEl.textContent = item.title;
    subcategoryEl.appendChild(linkEl);
  } else {
    const titleEl = document.createElement('div');
    titleEl.className = 'subcategory-title';
    titleEl.textContent = item.title;
    if (item.modal) {
      titleEl.setAttribute('data-title', item.modal.title || item.title);
      titleEl.setAttribute('data-desc', item.modal.description || '');
      titleEl.setAttribute('data-img', item.modal.image || '');
    }
    subcategoryEl.appendChild(titleEl);
  }

  const hasDescription = typeof item.description === 'string' && item.description.trim().length > 0;
  if (hasDescription) {
    const descEl = document.createElement('div');
    descEl.className = 'child-list';
    descEl.textContent = item.description;
    subcategoryEl.appendChild(descEl);
  }

  return subcategoryEl;
}

function renderCategory(category, keyPath, depth) {
  const categoryEl = document.createElement('div');
  categoryEl.className = 'category';
  categoryEl.setAttribute('data-cat-key', keyPath);
  categoryEl.setAttribute('data-cat-depth', String(depth));

  const contentId = `cat-content-${keyPath.replace(/\./g, '-')}`;

  const headerEl = document.createElement('button');
  headerEl.type = 'button';
  headerEl.className = 'category-header';
  headerEl.textContent = category.header;
  headerEl.setAttribute('aria-expanded', 'false');
  headerEl.setAttribute('aria-controls', contentId);

  const contentEl = document.createElement('div');
  contentEl.className = 'category-content';
  contentEl.id = contentId;

  (category.categories || []).forEach((childCategory, idx) => {
    contentEl.appendChild(renderCategory(childCategory, `${keyPath}.${idx}`, depth + 1));
  });

  (category.items || []).forEach(item => {
    contentEl.appendChild(renderGuideItem(item, keyPath));
  });

  categoryEl.appendChild(headerEl);
  categoryEl.appendChild(contentEl);
  return categoryEl;
}

function renderGuideContent() {
  const categoriesRoot = document.getElementById('categories');
  const featuredRoot = document.getElementById('guide-featured-link');
  if (!categoriesRoot || !window.GUIDE_CONTENT) return;

  categoriesRoot.innerHTML = '';

  (window.GUIDE_CONTENT.categories || []).forEach((category, idx) => {
    categoriesRoot.appendChild(renderCategory(category, String(idx), 0));
  });

  if (featuredRoot) {
    const featuredLink = window.GUIDE_CONTENT.featuredLink;
    const communityLinks = window.GUIDE_CONTENT.communityLinks || [];
    const parts = [];

    if (featuredLink && featuredLink.href && featuredLink.label) {
      parts.push(`<a href="${featuredLink.href}" class="guide-featured-btn">${featuredLink.label}</a>`);
    }

    if (communityLinks.length > 0) {
      const communityButtons = communityLinks
        .filter(link => link && link.href && link.label)
        .map(link => {
          const className = link.className || 'guide-community-btn';
          const target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${link.href}" class="${className}"${target}>${link.label}</a>`;
        })
        .join('');

      if (communityButtons) {
        parts.push(`<div class="guide-community-links">${communityButtons}</div>`);
      }
    }

    featuredRoot.innerHTML = parts.join('');
  }
}

function bindCategoryToggles() {
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', function () {
      const parent = this.parentElement;
      const key = getCategoryKeyFromElement(parent);
      if (!key) return;

      const willOpen = !parent.classList.contains('open');
      setCategoryOpen(parent, willOpen);
      if (willOpen) {
        userExpandedCategories.add(key);
      } else {
        userExpandedCategories.delete(key);
      }
      persistExpandedCategories();
    });
  });
}

function persistExpandedCategories() {
  navStateStorage.setItem(EXPANDED_CATEGORIES_STORAGE_KEY, JSON.stringify(Array.from(userExpandedCategories)));
}

function saveExpandedCategoriesFromDom() {
  userExpandedCategories = new Set(
    Array.from(document.querySelectorAll('.category.open'))
      .map(getCategoryKeyFromElement)
      .filter(Boolean)
  );
  persistExpandedCategories();
}

function loadExpandedCategoriesFromStorage() {
  const raw = navStateStorage.getItem(EXPANDED_CATEGORIES_STORAGE_KEY);
  if (!raw) {
    userExpandedCategories = new Set();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      userExpandedCategories = new Set(parsed.filter(Boolean));
      return;
    }
  } catch (error) {
    // Ignore invalid storage and reset state.
  }

  userExpandedCategories = new Set();
}

function addCategoryAndAncestorsToExpanded(key) {
  if (!key) return;

  const parts = key.split('.');
  for (let i = 1; i <= parts.length; i += 1) {
    userExpandedCategories.add(parts.slice(0, i).join('.'));
  }
}

function setCategoryOpen(categoryEl, isOpen) {
  if (!categoryEl) return;

  categoryEl.classList.toggle('open', isOpen);
  const header = categoryEl.querySelector(':scope > .category-header');
  if (header) {
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function countVisibleSearchResults() {
  return document.querySelectorAll('.subcategory:not(.search-hidden)').length;
}

function announceSearchStatus(message) {
  const status = getSearchStatusElement();
  if (!status) return;
  status.textContent = message;
}

function fuzzyMatch(text, query) {
  const words = query.split(/\s+/).filter(Boolean);
  return words.every(word => text.includes(word));
}

function setSearchVisibility(element, visible) {
  if (!element) return;
  element.classList.toggle('search-hidden', !visible);
  if (visible) {
    element.removeAttribute('aria-hidden');
  } else {
    element.setAttribute('aria-hidden', 'true');
  }
}

function applySearchQuery(query) {
  const allCategories = Array.from(document.querySelectorAll('.category'));

  if (query === '') {
    allCategories.forEach(cat => {
      const key = getCategoryKeyFromElement(cat);
      setSearchVisibility(cat, true);
      setCategoryOpen(cat, Boolean(key && userExpandedCategories.has(key)));
      cat.querySelectorAll('.subcategory').forEach(sub => {
        setSearchVisibility(sub, true);
      });
    });
    return;
  }

  document.querySelectorAll('.subcategory').forEach(sub => {
    const subText = sub.textContent.toLowerCase();
    const visible = fuzzyMatch(subText, query);
    setSearchVisibility(sub, visible);
  });

  const orderedCategories = allCategories.sort((a, b) => {
    const depthA = Number(a.getAttribute('data-cat-depth') || 0);
    const depthB = Number(b.getAttribute('data-cat-depth') || 0);
    return depthB - depthA;
  });

  orderedCategories.forEach(cat => {
    const header = cat.querySelector(':scope > .category-header');
    const headerText = header ? header.textContent.toLowerCase() : '';
    const headerMatches = fuzzyMatch(headerText, query);

    const hasVisibleSubItems = cat.querySelector(':scope > .category-content > .subcategory:not(.search-hidden)') !== null;
    const hasVisibleChildCategories = cat.querySelector(':scope > .category-content > .category:not(.search-hidden)') !== null;
    const hasMatches = headerMatches || hasVisibleSubItems || hasVisibleChildCategories;

    setSearchVisibility(cat, hasMatches);
    setCategoryOpen(cat, hasMatches);
  });
}

function bindSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  let pendingFrame = null;

  searchInput.addEventListener('input', function () {
    const rawQuery = this.value.trim().toLowerCase();
    const hasEnoughChars = rawQuery.length >= MIN_SEARCH_CHARS;
    const query = hasEnoughChars ? rawQuery : '';

    if (pendingFrame !== null) {
      cancelAnimationFrame(pendingFrame);
    }

    pendingFrame = requestAnimationFrame(() => {
      applySearchQuery(query);

      if (rawQuery.length === 0) {
        announceSearchStatus('Showing all topics.');
      } else if (!hasEnoughChars) {
        announceSearchStatus(`Type at least ${MIN_SEARCH_CHARS} characters to filter topics.`);
      } else {
        const resultCount = countVisibleSearchResults();
        const resultLabel = resultCount === 1 ? 'topic' : 'topics';
        announceSearchStatus(`Showing ${resultCount} ${resultLabel} for "${rawQuery}".`);
      }

      pendingFrame = null;
    });
  });
}

function bindInfoModal() {
  const modal = document.getElementById('info-modal');
  const body = document.getElementById('info-modal-body');
  const closeButton = document.getElementById('info-modal-close');

  if (!modal || !body || !closeButton) return;

  let previouslyFocusedElement = null;

  function getFocusableElements() {
    return Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    body.innerHTML = '';

    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      previouslyFocusedElement.focus();
    }
    previouslyFocusedElement = null;
  }

  function openModal(titleText, descText, imgSrc) {
    previouslyFocusedElement = document.activeElement;
    body.innerHTML = '';

    const heading = document.createElement('h2');
    heading.id = 'info-modal-title';
    heading.style.fontFamily = "'Orbitron','Inter',Arial,sans-serif";
    heading.style.fontSize = '1.4em';
    heading.style.color = '#64b5f6';
    heading.style.marginBottom = '12px';
    heading.textContent = titleText;
    body.appendChild(heading);

    const description = document.createElement('div');
    description.style.fontSize = '1.1em';
    description.style.marginBottom = '18px';
    description.textContent = descText;
    body.appendChild(description);

    if (imgSrc) {
      const image = document.createElement('img');
      image.src = imgSrc;
      image.alt = titleText;
      image.style.maxWidth = '92vw';
      image.style.maxHeight = '60vh';
      image.style.borderRadius = '12px';
      image.style.boxShadow = '0 4px 24px #64b5f6cc';
      image.style.marginBottom = '12px';
      body.appendChild(image);
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  document.querySelectorAll('.subcategory-title').forEach(title => {
    if (!title.hasAttribute('href')) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', function () {
        const titleText = this.getAttribute('data-title') || this.textContent;
        const descText = this.getAttribute('data-desc') || '';
        const imgSrc = this.getAttribute('data-img');
        openModal(titleText, descText, imgSrc);
      });
    }
  });

  closeButton.onclick = closeModal;

  modal.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  modal.addEventListener('keydown', function (event) {
    if (modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function bindNavigationStatePersistence() {
  document.querySelectorAll('.subcategory-title[href]').forEach(link => {
    link.addEventListener('click', function () {
      saveExpandedCategoriesFromDom();

      const parentKey = this.getAttribute('data-parent-cat-key');
      if (parentKey) {
        navStateStorage.setItem(LAST_ACTIVE_CATEGORY_STORAGE_KEY, parentKey);
      }
    });
  });
}

function restoreCategoryExpansionState() {
  loadExpandedCategoriesFromStorage();

  const lastActiveCategoryKey = navStateStorage.getItem(LAST_ACTIVE_CATEGORY_STORAGE_KEY);
  if (lastActiveCategoryKey) {
    addCategoryAndAncestorsToExpanded(lastActiveCategoryKey);
    // Consume breadcrumb once so plain refresh does not keep forcing categories open.
    navStateStorage.removeItem(LAST_ACTIVE_CATEGORY_STORAGE_KEY);
  }

  document.querySelectorAll('.category').forEach(cat => {
    const key = getCategoryKeyFromElement(cat);
    setCategoryOpen(cat, Boolean(key && userExpandedCategories.has(key)));
  });
}

function restoreScrollPosition() {
  const scrollY = navStateStorage.getItem('guideARScroll');
  if (!scrollY) return;

  window.scrollTo(0, parseInt(scrollY, 10));
  navStateStorage.removeItem('guideARScroll');
}

document.addEventListener('DOMContentLoaded', function () {
  renderGuideContent();
  bindCategoryToggles();
  bindNavigationStatePersistence();
  bindSearch();
  bindInfoModal();
  restoreCategoryExpansionState();
  restoreScrollPosition();
});
