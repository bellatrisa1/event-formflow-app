import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { FormItem, FormDraft } from '../types/types';
import { uid } from '../types/utils';
import { api, formsAPI } from '../api';

type FormsState = {
  list: FormItem[];
  loading: boolean;
  error: string | null;
};

const initialState: FormsState = {
  list: [],
  loading: false,
  error: null,
};

// Загрузить формы с сервера
export const fetchForms = createAsyncThunk('forms/fetchAll', async () => {
  return await formsAPI.getAll();
});

// Создать форму
export const createForm = createAsyncThunk(
  'forms/create',
  async (data: FormDraft) => {
    return await formsAPI.create(data);
  }
);

// Обновить форму
export const updateFormAsync = createAsyncThunk(
  'forms/update',
  async ({ id, data }: { id: string; data: Partial<FormItem> }) => {
    return await formsAPI.update(id, data);
  }
);

// Удалить форму
export const deleteFormAsync = createAsyncThunk(
  'forms/delete',
  async (id: string) => {
    await formsAPI.delete(id);
    return id;
  }
);

// Клонировать форму
export const cloneFormAsync = createAsyncThunk(
  'forms/clone',
  async (id: string) => {
    return await formsAPI.clone(id);
  }
);

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchForms
      .addCase(fetchForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchForms.fulfilled,
        (state, action: PayloadAction<FormItem[]>) => {
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки форм';
      })

      // createForm
      .addCase(
        createForm.fulfilled,
        (state, action: PayloadAction<FormItem>) => {
          state.list.unshift(action.payload);
        }
      )

      // updateFormAsync
      .addCase(
        updateFormAsync.fulfilled,
        (state, action: PayloadAction<FormItem>) => {
          const idx = state.list.findIndex((f) => f.id === action.payload.id);
          if (idx !== -1) {
            state.list[idx] = action.payload;
          }
        }
      )

      // deleteFormAsync
      .addCase(
        deleteFormAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter((f) => f.id !== action.payload);
        }
      )

      // cloneFormAsync
      .addCase(
        cloneFormAsync.fulfilled,
        (state, action: PayloadAction<FormItem>) => {
          state.list.unshift(action.payload);
        }
      );
  },
});

export default formsSlice.reducer;
