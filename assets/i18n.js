/* Vinfotech Consultancy — shared EN/NL language switching.
   Each page defines window.I18N = { en: {...}, nl: {...} } before loading this file.
   Elements to translate carry data-i18n="key"; language buttons carry data-lang-btn="en|nl". */
(function () {
  var STORAGE_KEY = 'vft-lang';

  function getStoredLang() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return (v === 'en' || v === 'nl') ? v : null;
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function apply(lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.textContent = dict[key];
      }
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    document.querySelectorAll('[data-nav-current]').forEach(function (link) {
      // no-op placeholder for future active-page styling hook
    });
  }

  function init() {
    var lang = getStoredLang() || 'en';
    apply(lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang-btn');
        setStoredLang(lang);
        apply(lang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
