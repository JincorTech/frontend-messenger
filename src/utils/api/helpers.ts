import config from '../../config';
import { isAuth, getToken } from '../auth';

const { apiPrefix, apiHost } = config;

export type ErrorData = {
  message: string
  status_code: number
  errors?: ErrorMessages
};

export type ErrorMessages = {
  [key: string]: string[]
};

export class RequestError extends Error {
  status: number;
  errors: ErrorMessages;

  constructor(error: ErrorData) {
    super(error.message);

    this.errors = error.errors;
    this.status = error.status_code;
  }
}

/**
 * Create full path for backend api endpoints
 *
 * @param   path - api endpoint
 * @return         full path, including api host and version
 */
export function pathCreator(path: string): string {
  const correctPath = path[0] === '/' ? path : `/${path}`;

  return `${apiHost}${apiPrefix}${correctPath}`;
}

/**
 * Checks response status.
 * If status code is not between 200 and 300 throws an error
 *
 * @param  response - http Response object
 * @return            http Response object
 */
export function checkHttpStatus(response: Response): Promise<any> | Response {
  if (response.ok) {
    return response;
  } else {
    return response.json();
  }
}

/**
 * Parse response body to json
 *
 * @param  response - http Response object
 * @return            http Response object
 */
export function parseJSON(response: Response | ErrorData): Promise<any> {
  if (response instanceof Response) {
    return response.json();
  }

  throw new RequestError(response);
}

export function authHeader(): { Authorization?: string } {
  return isAuth()
    ? { 'Authorization': `Bearer ${getToken()}` }
    : {};
}
