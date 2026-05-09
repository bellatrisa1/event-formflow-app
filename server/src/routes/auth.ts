import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { db } from '../db/database.js';
import { signToken } from '../utils/jwt.js';
import { asyncHandler } from '../utils/errors.js';
import { authMiddleware } from '../middleware/auth.js';
import { z } from 'zod';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль минимум 6 символов'),
});

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

// POST /api/auth/register
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);
    const users = db.getUsers();

    const existing = users.find((u) => u.email === body.email);
    if (existing) {
      res
        .status(409)
        .json({ message: 'Пользователь с таким email уже существует' });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
      id: uuid(),
      name: body.name,
      email: body.email,
      password: hashedPassword,
    };

    users.push(newUser);
    db.saveUsers(users);

    const token = signToken({ userId: newUser.id, email: newUser.email });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true на production с HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    res.status(201).json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  })
);

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);
    const users = db.getUsers();

    const user = users.find((u) => u.email === body.email);
    if (!user) {
      res.status(401).json({ message: 'Неверный email или пароль' });
      return;
    }

    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) {
      res.status(401).json({ message: 'Неверный email или пароль' });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  })
);

// GET /api/auth/me
router.get(
  '/me',
  authMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    const users = db.getUsers();
    const user = users.find((u) => u.id === req.userId);

    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  })
);

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Вы вышли из системы' });
});

export default router;
