import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import config from '../config';

i18next
  .use(LanguageDetector)
  .init({
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,

    interpolation: {
      // not needed for react
      escapeValue: false,
    },

    nsSeparator: false,
    keySeparator: false,
    fallbackLng: 'en',
    detection: {
      // order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],

      // keys or params to lookup language from
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLang',

      // cache user language on
      caches: ['localStorage', 'cookie'],
    },

    resources: config.i18n.locales,
  });

export default i18next;
