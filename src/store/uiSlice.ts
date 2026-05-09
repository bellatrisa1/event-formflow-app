import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NavKey } from "../types/types";
import type { FormItem } from "../types/types";

type ModalState =
  | { open: false; mode: "create" | "edit"; form: FormItem | null }
  | { open: true; mode: "create"; form: null }
  | { open: true; mode: "edit"; form: FormItem };

type UiState = {
  activeNav: NavKey;
  query: string;
  sort: "date" | "alpha" | "responses";
  modal: ModalState;
};

const initialState: UiState = {
  activeNav: "forms",
  query: "",
  sort: "date",
  modal: { open: false, mode: "create", form: null },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNav: (state, action: PayloadAction<NavKey>) => {
      state.activeNav = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSort: (state, action: PayloadAction<"date" | "alpha" | "responses">) => {
      state.sort = action.payload;
    },

    openCreateModal: (state) => {
      state.modal = { open: true, mode: "create", form: null };
    },
    openEditModal: (state, action: PayloadAction<FormItem>) => {
      state.modal = { open: true, mode: "edit", form: action.payload };
    },
    closeModal: (state) => {
      state.modal = { open: false, mode: "create", form: null };
    },
  },
});

export const {
  setNav,
  setQuery,
  setSort,
  openCreateModal,
  openEditModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;