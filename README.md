# 🎪 Event Form Flow App

**Панель управления формами для мероприятий**

Создавайте формы регистрации, собирайте ответы и отслеживайте аналитику по событиям в одном месте.

---

🔗 Demo:

## ✨ Возможности

- 🔐 **Авторизация** — регистрация, вход, JWT в httpOnly cookie
- 📋 **Управление формами** — создание, редактирование, клонирование, удаление
- 🎨 **9 цветовых тем** — фиолетовый, оранжевый, жёлтый, зелёный, синий, чёрный, белый, коричневый, красный
- 🔍 **Поиск и сортировка** — по названию, дате, количеству ответов
- 📊 **Аналитика** — график динамики регистраций, статистика по формам
- 👤 **Профиль** — данные аккаунта, количество форм и ответов
- 💾 **JSON-база данных** — никаких СУБД, всё хранится в файле

---

## 🚀 Стек технологий

### Фронтенд
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![Sass](https://img.shields.io/badge/Sass-1.97-CC6699?logo=sass)

### Бэкенд
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![JWT](https://img.shields.io/badge/JWT-9.0-000000?logo=jsonwebtokens)
![Zod](https://img.shields.io/badge/Zod-3.23-3E67B1?logo=zod)

---

## 📦 Установка и запуск

### 1. Клонируй репозиторий

```bash
git clone https://github.com/твой-юзернейм/eventforms.git
cd eventforms
```

### 2. Установи зависимости

```bash
# Фронтенд
npm install

# Сервер
cd server
npm install
cd ..
```

### 3. Запусти сервер

```bash
cd server
npm run dev
```

Сервер запустится на **http://localhost:5050** 🚀

### 4. Запусти фронтенд (в новом терминале)

```bash
npm run dev
```

Открой **http://localhost:5173** 🎨

---

## 📂 Структура проекта

```
eventforms/
├── src/                          # Фронтенд
│   ├── components/               # React-компоненты
│   │   ├── AnalyticsSection.tsx  # График и таблица аналитики
│   │   ├── FormCard.tsx          # Карточка формы
│   │   ├── FormModal.tsx         # Модалка создания/редактирования
│   │   ├── FormsToolbar.tsx      # Панель сортировки
│   │   ├── Header.tsx            # Шапка с поиском
│   │   ├── Modal.tsx             # Базовый компонент модалки
│   │   └── Sidebar.tsx           # Боковая панель навигации
│   ├── auth/
│   │   ├── AuthPage.tsx          # Страница входа/регистрации
│   │   └── auth.scss             # Стили авторизации
│   ├── store/
│   │   ├── authSlice.ts          # Redux: авторизация
│   │   ├── formsSlice.ts         # Redux: формы
│   │   ├── uiSlice.ts            # Redux: UI-состояние
│   │   ├── hooks.ts              # Типизированные хуки
│   │   └── selectors.ts          # Мемоизированные селекторы
│   ├── types/
│   │   ├── types.ts              # Типы и интерфейсы
│   │   ├── data.ts               # Начальные данные и моки
│   │   └── utils.ts              # Утилиты и хелперы
│   ├── api.ts                    # HTTP-клиент
│   ├── App.tsx                   # Главный компонент
│   ├── App.scss                  # Глобальные стили
│   ├── main.tsx                  # Точка входа
│   └── store.tsx                 # Конфигурация Redux
├── server/                       # Бэкенд
│   └── src/
│       ├── routes/
│       │   ├── auth.ts           # Роуты авторизации
│       │   └── forms.ts          # CRUD форм
│       ├── middleware/
│       │   └── auth.ts           # JWT middleware
│       ├── db/
│       │   └── database.ts       # Работа с JSON-базой
│       ├── data/
│       │   └── db.json           # JSON-файл базы данных
│       ├── utils/
│       │   ├── jwt.ts            # Генерация и проверка токенов
│       │   └── errors.ts         # Обработка ошибок
│       ├── app.ts                # Express приложение
│       └── index.ts              # Точка входа сервера
├── package.json                  # Зависимости фронтенда
├── vite.config.ts                # Конфиг Vite
└── README.md                     # Ты здесь :)
```

---

## 🔌 API

| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/api/auth/register` | Регистрация |
| `POST` | `/api/auth/login` | Вход |
| `GET` | `/api/auth/me` | Текущий пользователь |
| `POST` | `/api/auth/logout` | Выход |
| `GET` | `/api/forms` | Список форм |
| `POST` | `/api/forms` | Создать форму |
| `PATCH` | `/api/forms/:id` | Обновить форму |
| `DELETE` | `/api/forms/:id` | Удалить форму |
| `POST` | `/api/forms/:id/clone` | Клонировать форму |

---

## 🎨 Цветовые темы

| Цвет | Иконка | Название |
|------|--------|----------|
| 🟪 Фиолетовый | `violet` | По умолчанию |
| 🟧 Оранжевый | `orange` | — |
| 🟨 Жёлтый | `yellow` | — |
| 🟩 Зелёный | `green` | — |
| 🟦 Синий | `blue` | — |
| ⬛️ Чёрный | `black` | — |
| ⬜️ Белый | `white` | — |
| 🟫 Коричневый | `brown` | — |
| 🟥 Красный | `red` | — |

---

## 🛠️ Команды

### Фронтенд

```bash
npm run dev        # Запуск в режиме разработки
npm run build      # Сборка для продакшена
npm run preview    # Предпросмотр сборки
npm run lint       # Проверка ESLint
```

### Сервер

```bash
cd server
npm run dev        # Запуск с авто-перезагрузкой
npm run build      # Компиляция TypeScript
npm start          # Запуск скомпилированной версии
```

---

## 📝 Примечания

- База данных хранится в `server/src/data/db.json`
- Пароли хэшируются через `bcryptjs`
- Токен живёт 7 дней в httpOnly cookie
- Проект учебный, не используй в продакшене без доработок
