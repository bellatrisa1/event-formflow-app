import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, register, clearError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'; // если есть роутер

// Если роутера нет — используем просто функцию вместо navigate
// Пока сделаем без роутера, просто перезагрузка или колбэк

import './auth.scss';

type Tab = 'login' | 'register';

type LoginState = {
  email: string;
  password: string;
};

type RegisterState = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [tab, setTab] = useState<Tab>('login');

  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
  });

  const [regState, setRegState] = useState<RegisterState>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const canRegister = useMemo(() => {
    if (!regState.name.trim()) return false;
    if (!regState.email.trim()) return false;
    if (regState.password.length < 6) return false;
    if (regState.password !== regState.password2) return false;
    return true;
  }, [regState]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    dispatch(clearError());

    if (!loginState.email.trim() || !loginState.password.trim()) {
      return;
    }

    dispatch(login({ email: loginState.email, password: loginState.password }));
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    dispatch(clearError());

    if (!canRegister) {
      if (regState.password !== regState.password2) {
        return;
      }
      return;
    }

    dispatch(
      register({
        name: regState.name,
        email: regState.email,
        password: regState.password,
      })
    );
  }

  return (
    <div className="auth-body">
      <div className="auth-layout">
        <main className="auth-card">
          {/* LEFT BRAND */}
          <div className="auth-brand">
            <div className="auth-logo">
              <div className="auth-logo-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#7C3AED" opacity="0.1" />
                  <path
                    d="M8 9l4 4 4-4"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="auth-logo-text">
                <div className="auth-logo-title">EventForms</div>
                <div className="auth-logo-subtitle">
                  Панель управления мероприятиями
                </div>
              </div>
            </div>

            <p className="auth-brand-text">
              Создавайте формы регистрации, собирайте ответы и смотрите
              аналитику по событиям в одном месте.
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="auth-panel">
            {/* Tabs */}
            <div className="auth-tabs" role="tablist" aria-label="Auth tabs">
              <button
                type="button"
                className={
                  tab === 'login'
                    ? 'auth-tab-label auth-tab-label--active'
                    : 'auth-tab-label'
                }
                onClick={() => {
                  dispatch(clearError());
                  setTab('login');
                }}
                role="tab"
                aria-selected={tab === 'login'}
              >
                Вход
              </button>

              <button
                type="button"
                className={
                  tab === 'register'
                    ? 'auth-tab-label auth-tab-label--active'
                    : 'auth-tab-label'
                }
                onClick={() => {
                  dispatch(clearError());
                  setTab('register');
                }}
                role="tab"
                aria-selected={tab === 'register'}
              >
                Регистрация
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="auth-message auth-message--error">{error}</div>
            )}

            {/* Loading */}
            {loading && <div className="auth-message">Загрузка...</div>}

            {/* LOGIN FORM */}
            {tab === 'login' && (
              <form
                className="auth-form"
                autoComplete="on"
                onSubmit={handleLogin}
              >
                <div className="auth-form-header">
                  <h1>Войти в аккаунт</h1>
                  <p>
                    Введите логин и пароль, чтобы открыть панель EventForms.
                  </p>
                </div>

                <div className="auth-field">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={loginState.email}
                    onChange={(e) =>
                      setLoginState((s) => ({
                        ...s,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="auth-field">
                  <div className="auth-field-label-row">
                    <label htmlFor="login-password">Пароль</label>
                    <button
                      type="button"
                      className="auth-link-small"
                      onClick={() =>
                        alert('Восстановление пароля пока недоступно')
                      }
                    >
                      Забыли пароль?
                    </button>
                  </div>

                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    placeholder="Введите пароль"
                    required
                    value={loginState.password}
                    onChange={(e) =>
                      setLoginState((s) => ({
                        ...s,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="auth-btn auth-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Вход...' : 'Войти'}
                </button>

                <p className="auth-bottom-text">
                  Нет аккаунта?{' '}
                  <button
                    type="button"
                    className="auth-link-inline"
                    onClick={() => {
                      dispatch(clearError());
                      setTab('register');
                    }}
                  >
                    Зарегистрироваться
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === 'register' && (
              <form
                className="auth-form"
                autoComplete="on"
                onSubmit={handleRegister}
              >
                <div className="auth-form-header">
                  <h1>Создать аккаунт</h1>
                  <p>
                    Зарегистрируйтесь, чтобы начать управлять мероприятиями.
                  </p>
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-name">Имя</label>
                  <input
                    type="text"
                    id="reg-name"
                    name="name"
                    placeholder="Как к вам обращаться"
                    required
                    value={regState.name}
                    onChange={(e) =>
                      setRegState((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-email">E-mail</label>
                  <input
                    type="email"
                    id="reg-email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={regState.email}
                    onChange={(e) =>
                      setRegState((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-password">Пароль</label>
                  <input
                    type="password"
                    id="reg-password"
                    name="password"
                    placeholder="Придумайте пароль (мин. 6 символов)"
                    required
                    minLength={6}
                    value={regState.password}
                    onChange={(e) =>
                      setRegState((s) => ({
                        ...s,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="reg-password2">Повторите пароль</label>
                  <input
                    type="password"
                    id="reg-password2"
                    name="password2"
                    placeholder="Повторите пароль"
                    required
                    value={regState.password2}
                    onChange={(e) =>
                      setRegState((s) => ({
                        ...s,
                        password2: e.target.value,
                      }))
                    }
                  />
                  {regState.password2 &&
                    regState.password !== regState.password2 && (
                      <span style={{ color: 'red', fontSize: '0.8rem' }}>
                        Пароли не совпадают
                      </span>
                    )}
                </div>

                <button
                  type="submit"
                  className="auth-btn auth-btn-primary"
                  disabled={!canRegister || loading}
                >
                  {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>

                <p className="auth-bottom-text">
                  Уже есть аккаунт?{' '}
                  <button
                    type="button"
                    className="auth-link-inline"
                    onClick={() => {
                      dispatch(clearError());
                      setTab('login');
                    }}
                  >
                    Войти
                  </button>
                </p>
              </form>
            )}
          </div>
        </main>

        <footer className="auth-footer">
          © 2024 EventForms • Управление формами для мероприятий
        </footer>
      </div>
    </div>
  );
}
