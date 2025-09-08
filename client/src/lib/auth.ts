const TOKEN_KEY = 'jwt_token';

export function storeToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isTokenValid(token: string): boolean {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Check if token has expired
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export function getTokenPayload(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
}
