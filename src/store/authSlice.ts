import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean; // true когда проверили токен при загрузке
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

// Проверить токен при загрузке приложения
export const checkAuth = createAsyncThunk("auth/check", async () => {
  const data = await api<{ user: User }>("/api/auth/me");
  return data.user;
});

// Регистрация
export const register = createAsyncThunk(
  "auth/register",
  async (body: { name: string; email: string; password: string }) => {
    const data = await api<{ user: User }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return data.user;
  }
);

// Вход
export const login = createAsyncThunk(
  "auth/login",
  async (body: { email: string; password: string }) => {
    const data = await api<{ user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return data.user;
  }
);

// Выход
export const logout = createAsyncThunk("auth/logout", async () => {
  await api("/api/auth/logout", { method: "POST" });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.initialized = true;
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
