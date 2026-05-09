import type { Theme } from "./types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatRelativeRu(ts: number) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const hour = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);

  if (min < 60) return `${min} минут назад`;
  if (hour < 24) return `${hour} часа назад`;
  if (day === 1) return `вчера`;
  if (day < 7) return `${day} дня назад`;
  return `давно`;
}

export function safeParseJSON<T>(v: string | null, fallback: T): T {
  if (!v) return fallback;
  try {
    const parsed = JSON.parse(v) as T;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function uid() {
  return (
    Math.random().toString(36).slice(2, 10) + "-" + Date.now().toString(36)
  );
}

export function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export const THEME_ICONS: Record<Theme, string> = {
  violet: "🟪",
  orange: "🟧",
  yellow: "🟨",
  green: "🟩",
  blue: "🟦",
  black: "⬛️",
  white: "⬜️",
  brown: "🟫",
  red: "🟥",
};

export const THEME_LABELS: Record<Theme, string> = {
  violet: "Фиолетовый",
  orange: "Оранжевый",
  yellow: "Жёлтый",
  green: "Зелёный",
  blue: "Синий",
  black: "Чёрный",
  white: "Белый",
  brown: "Коричневый",
  red: "Красный",
};