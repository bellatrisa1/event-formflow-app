import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectForms = (state: RootState) => state.forms.list;
export const selectQuery = (state: RootState) => state.ui.query;
export const selectSort = (state: RootState) => state.ui.sort;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthInitialized = (state: RootState) =>
  state.auth.initialized;

export const selectFilteredForms = createSelector(
  [selectForms, selectQuery, selectSort],
  (forms, query, sort) => {
    const q = query.trim().toLowerCase();
    let list = forms.filter((f) => f.title.toLowerCase().includes(q));

    if (sort === 'alpha') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    } else if (sort === 'responses') {
      list = [...list].sort((a, b) => b.responses - a.responses);
    } else {
      list = [...list].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
    }

    return list;
  }
);

export const selectTotals = createSelector([selectForms], (forms) => {
  const totalParticipants = forms.reduce((s, f) => s + (f.responses || 0), 0);
  return { totalParticipants, avgRating: 4.8 };
});
