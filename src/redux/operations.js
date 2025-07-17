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

      if (filters.bodyType) {
        params.append("form", filters.bodyType);
      }

      // обрабока features
      if (filters.features && filters.features.length > 0) {
        filters.features.forEach((feature) => {
          // обрабка для transmission
          if (feature === "transmission") {
            params.append("transmission", "automatic");
          } else {
            // для решти (AC, kitchen, TV, bathroom)
            params.append(feature, "true");
          }
        });
      }

      const response = await api.get(`/campers?${params.toString()}`);

      const totalItems = response.data.total || 0;
      const fetchedItems = response.data.items || [];

      const hasMore = page * limit < totalItems;

      return {
        items: fetchedItems,
        page,
        hasMore,
        total: totalItems,
      };
    } catch (error) {
      console.error(
        "Error fetching campers:",
        error.response?.data || error.message
      );
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
