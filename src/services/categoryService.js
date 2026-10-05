import { apiRequest } from './api';

export async function fetchCategories() {
  return await apiRequest('/api/v1/categories');
}

export async function fetchCategoryById(categoryId) {
  return await apiRequest(`/api/v1/categories/${categoryId}`);
}

export async function createCategory(name) {
  return await apiRequest('/api/v1/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function updateCategory(categoryId, name) {
  return await apiRequest(`/api/v1/categories/${categoryId}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategory(categoryId) {
  return await apiRequest(`/api/v1/categories/${categoryId}`, {
    method: 'DELETE',
  });
}
