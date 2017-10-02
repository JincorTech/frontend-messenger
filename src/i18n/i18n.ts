import * as i18n from 'i18next';

const ru = {
  app: require('../locales/ru/app.json')
};

const en = {
  app: require('../locales/en/app.json')
};

export const config = {
  lng: 'ru',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  debug: process.env.NODE_ENV === 'development',
  react: {
    wait: true,
    nsMode: 'default'
  },
  resources: {
    en: {
      app: en.app
    },
    ru: {
      app: ru.app
    }
  },
  ns: ['common'],
  defaultNS: 'common',
  detection: {
    order: ['querystring', 'localStorage'],
    lookupQuerystring: 'lang',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage']
  }
};

const instance = i18n
  .init(config);

export default instance;
