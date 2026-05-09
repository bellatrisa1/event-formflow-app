import { createAsyncThunk } from "@reduxjs/toolkit";
import { formsAPI } from "../api";
import type { FormItem, FormDraft } from "../types/types";

export const fetchForms = createAsyncThunk(
  "forms/fetchAll",
  async () => {
    return await formsAPI.getAll();
  }
);

export const createForm = createAsyncThunk(
  "forms/create",
  async (draft: FormDraft) => {
    return await formsAPI.create(draft);
  }
);

export const updateFormThunk = createAsyncThunk(
  "forms/update",
  async ({ id, data }: { id: string; data: Partial<FormItem> }) => {
    return await formsAPI.update(id, data);
  }
);

export const deleteFormThunk = createAsyncThunk(
  "forms/delete",
  async (id: string) => {
    await formsAPI.delete(id);
    return id;
  }
);

export const cloneFormThunk = createAsyncThunk(
  "forms/clone",
  async (id: string) => {
    return await formsAPI.clone(id);
  }
);