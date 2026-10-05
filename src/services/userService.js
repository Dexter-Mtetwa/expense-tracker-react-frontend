import { apiRequest } from './api';

export async function fetchUsers() {
  return await apiRequest('/api/v1/users');
}
