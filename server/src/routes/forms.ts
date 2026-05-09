import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { db } from '../db/database.js';
import { asyncHandler } from '../utils/errors.js';
import { authMiddleware } from '../middleware/auth.js';
import { z } from 'zod';

const router = Router();

// Все роуты защищены авторизацией
router.use(authMiddleware);

const formSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  theme: z
    .enum(["violet", "orange", "yellow", "green", "blue", "black", "white", "brown", "red"])
    .default("violet"),
  responses: z.number().min(0).default(0),
  createdAt: z.string(),
  lastResponseAt: z.string(),
});

// GET /api/forms
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const forms = db.getForms().filter((f) => f.userId === req.userId);
    res.json(forms);
  })
);

// POST /api/forms
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const body = formSchema.parse(req.body);
    const forms = db.getForms();

    const newForm = {
      id: uuid(),
      userId: req.userId!,
      title: body.title,
      theme: body.theme,
      responses: body.responses,
      createdAt: body.createdAt,
      lastResponseAt: body.lastResponseAt,
      updatedAt: Date.now(),
    };

    forms.unshift(newForm);
    db.saveForms(forms);

    res.status(201).json(newForm);
  })
);

// PATCH /api/forms/:id
router.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const forms = db.getForms();
    const index = forms.findIndex(
      (f) => f.id === id && f.userId === req.userId
    );

    if (index === -1) {
      res.status(404).json({ message: 'Форма не найдена' });
      return;
    }

    const updates = formSchema.partial().parse(req.body);
    forms[index] = {
      ...forms[index],
      ...updates,
      updatedAt: Date.now(),
    };

    db.saveForms(forms);
    res.json(forms[index]);
  })
);

// DELETE /api/forms/:id
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    let forms = db.getForms();
    const form = forms.find((f) => f.id === id && f.userId === req.userId);

    if (!form) {
      res.status(404).json({ message: 'Форма не найдена' });
      return;
    }

    forms = forms.filter((f) => f.id !== id);
    db.saveForms(forms);

    res.json({ message: 'Форма удалена' });
  })
);

// POST /api/forms/:id/clone
router.post(
  '/:id/clone',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const forms = db.getForms();
    const original = forms.find((f) => f.id === id && f.userId === req.userId);

    if (!original) {
      res.status(404).json({ message: 'Форма не найдена' });
      return;
    }

    const cloned = {
      ...original,
      id: uuid(),
      title: `${original.title} (копия)`,
      updatedAt: Date.now(),
    };

    forms.unshift(cloned);
    db.saveForms(forms);

    res.status(201).json(cloned);
  })
);

export default router;
