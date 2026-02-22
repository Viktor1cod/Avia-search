import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Ticket, SortType } from "../types/ticket";

type AppState = {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;

  visible: number;

  sort: SortType;
  stops: number[]; // выбранные количества пересадок: [0,1,2,3]
};

const initialState: AppState = {
  tickets: [],
  loading: false,
  error: null,

  visible: 5,

  sort: "cheap",
  stops: [],
};

export const fetchTickets = createAsyncThunk<Ticket[]>(
  "app/fetchTickets",
  async () => {
    const res = await fetch("/tickets.json");
    if (!res.ok) throw new Error("Не удалось загрузить tickets.json");
    const data = (await res.json()) as Omit<Ticket, "id">[];

    // даём id на клиенте
    return data.map((t, i) => ({
      ...t,
      id: String(i),
    }));
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSort(state, action: { payload: SortType }) {
      state.sort = action.payload;
    },

    toggleStop(state, action: { payload: number }) {
      const value = action.payload;
      if (state.stops.includes(value)) {
        state.stops = state.stops.filter((x) => x !== value);
      } else {
        state.stops.push(value);
      }
    },

    loadMore(state) {
      state.visible += 5;
    },

    resetVisible(state) {
      state.visible = 5;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Ошибка загрузки";
    });
  },
});

export const { setSort, toggleStop, loadMore, resetVisible } = appSlice.actions;
export default appSlice.reducer;