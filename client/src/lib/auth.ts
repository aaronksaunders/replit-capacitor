import { SecureStorage } from './secure-storage';

/**
 * Store a JWT token securely (uses Capacitor Preferences on mobile, localStorage on web)
 * @param token - The JWT token to store
 */
export async function storeToken(token: string): Promise<void> {
  await SecureStorage.setToken(token);
}

/**
 * Retrieve the stored JWT token (uses Capacitor Preferences on mobile, localStorage on web)
 * @returns The JWT token or null if not found
 */
export async function getStoredToken(): Promise<string | null> {
  return await SecureStorage.getToken();
}

/**
 * Remove the stored JWT token (uses Capacitor Preferences on mobile, localStorage on web)
 */
export async function removeStoredToken(): Promise<void> {
  await SecureStorage.removeToken();
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
