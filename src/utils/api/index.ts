import 'whatwg-fetch';
import { pathCreator, checkHttpStatus, parseJSON, authHeader } from './helpers';

/**
 * Fetch wrapper function
 *
 * @param   path    - api endpoint
 * @param   options - fetch options
 * @returns         - promise
 */
function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(pathCreator(path), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...authHeader()
    },
    ...options
  })
    .then(checkHttpStatus)
    .then(parseJSON);
}

/**
 * Fetch wrapper for GET requests
 *
 * @param  path - endpoint
 * @return      - promise
 */
export function get(path: string): Promise<Response> {
  return apiFetch(path, {
    method: 'GET'
  });
}

/**
 * Fetch wrapper for POST requests
 *
 * @param path - endpoint
 * @param body - POST request body
 * @return     - promise
 */
export function post<T>(path: string, body: T): Promise<Response> {
  return apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

/**
 * Fetch wrapper for PUT requests
 *
 * @param  path - endpoint
 * @param  body - PUT request body
 * @return      - promise
 */
export function put<T>(path: string, body: T): Promise<Response> {
  return apiFetch(path, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

/**
 *  Fetch wrapper for DELETE requests
 *
 * @param  path - endpoint
 * @return      - promise
 */
export function del(path: string): Promise<Response> {
  return apiFetch(path, {
    method: 'DELETE'
  });
}
