import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import formsRoutes from './routes/forms.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/forms', formsRoutes);

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

export default app;
