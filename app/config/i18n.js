// import locales
import localeIT from '../locales/it.po';

const config = () => ({
  locales: {
    it: {
      // "common" is the default namespace, create new one if you want to split locales
      common: localeIT,
    },

    /* Add other translations here */
  },
});

export default config;
