let translations = {};
const LANG_KEY = 'selectedLanguage';

function setLanguage(lang) {
  fetch('translations.json')
    .then((response) => response.json())
    .then((data) => {
      if (!data[lang]) {
        console.warn(`Language ${lang} not found, falling back to English`);
        lang = 'en';
      }
      translations = data[lang];
      updateText();
      localStorage.setItem(LANG_KEY, lang);
      updateHtmlLang(lang);
    })
    .catch((error) => console.error('Error loading translations:', error));
}

function updateText() {
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const key = elem.getAttribute('data-i18n');
    if (translations[key]) {
      elem.innerHTML = translations[key];
    }
  });
}

function updateHtmlLang(lang) {
  document.documentElement.lang = lang;
}

function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  // Only take first two chars, e.g. 'en' from 'en-US'
  return browserLang ? browserLang.substring(0, 2) : 'en';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem(LANG_KEY);
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    const browserLang = detectBrowserLanguage();
    setLanguage(browserLang);
  }
});
