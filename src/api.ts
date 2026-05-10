import type { FormItem, FormDraft } from './types/types';

const API_URL = window.location.origin;

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Удобные методы для форм
export const formsAPI = {
  getAll: () => api<FormItem[]>('/api/forms'),

  create: (data: FormDraft) =>
    api<FormItem>('/api/forms', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<FormItem>) =>
    api<FormItem>(`/api/forms/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) => api<void>(`/api/forms/${id}`, { method: 'DELETE' }),

  clone: (id: string) =>
    api<FormItem>(`/api/forms/${id}/clone`, {
      method: 'POST',
    }),
};
