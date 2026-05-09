import React, { useEffect, useMemo, useState } from 'react';
import type { FormDraft, FormItem, Theme } from '../types/types';
import { THEME_ICONS, THEME_LABELS } from '../types/utils';
import Modal from './Modal';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  form: FormItem | null;
  onClose: () => void;
  onSubmit: (payload: FormDraft) => void;
};

export default function FormModal({
  open,
  mode,
  form,
  onClose,
  onSubmit,
}: Props) {
  const isEdit = mode === 'edit';

  const initial = useMemo<FormDraft>(() => {
    if (!isEdit || !form) {
      const iso = new Date().toISOString().slice(0, 10);
      return {
        id: '',
        title: '',
        theme: 'violet',
        responses: 0,
        createdAt: iso,
        lastResponseAt: iso,
      };
    }
    return {
      id: form.id,
      title: form.title,
      theme: form.theme ?? 'violet',
      responses: Number(form.responses) || 0,
      createdAt: form.createdAt,
      lastResponseAt: form.lastResponseAt,
    };
  }, [isEdit, form]);

  const [state, setState] = useState<FormDraft>(initial);

  useEffect(() => {
    if (open) setState(initial);
  }, [open, initial]);

  function setField<K extends keyof FormDraft>(key: K, value: FormDraft[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = state.title.trim();
    if (!title) {
      alert('Введите название формы.');
      return;
    }
    onSubmit({
      ...state,
      title,
      responses: Math.max(0, Number(state.responses) || 0),
    });
  }

  return (
    <Modal
      open={open}
      title={isEdit ? 'Редактировать форму' : 'Новая форма'}
      onClose={onClose}
    >
      <form className="modal-body" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Название</label>
          <input
            className="input"
            value={state.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="Например: Регистрация на митап"
          />
        </div>

        <div className="field">
          <label className="label">Тема</label>
          <select
            className="input"
            value={state.theme}
            onChange={(e) => setField('theme', e.target.value as Theme)}
          >
            {(Object.entries(THEME_LABELS) as [Theme, string][]).map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {THEME_ICONS[key]} {label}
                </option>
              )
            )}
          </select>
        </div>

        <div className="field field-row">
          <div className="field">
            <label className="label">Ответы</label>
            <input
              className="input"
              type="number"
              min={0}
              value={state.responses}
              onChange={(e) => setField('responses', Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label className="label">Дата создания</label>
            <input
              className="input"
              type="date"
              value={state.createdAt}
              onChange={(e) => setField('createdAt', e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Последний ответ</label>
          <input
            className="input"
            type="date"
            value={state.lastResponseAt}
            onChange={(e) => setField('lastResponseAt', e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Отмена
          </button>
          <button className="btn btn-primary" type="submit">
            {isEdit ? 'Сохранить' : 'Создать'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
