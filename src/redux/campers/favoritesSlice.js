import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const camperId = action.payload;
      if (!state.favoriteIds.includes(camperId)) {
        state.favoriteIds.push(camperId);
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.favoriteIds = state.favoriteIds.filter((id) => id !== camperId);
    },
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      if (state.favoriteIds.includes(camperId)) {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== camperId);
      } else {
        state.favoriteIds.push(camperId);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
