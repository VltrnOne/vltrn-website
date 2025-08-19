// VLTRN Infrastructure Configuration
// This replaces all third-party services with your own systems

export const VLTRN_CONFIG = {
  // API Endpoints - TEMPORARILY USING LOCAL MOCK FOR IMMEDIATE FUNCTIONALITY
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
    // TEMPORARY: Using local mock endpoints for immediate functionality
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify',
      VERIFY_EMAIL: '/auth/verify-email',
      RESEND_VERIFICATION: '/auth/resend-verification',
      RESET_PASSWORD: '/auth/reset-password',
      UPDATE_PASSWORD: '/auth/update-password',
      UPDATE_PROFILE: '/auth/update-profile',
      REFRESH: '/auth/refresh',
      SESSION: '/auth/session'
    },
    CLIENT_INTAKES: '/client-intakes',
    PROJECTS: '/projects',
    TASKS: '/tasks',
    RESOURCES: '/resources',
    ANALYTICS: '/analytics',
    NOTIFICATIONS: '/notifications'
  },

  // Authentication Settings
  AUTH: {
    TOKEN_KEY: 'vltrn_token',
    USER_KEY: 'vltrn_user',
    REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000 // 24 hours
  },

  // Verification System (replaces Google reCAPTCHA)
  VERIFICATION: {
    METHOD: 'SMS_EMAIL', // 'SMS', 'EMAIL', 'SMS_EMAIL'
    CODE_LENGTH: 6,
    EXPIRY_TIME: 10 * 60 * 1000, // 10 minutes
    MAX_ATTEMPTS: 3
  },

  // File Storage (replaces any cloud storage)
  STORAGE: {
    UPLOADS: '/uploads',
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/*', 'application/pdf', 'text/*']
  },

  // Real-time Features (replaces WebSocket services)
  REALTIME: {
    ENABLED: true,
    POLLING_INTERVAL: 5000, // 5 seconds
    WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL || 'wss://ws.vltrn.agency'
  },

  // Analytics (replaces Google Analytics, etc.)
  ANALYTICS: {
    ENABLED: true,
    TRACK_USER_BEHAVIOR: true,
    PRIVACY_COMPLIANT: true
  },

  // Security Settings
  SECURITY: {
    PASSWORD_MIN_LENGTH: 8,
    REQUIRE_SPECIAL_CHARS: true,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000 // 15 minutes
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  // TEMPORARY: Return mock data for immediate functionality
  return `mock://${endpoint}`;
};

// Helper function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem(VLTRN_CONFIG.AUTH.TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};
