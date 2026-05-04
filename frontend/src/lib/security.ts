/**
 * Security utilities for XSS and CSRF protection
 */

/**
 * DOMPurify-like sanitization for user input
 * Removes potentially dangerous HTML and scripts
 */
export function sanitizeHTML(html: string): string {
  const element = document.createElement("div");
  element.textContent = html;
  return element.innerHTML;
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validate that a URL is safe (prevents javascript: and data: URLs)
 */
export function isSafeURL(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.href);
    // Only allow http and https protocols
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    // If URL parsing fails, treat as unsafe
    return false;
  }
}

/**
 * CSRF Token management
 */
class CSRFTokenManager {
  private token: string | null = null;
  private readonly CSRF_TOKEN_KEY = "X-CSRF-Token";
  private readonly CSRF_COOKIE_KEY = "csrf_token";

  /**
   * Fetch CSRF token from the server
   */
  async fetchCSRFToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }

    try {
      const response = await fetch("/api/csrf-token", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.statusText}`);
      }

      try {
        const data = await response.json();
        this.token = data.token ?? null;
        return this.token;
      } catch (parseError) {
        console.warn("Could not parse CSRF token response as JSON", parseError);
        const cookieToken = this.getCSRFTokenFromCookie();
        if (cookieToken) {
          this.token = cookieToken;
          return this.token;
        }
        return null;
      }
    } catch (error) {
      console.warn("Failed to fetch CSRF token:", error);
      const cookieToken = this.getCSRFTokenFromCookie();
      if (cookieToken) {
        this.token = cookieToken;
        return this.token;
      }
      return null;
    }
  }

  /**
   * Get CSRF token from cookies
   */
  private getCSRFTokenFromCookie(): string | null {
    const name = `${this.CSRF_COOKIE_KEY}=`;
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length);
      }
    }
    return null;
  }

  /**
   * Get the current CSRF token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Clear the cached CSRF token
   */
  clearToken(): void {
    this.token = null;
  }

  /**
   * Get CSRF token as a header object
   */
  getHeaderObject(): Record<string, string> {
    return this.token ? { [this.CSRF_TOKEN_KEY]: this.token } : {};
  }
}

// Export singleton instance
export const csrfTokenManager = new CSRFTokenManager();

/**
 * Create a secure fetch wrapper that includes CSRF token
 */
export async function secureFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const csrfToken = await csrfTokenManager.fetchCSRFToken();

  const headers = new Headers(options?.headers || {});

  // Add CSRF token for non-GET requests only if we have a valid token
  if (
    csrfToken &&
    options?.method &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(options.method.toUpperCase())
  ) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  // Set default content type if not specified
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Ensure credentials are included
  const finalOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  return fetch(url, finalOptions);
}

/**
 * Content Security Policy helper
 * Returns CSP header value for security headers
 */
export function getCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // In production, remove unsafe-inline and unsafe-eval
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}
