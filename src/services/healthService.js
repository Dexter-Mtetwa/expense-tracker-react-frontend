import { apiRequest, isDemoMode, getActiveBaseUrl } from './api';

export async function checkHealth() {
  if (isDemoMode()) {
    return { status: 'ok', demo: true };
  }
  const baseUrl = getActiveBaseUrl().replace(/\/+$/, '');
  const res = await fetch(`${baseUrl}/health`).catch(() => null);
  if (res && res.ok) {
    return await res.json().catch(() => ({ status: 'ok' }));
  }
  throw new Error('Health check failed');
}

export async function checkReadiness() {
  if (isDemoMode()) {
    return { status: 'ready', demo: true };
  }
  const baseUrl = getActiveBaseUrl().replace(/\/+$/, '');
  const res = await fetch(`${baseUrl}/ready`).catch(() => null);
  if (res && res.ok) {
    return await res.json().catch(() => ({ status: 'ready' }));
  }
  throw new Error('Database readiness check failed');
}
