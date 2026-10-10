// Production API Client for Expense Tracker FastAPI Backend

const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://expense-tracker-api-rb7s.onrender.com';

export function getCleanBaseUrl() {
  try {
    const urlObj = new URL(RAW_BASE_URL);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch {
    return RAW_BASE_URL.split('?')[0].replace(/\/+$/, '');
  }
}

export const API_BASE_URL = getCleanBaseUrl();

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const token = localStorage.getItem('expense_tracker_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401) {
        // For login endpoint we handle the error locally in the UI, so do not clear token or fire global event.
        if (endpoint.includes('/auth/login')) {
          const error = new Error('Invalid email or password');
          error.status = 401;
          throw error;
        }
        localStorage.removeItem('expense_tracker_token');
        localStorage.removeItem('expense_tracker_user');
        window.dispatchEvent(new Event('auth_unauthorized'));
        const error = new Error('Your session has expired. Please sign in again.');
        error.status = 401;
        throw error;
      }

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (response.status === 409) {
        errorMessage = 'A category with this name already exists. Category names must be unique (case-insensitive).';
      } else if (response.status === 400 || response.status === 422) {
        if (Array.isArray(data?.detail)) {
          errorMessage = data.detail.map((err) => {
            const field = err.loc ? err.loc[err.loc.length - 1] : '';
            return field ? `Invalid input for ${field}: ${err.msg}` : err.msg;
          }).join('. ');
        } else if (typeof data?.detail === 'string') {
          errorMessage = data.detail;
        } else {
          errorMessage = 'Please check your inputs and try again.';
        }
      } else if (response.status === 403) {
        errorMessage = 'You do not have permission to perform this action.';
      } else if (response.status === 404) {
        errorMessage = 'The requested item was not found.';
      } else if (response.status >= 500) {
        errorMessage = 'The server encountered an issue. Please try again in a few moments.';
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const error = new Error('Unable to reach the server. Please check your internet connection or try again in a moment.');
      error.isNetworkError = true;
      throw error;
    }
    throw err;
  }
}
