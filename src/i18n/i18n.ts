import * as i18n from 'i18next';

const ru = {
  app: require('../locales/ru/app.json'),
  contacts: require('../locales/ru/contacts.json'),
  messenger: require('../locales/ru/messenger.json')
};

const en = {
  app: require('../locales/en/app.json'),
  contacts: require('../locales/en/contacts.json'),
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
      contacts: en.contacts,
      messenger: en.messenger
    },
    ru: {
      app: ru.app,
      contacts: ru.contacts,
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
