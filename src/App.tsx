import React, { useEffect } from 'react';
import './App.scss';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FormsToolbar from './components/FormsToolbar';
import FormCard from './components/FormCard';
import AnalyticsSection from './components/AnalyticsSection';
import FormModal from './components/FormModal';

import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectFilteredForms, selectTotals } from './store/selectors';
import {
  setNav,
  setQuery,
  setSort,
  openCreateModal,
  openEditModal,
  closeModal,
} from './store/uiSlice';
import {
  fetchForms,
  createForm,
  updateFormAsync,
  deleteFormAsync,
  cloneFormAsync,
} from './store/formsSlice';
import { logout } from './store/authSlice';

export default function App() {
  const dispatch = useAppDispatch();

  const { activeNav, query, sort, modal } = useAppSelector((s) => s.ui);
  const { list: forms, loading } = useAppSelector((s) => s.forms);
  const user = useAppSelector((s) => s.auth.user);
  const filtered = useAppSelector(selectFilteredForms);
  const totals = useAppSelector(selectTotals);

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  return (
    <div className="app">
      <Sidebar active={activeNav} onNav={(key) => dispatch(setNav(key))} />

      <main className="main">
        <Header
          title={
            activeNav === 'forms'
              ? 'Мои формы'
              : activeNav === 'analytics'
                ? 'Аналитика'
                : 'Профиль'
          }
          subtitle={
            activeNav === 'forms'
              ? 'Управляйте регистрациями на ваши мероприятия'
              : activeNav === 'analytics'
                ? 'Статистика по вашим мероприятиям'
                : 'Настройки и данные аккаунта'
          }
          query={query}
          onQuery={(v) => dispatch(setQuery(v))}
          onCreate={() => dispatch(openCreateModal())}
          showActions={activeNav === 'forms'}
        />

        <section className="content">
          {activeNav === 'forms' && (
            <>
              <FormsToolbar
                count={filtered.length}
                sort={sort}
                onSort={(v) => dispatch(setSort(v))}
              />

              {loading ? (
                <p style={{ color: '#6b7280', fontSize: 14 }}>
                  Загрузка форм...
                </p>
              ) : filtered.length === 0 ? (
                <div
                  className="card"
                  style={{ padding: 32, textAlign: 'center' }}
                >
                  <p
                    style={{ fontSize: 16, fontWeight: 500, margin: '0 0 8px' }}
                  >
                    Нет форм
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#6b7280',
                      margin: '0 0 16px',
                    }}
                  >
                    {forms.length === 0
                      ? 'Создайте первую форму, чтобы начать работу.'
                      : 'Ничего не найдено по вашему запросу.'}
                  </p>
                  {forms.length === 0 && (
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(openCreateModal())}
                    >
                      ＋ Создать форму
                    </button>
                  )}
                </div>
              ) : (
                <div className="forms-grid">
                  {filtered.map((f) => (
                    <FormCard
                      key={f.id}
                      form={f}
                      onEdit={() => dispatch(openEditModal(f))}
                      onAnalytics={() => dispatch(setNav('analytics'))}
                      onClone={() => dispatch(cloneFormAsync(f.id))}
                      onDelete={() => dispatch(deleteFormAsync(f.id))}
                    />
                  ))}
                </div>
              )}

              {forms.length > 0 && (
                <AnalyticsSection
                  forms={forms}
                  totalParticipants={totals.totalParticipants}
                  avgRating={totals.avgRating}
                />
              )}
            </>
          )}

          {activeNav === 'analytics' && (
            <AnalyticsSection
              forms={forms}
              totalParticipants={totals.totalParticipants}
              avgRating={totals.avgRating}
              standalone
            />
          )}

          {activeNav === 'profile' && (
            <div className="card profile-card">
              <h2 className="section-title">Профиль</h2>
              <p className="section-subtitle">Данные вашего аккаунта</p>

              <div className="profile-grid">
                <div className="profile-field">
                  <div className="profile-label">Имя</div>
                  <div className="profile-value">{user?.name || '—'}</div>
                </div>
                <div className="profile-field">
                  <div className="profile-label">Email</div>
                  <div className="profile-value">{user?.email || '—'}</div>
                </div>
                <div className="profile-field">
                  <div className="profile-label">Всего форм</div>
                  <div className="profile-value">{forms.length}</div>
                </div>
                <div className="profile-field">
                  <div className="profile-label">Всего ответов</div>
                  <div className="profile-value">
                    {totals.totalParticipants}
                  </div>
                </div>
              </div>

              <button
                className="btn btn-danger"
                style={{ marginTop: 20 }}
                onClick={() => dispatch(logout())}
              >
                ↪ Выйти из аккаунта
              </button>
            </div>
          )}
        </section>
      </main>

      <FormModal
        open={modal.open}
        mode={modal.mode}
        form={modal.open && modal.mode === 'edit' ? modal.form : null}
        onClose={() => dispatch(closeModal())}
        onSubmit={(payload) => {
          if (modal.open && modal.mode === 'create') {
            dispatch(createForm(payload));
          } else if (modal.open && modal.mode === 'edit' && modal.form) {
            dispatch(updateFormAsync({ id: modal.form.id, data: payload }));
          }
          dispatch(closeModal());
        }}
      />
    </div>
  );
}
