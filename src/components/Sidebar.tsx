import React from 'react';
import type { NavKey } from '../types/types';
import { cn } from '../types/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';

type Props = {
  active: NavKey;
  onNav: (key: NavKey) => void;
};

export default function Sidebar({ active, onNav }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-icon" aria-hidden="true">
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
          <span className="logo-title">EventForms</span>
        </div>

        <nav className="nav">
          <button
            type="button"
            className={cn('nav-link', active === 'forms' && 'nav-link--active')}
            onClick={() => onNav('forms')}
          >
            <span className="icon" aria-hidden="true">
              ≡
            </span>
            <span>Мои формы</span>
          </button>
          <button
            type="button"
            className={cn(
              'nav-link',
              active === 'analytics' && 'nav-link--active'
            )}
            onClick={() => onNav('analytics')}
          >
            <span className="icon" aria-hidden="true">
              📊
            </span>
            <span>Аналитика</span>
          </button>
          <button
            type="button"
            className={cn(
              'nav-link',
              active === 'profile' && 'nav-link--active'
            )}
            onClick={() => onNav('profile')}
          >
            <span className="icon" aria-hidden="true">
              👤
            </span>
            <span>Профиль</span>
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        {user && (
          <div style={{ marginBottom: 12, fontSize: 13, color: '#6b7280' }}>
            <div style={{ fontWeight: 500, color: '#111827' }}>{user.name}</div>
            <div style={{ fontSize: 12 }}>{user.email}</div>
          </div>
        )}
        <div className="sidebar-logout">
          <a
            href="#"
            className="sidebar-logout-link"
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
            }}
          >
            <span className="icon" aria-hidden="true">
              ↪
            </span>
            <span>Выйти</span>
          </a>
        </div>
        <div className="sidebar-copy">© 2024 EventForms</div>
      </div>
    </aside>
  );
}
