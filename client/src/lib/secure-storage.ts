import { Capacitor } from '@capacitor/core';
import { SecureStorage as CapacitorSecureStorage } from '@aparajita/capacitor-secure-storage';

/**
 * Secure storage utility that uses Capacitor Secure Storage on mobile devices
 * (with iOS Keychain and Android Keystore encryption) and localStorage on web browsers
 * for JWT token storage
 */
export class SecureStorage {
  private static readonly TOKEN_KEY = 'jwt_token';

  /**
   * Store a JWT token securely
   * @param token - The JWT token to store
   */
  static async setToken(token: string): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      // Use Capacitor Secure Storage for encrypted storage on mobile
      await CapacitorSecureStorage.set({
        key: this.TOKEN_KEY,
        value: token,
      });
    } else {
      // Use localStorage for web browsers (development only)
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  /**
   * Retrieve the stored JWT token
   * @returns The JWT token or null if not found
   */
  static async getToken(): Promise<string | null> {
    if (Capacitor.isNativePlatform()) {
      // Use Capacitor Secure Storage for encrypted storage on mobile
      try {
        const result = await CapacitorSecureStorage.get({ key: this.TOKEN_KEY });
        return result.value;
      } catch (error) {
        // Token not found or error accessing secure storage
        return null;
      }
    } else {
      // Use localStorage for web browsers
      return localStorage.getItem(this.TOKEN_KEY);
    }
  }

  /**
   * Remove the stored JWT token
   */
  static async removeToken(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      // Use Capacitor Secure Storage for encrypted storage on mobile
      try {
        await CapacitorSecureStorage.remove({ key: this.TOKEN_KEY });
      } catch (error) {
        // Token not found or error accessing secure storage
        console.warn('Error removing token from secure storage:', error);
      }
    } else {
      // Use localStorage for web browsers
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  /**
   * Check if a token exists in storage
   * @returns True if token exists, false otherwise
   */
  static async hasToken(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null && token !== '';
  }

  /**
   * Clear all stored data (useful for logout)
   */
  static async clear(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      // Use Capacitor Secure Storage for encrypted storage on mobile
      try {
        await CapacitorSecureStorage.clear();
      } catch (error) {
        console.warn('Error clearing secure storage:', error);
      }
    } else {
      // Use localStorage for web browsers
      localStorage.clear();
    }
  }
}
