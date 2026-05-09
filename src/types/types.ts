export type Theme =
  | "violet"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "black"
  | "white"
  | "brown"
  | "red";

export type NavKey = "forms" | "analytics" | "profile";

export type SortKey = "date" | "alpha" | "responses";

export type FormItem = {
  id: string;
  title: string;
  theme: Theme;
  responses: number;
  createdAt: string; // YYYY-MM-DD
  lastResponseAt: string; // YYYY-MM-DD
  updatedAt: number; // timestamp ms
};

export type FormDraft = Omit<FormItem, "updatedAt"> & { updatedAt?: number };
