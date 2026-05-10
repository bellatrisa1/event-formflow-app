import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import formsRoutes from './routes/forms.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? false 
      : 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formsRoutes);

// Статика и SPA fallback
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '..', 'client');
  app.use(express.static(clientDistPath));
  app.get('*', (_req: any, res: any) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Обработка ошибок
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    if (err.name === 'ZodError') {
      res.status(400).json({
        message: 'Ошибка валидации',
        errors: err.errors,
      });
      return;
    }
    res.status(err.statusCode || 500).json({
      message: err.message || 'Внутренняя ошибка сервера',
    });
  }
);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Сервер EventForms запущен: http://localhost:${PORT}`);
});