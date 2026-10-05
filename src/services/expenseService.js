import { apiRequest } from './api';

export async function fetchExpenses(categoryId = null) {
  const query = categoryId ? `?category_id=${encodeURIComponent(categoryId)}` : '';
  return await apiRequest(`/api/v1/expenses${query}`);
}

export async function fetchExpenseById(expenseId) {
  return await apiRequest(`/api/v1/expenses/${expenseId}`);
}

export async function createExpense(data) {
  const payload = {
    name: data.name,
    description: data.description || null,
    amount: typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount,
    date: data.date,
    category_id: data.category_id,
  };
  return await apiRequest('/api/v1/expenses', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateExpense(expenseId, data) {
  const payload = { ...data };
  if (payload.amount !== undefined && payload.amount !== null) {
    payload.amount = typeof payload.amount === 'string' ? parseFloat(payload.amount) : payload.amount;
  }
  return await apiRequest(`/api/v1/expenses/${expenseId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteExpense(expenseId) {
  return await apiRequest(`/api/v1/expenses/${expenseId}`, {
    method: 'DELETE',
  });
}

export async function fetchTotalSpent(categoryId = null) {
  const query = categoryId ? `?category_id=${encodeURIComponent(categoryId)}` : '';
  return await apiRequest(`/api/v1/expenses/total${query}`);
}
