import { createSelector } from "@reduxjs/toolkit";

export const selectCampers = (state) => state.campers.items;
export const selectCurrentCamper = (state) => state.campers.currentCamper;
export const selectCampersLoading = (state) => state.campers.loading;
export const selectCampersError = (state) => state.campers.error;
export const selectHasMore = (state) => state.campers.hasMore;
export const selectCurrentPage = (state) => state.campers.page;
export const selectLimit = (state) => state.campers.limit;
export const selectTotal = (state) => state.campers.total;
export const selectFilters = (state) => state.campers.filters;

export const selectFavoriteIds = (state) => state.favorites.favoriteIds;

export const selectCampersWithFavorites = createSelector(
  [selectCampers, selectFavoriteIds],
  (campers, favoriteIds) => {
    return campers.map((camper) => ({
      ...camper,
      isFavorite: favoriteIds.includes(camper.id),
    }));
  }
);

export const selectFavoriteCampers = createSelector(
  [selectCampers, selectFavoriteIds],
  (campers, favoriteIds) => {
    return campers.filter((camper) => favoriteIds.includes(camper.id));
  }
);

export const selectIsFavorite = (camperId) =>
  createSelector([selectFavoriteIds], (favoriteIds) =>
    favoriteIds.includes(camperId)
  );

export const selectFavoritesCount = createSelector(
  [selectFavoriteIds],
  (favoriteIds) => favoriteIds.length
);

export const selectFilteredCampers = createSelector(
  [selectCampersWithFavorites, selectFilters],
  (campers, filters) => {
    let filtered = campers;

    if (filters.location) {
      filtered = filtered.filter((camper) =>
        camper.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.bodyType) {
      filtered = filtered.filter((camper) => camper.form === filters.bodyType);
    }

    if (filters.features.length > 0) {
      filtered = filtered.filter((camper) => {
        return filters.features.every((feature) => {
          switch (feature) {
            case "AC":
              return camper.AC;
            case "kitchen":
              return camper.kitchen;
            case "TV":
              return camper.TV;
            case "bathroom":
              return camper.bathroom;
            case "radio":
              return camper.radio;
            case "refrigerator":
            case "microwave":
            case "gas":
            case "water":
              return camper[feature];
            default:
              return true;
          }
        });
      });
    }

    return filtered;
  }
);

export const selectCampersStats = createSelector(
  [selectCampers, selectTotal, selectCurrentPage, selectLimit],
  (campers, total, page, limit) => ({
    loaded: campers.length,
    total,
    currentPage: page,
    totalPages: total > 0 ? Math.ceil(total / limit) : 0,
    hasMore: campers.length < total,
  })
);
