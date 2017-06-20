const { API_HOST, API_PREFIX } = process.env;

export default {
  apiPrefix: API_PREFIX || '/api/v1',
  // apiHost: API_HOST || 'http://localhost:8080'
  apiHost: API_HOST || 'http://stage.jincor.com:8080'
};
