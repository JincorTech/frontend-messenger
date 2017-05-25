import * as jwtDecode from 'jwt-decode';

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getToken(): string {
  return localStorage.getItem('token') || '';
}

export function isAuth(): boolean {
  const token = getToken();

  if (token) {
    const decoded = jwtDecode(token);
    const expireDate = parseInt(decoded.exp, 10);

    return Date.now() < expireDate * 1000;
  } else {
    return false;
  }
}

export function removeToken(): void {
  localStorage.clear();
}
