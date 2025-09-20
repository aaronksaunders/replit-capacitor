import { Capacitor } from "@capacitor/core";

/**
 * API configuration that adapts based on the platform
 * - Web: Uses relative URLs for Replit development
 * - Mobile: Uses absolute URLs for native app communication
 */
export const API_CONFIG = {
  /**
   * Get the base API URL based on the current platform
   * @returns The appropriate API URL for the current platform
   */
  getBaseUrl(): string {
    if (Capacitor.isNativePlatform()) {
      // For mobile devices, use the mobile API URL
      // This should be set as an environment variable in production
      return import.meta.env.VITE_MOBILE_API_URL || "https://your-server.com";
    } else {
      // For web browsers, use empty string for relative URLs (Replit)
      return "";
    }
  },

  /**
   * Get the full API endpoint URL
   * @param endpoint - The API endpoint path (e.g., '/api/auth/login')
   * @returns The complete API URL
   */
  getApiUrl(endpoint: string): string {
    const baseUrl = this.getBaseUrl();
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    if (Capacitor.isNativePlatform()) {
      // For mobile, always use absolute URLs
      return `${baseUrl}${cleanEndpoint}`;
    } else {
      // For web, use relative URLs for Replit
      return cleanEndpoint;
    }
  },

  /**
   * Check if we're running on a mobile device
   * @returns True if running on mobile, false otherwise
   */
  isMobile(): boolean {
    return Capacitor.isNativePlatform();
  },

  /**
   * Get the current platform name
   * @returns The platform name (ios, android, web)
   */
  getPlatform(): string {
    return Capacitor.getPlatform();
  },
};
