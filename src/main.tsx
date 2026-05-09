import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import AuthPage from './auth/AuthPage';
import { checkAuth } from './store/authSlice';

// Запускаем проверку токена
store.dispatch(checkAuth());

function Root() {
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Сразу проверяем
    const state = store.getState();
    if (state.auth.initialized) {
      setUser(!!state.auth.user);
      setReady(true);
    }

    // Подписываемся на изменения
    const unsub = store.subscribe(() => {
      const s = store.getState();
      if (s.auth.initialized) {
        setUser(!!s.auth.user);
        setReady(true);
      }
    });

    return unsub;
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif',
          color: '#6b7280',
          fontSize: 14,
        }}
      >
        Загрузка...
      </div>
    );
  }

  return user ? <App /> : <AuthPage />;
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root not found');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
