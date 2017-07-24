const { API_HOST, API_PREFIX, NODE_ENV } = process.env;

export default {
  apiPrefix: API_PREFIX || '/api/v1',
  apiHost: NODE_ENV === 'production'
    ? API_HOST || 'http://localhost:8080'
    : 'http://stage.jincor.com:8080'
};

export const messengerConfig = {
  baseUrl: 'http://178.79.141.210:8008'
};
