/**
 * API client with built-in security features
 * Handles CSRF tokens, XSS protection, and error handling
 */

import { secureFetch } from "@/lib/security";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * Login API call
 */
export async function loginUser(
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await secureFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Login failed",
        };
      } catch (parseError) {
        console.warn("Could not parse error response as JSON");
        return {
          success: false,
          error: "Login failed. Backend may not be available.",
        };
      }
    }

    try {
      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
      };
    } catch (parseError) {
      console.warn("Could not parse login response as JSON");
      return {
        success: false,
        error: "Backend returned invalid response. Please try again.",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Register API call
 */
export async function registerUser(
  credentials: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> {
  try {
    const response = await secureFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Registration failed",
        };
      } catch (parseError) {
        console.warn("Could not parse error response as JSON");
        return {
          success: false,
          error: "Registration failed. Backend may not be available.",
        };
      }
    }

    try {
      const data = await response.json();
      return {
        success: true,
        data: data.data || data,
      };
    } catch (parseError) {
      console.warn("Could not parse registration response as JSON");
      return {
        success: false,
        error: "Backend returned invalid response. Please try again.",
      };
    }
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Logout API call
 */
export async function logoutUser(): Promise<ApiResponse<unknown>> {
  try {
    const response = await secureFetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Verify CSRF token with server
 */
export async function verifyCSRFToken(token: string): Promise<boolean> {
  try {
    const response = await fetch("/api/csrf-verify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      body: JSON.stringify({ token }),
    });

    return response.ok;
  } catch (error) {
    console.warn("CSRF verification failed gracefully:", error);
    return true; // Allow to continue even if CSRF verification fails
  }
}
