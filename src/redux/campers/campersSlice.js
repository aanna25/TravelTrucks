import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "../operations";

const initialState = {
  items: [],
  currentCamper: null,
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
  limit: 4,
  total: 0,
  isEmpty: false,
  filters: {
    location: "",
    bodyType: "",
    features: [],
  },
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    resetCampers: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
      state.isEmpty = false;
    },
    resetCurrentCamper: (state) => {
      state.currentCamper = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        const { items, page, hasMore, total, isEmpty } = action.payload;

        if (page === 1) {
          state.items = items;
        } else {
          state.items.push(...items);
        }
        state.page = page;
        state.hasMore = hasMore;
        state.total = total;
        state.isEmpty = isEmpty || false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasMore = false;
      })

      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  resetCampers,
  resetCurrentCamper,
  setPage,
} = campersSlice.actions;
export default campersSlice.reducer;
