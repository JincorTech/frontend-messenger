import * as i18n from 'i18next';

const ru = {
  app: require('../locales/ru/app.json'),
  messenger: require('../locales/ru/messenger.json')
};

const en = {
  app: require('../locales/en/app.json'),
  messenger: require('../locales/en/messenger.json')
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
      app: en.app,
      messenger: en.messenger
    },
    ru: {
      app: ru.app,
      messenger: ru.messenger
    }
  },
  ns: ['app'],
  defaultNS: 'app',
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
