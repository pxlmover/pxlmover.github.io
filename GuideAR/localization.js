(function () {
  const LANGUAGE_STORAGE_KEY = 'arGuideLanguage';
  const DEFAULT_LANGUAGE = 'en';
  const SUPPORTED_LANGUAGES = ['en', 'ru'];

  window.GUIDE_UI_LOCALES = {
    en: {
      siteTitle: 'AudioReactive for Unreal Engine Documentation',
      primerLine1: 'AudioReactive',
      primerLine2: 'Primer',
      searchPlaceholder: '🔍 Type here to Filter',
      pageUtilities: 'Page utilities',
      themeButton: 'Spectrum Shift',
      themeAriaLabel: 'Spectrum Shift',
      languageLabel: 'Language',
      languageAriaLabel: 'Choose site language',
      languageOptions: {
        en: 'English',
        ru: 'Русский'
      },
      closeInfoCard: 'Close info card',
      backToGuide: '← Back to Guide',
      searchShowingAll: 'Showing all topics.',
      searchTypeMore: 'Type at least {min} characters to filter topics.',
      searchShowingResults: 'Showing {count} {topicLabel} for "{query}".',
      searchTopicSingular: 'topic',
      searchTopicFew: 'topics',
      searchTopicPlural: 'topics',
      docsSuffix: 'AudioReactive Docs',
      docsFallbackTitle: 'AudioReactive Docs',
      docsPrefixMap: {
        A: 'A - Core Controls',
        B: 'B - Audio',
        C: 'C - Mesh Reaction',
        D: 'D - Light Reaction',
        E: 'E - DMX',
        Workflows: 'Workflow Recipes & Initial Setup',
        Materials: 'Materials'
      },
      expandedScreenshotView: 'Expanded screenshot view',
      closeExpandedImage: 'Close expanded image',
      expandedScreenshot: 'Expanded screenshot',
      signature: 'Created In Unreal Engine By Daniel Jensen - 2025'
    },
    ru: {
      siteTitle: 'Документация AudioReactive для Unreal Engine',
      primerLine1: 'AudioReactive',
      primerLine2: 'Справочник',
      searchPlaceholder: '🔍 Введите текст для фильтрации',
      pageUtilities: 'Инструменты страницы',
      themeButton: 'Сдвиг спектра',
      themeAriaLabel: 'Сдвиг спектра',
      languageLabel: 'Язык',
      languageAriaLabel: 'Выберите язык сайта',
      languageOptions: {
        en: 'English',
        ru: 'Русский'
      },
      closeInfoCard: 'Закрыть карточку',
      backToGuide: '← Назад к справочнику',
      searchShowingAll: 'Показаны все темы.',
      searchTypeMore: 'Введите не менее {min} символов для фильтрации тем.',
      searchShowingResults: 'Найдено {count} {topicLabel} по запросу "{query}".',
      searchTopicSingular: 'тема',
      searchTopicFew: 'темы',
      searchTopicPlural: 'тем',
      docsSuffix: 'Документация AudioReactive',
      docsFallbackTitle: 'Документация AudioReactive',
      docsPrefixMap: {
        A: 'A - Основные элементы управления',
        B: 'B - Аудио',
        C: 'C - Реакция мешей',
        D: 'D - Реакция света',
        E: 'E - DMX',
        Workflows: 'Сценарии и начальная настройка',
        Materials: 'Материалы'
      },
      expandedScreenshotView: 'Увеличенный просмотр изображения',
      closeExpandedImage: 'Закрыть увеличенное изображение',
      expandedScreenshot: 'Увеличенный скриншот',
      signature: 'Создано в Unreal Engine — Daniel Jensen, 2025'
    }
  };

  function normalizeLanguage(language) {
    if (typeof language !== 'string') return DEFAULT_LANGUAGE;
    const normalized = language.toLowerCase();
    return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
  }

  function getCurrentLanguage() {
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return normalizeLanguage(saved || DEFAULT_LANGUAGE);
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function setCurrentLanguage(language) {
    const normalized = normalizeLanguage(language);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
    } catch (error) {
      // Ignore storage failures and continue with in-memory state.
    }

    document.documentElement.lang = normalized;
    window.dispatchEvent(new CustomEvent('guide-language-changed', {
      detail: {
        language: normalized
      }
    }));

    return normalized;
  }

  function getUiStrings(language) {
    const locales = window.GUIDE_UI_LOCALES || {};
    const current = normalizeLanguage(language || getCurrentLanguage());
    return locales[current] || locales[DEFAULT_LANGUAGE] || {};
  }

  function getGuideContent(language) {
    const locales = window.GUIDE_CONTENT_LOCALES || {};
    const current = normalizeLanguage(language || getCurrentLanguage());
    return locales[current] || locales[DEFAULT_LANGUAGE] || window.GUIDE_CONTENT || {};
  }

  function getGuideDocs(language) {
    const locales = window.GUIDE_DOCS_LOCALES || {};
    const current = normalizeLanguage(language || getCurrentLanguage());
    return locales[current] || locales[DEFAULT_LANGUAGE] || window.GUIDE_DOCS || {};
  }

  function formatTemplate(template, tokens) {
    return String(template || '').replace(/\{(\w+)\}/g, function (_, key) {
      return Object.prototype.hasOwnProperty.call(tokens || {}, key) ? tokens[key] : '';
    });
  }

  function getValueByPath(object, path) {
    return String(path || '')
      .split('.')
      .filter(Boolean)
      .reduce(function (value, key) {
        if (value && Object.prototype.hasOwnProperty.call(value, key)) {
          return value[key];
        }
        return undefined;
      }, object);
  }

  function translate(key, fallback, language) {
    const value = getValueByPath(getUiStrings(language), key);
    return typeof value === 'string' ? value : (fallback || '');
  }

  function applyStaticText(root) {
    const target = root || document;
    const currentLanguage = getCurrentLanguage();
    document.documentElement.lang = currentLanguage;

    target.querySelectorAll('[data-i18n]').forEach(function (element) {
      const key = element.getAttribute('data-i18n');
      const translated = translate(key, element.textContent, currentLanguage);
      if (translated) {
        element.textContent = translated;
      }
    });

    target.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
      const key = element.getAttribute('data-i18n-placeholder');
      const fallback = element.getAttribute('placeholder') || '';
      const translated = translate(key, fallback, currentLanguage);
      if (translated) {
        element.setAttribute('placeholder', translated);
      }
    });

    target.querySelectorAll('[data-i18n-aria-label]').forEach(function (element) {
      const key = element.getAttribute('data-i18n-aria-label');
      const fallback = element.getAttribute('aria-label') || '';
      const translated = translate(key, fallback, currentLanguage);
      if (translated) {
        element.setAttribute('aria-label', translated);
      }
    });
  }

  document.documentElement.lang = getCurrentLanguage();

  window.GuideLocalization = {
    DEFAULT_LANGUAGE: DEFAULT_LANGUAGE,
    SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES.slice(),
    LANGUAGE_STORAGE_KEY: LANGUAGE_STORAGE_KEY,
    normalizeLanguage: normalizeLanguage,
    getCurrentLanguage: getCurrentLanguage,
    setCurrentLanguage: setCurrentLanguage,
    getUiStrings: getUiStrings,
    getGuideContent: getGuideContent,
    getGuideDocs: getGuideDocs,
    formatTemplate: formatTemplate,
    translate: translate,
    applyStaticText: applyStaticText
  };
})();
