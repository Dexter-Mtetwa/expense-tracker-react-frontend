import { apiRequest } from './api';

export function parseJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export async function loginUser(email, password) {
  const data = await apiRequest('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // data is { access_token, token_type }
  const payload = parseJwtPayload(data.access_token);
  const userId = payload?.sub || null;

  return {
    access_token: data.access_token,
    user: {
      id: userId,
      email,
      role: email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER',
    },
  };
}

export async function registerUser(email, password) {
  return await apiRequest('/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
