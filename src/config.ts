const {
  COMPANIES_API_PREFIX,
  COMPANIES_API_HOST,
  MESSENGER_API_HOST
} = process.env;

export default {
  apiPrefix: COMPANIES_API_PREFIX || '/api/v1',
  apiHost: COMPANIES_API_HOST || 'https://companies-api.jincor.com'
};

export const messengerConfig = {
  baseUrl: MESSENGER_API_HOST || 'http://178.79.141.210:8008'
};
