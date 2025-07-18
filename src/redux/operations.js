import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, filters = {} }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.location) {
        params.append("location", filters.location);
      }
      const bodyTypeMapping = {
        panel: "panelTruck",
        fully_integrated: "fullyIntegrated",
        alcove: "alcove",
      };
      if (filters.bodyType) {
        const mappedBodyType =
          bodyTypeMapping[filters.bodyType] || filters.bodyType;
        params.append("form", mappedBodyType);
      }

      if (filters.features && filters.features.length > 0) {
        const validFeatures = [
          "AC",
          "kitchen",
          "TV",
          "bathroom",
          "radio",
          "refrigerator",
          "microwave",
          "gas",
          "water",
        ];
        filters.features.forEach((feature) => {
          if (validFeatures.includes(feature)) {
            params.append(feature, "true");
          } else if (feature === "transmission") {
            // Transmission filtering is handled locally, ignored in API params
          }
        });
      }

      const response = await api.get(`/campers?${params.toString()}`);

      const totalItems = response.data.total || 0;
      let fetchedItems = response.data.items || [];

      // локальна фільтрація за transmission
      if (filters.features && filters.features.includes("transmission")) {
        fetchedItems = fetchedItems.filter(
          (item) => item.transmission === "automatic"
        );
      }

      const hasMore = page * limit < totalItems;

      return {
        items: fetchedItems,
        page,
        hasMore,
        total: totalItems,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch campers"
      );
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch camper details"
      );
    }
  }
);

export const bookCamper = createAsyncThunk(
  "campers/bookCamper",
  async ({ camperId, bookingData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/campers/${camperId}/book`, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to book camper"
      );
    }
  }
);
