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

      if (filters.location && filters.location.trim()) {
        params.append("location", filters.location.trim());
      }

      const bodyTypeMapping = {
        panel: "panelTruck",
        fully_integrated: "fullyIntegrated",
        alcove: "alcove",
      };

      if (filters.bodyType && filters.bodyType.trim()) {
        const mappedBodyType =
          bodyTypeMapping[filters.bodyType] || filters.bodyType;
        params.append("form", mappedBodyType);
      }

      if (
        filters.features &&
        Array.isArray(filters.features) &&
        filters.features.length > 0
      ) {
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
          }
        });
      }

      const response = await api.get(`/campers?${params.toString()}`);

      const responseData = response.data;
      const totalItems = responseData?.total || 0;
      let fetchedItems = responseData?.items || responseData || [];

      if (!Array.isArray(fetchedItems)) {
        fetchedItems = [];
      }

      if (
        filters.features &&
        Array.isArray(filters.features) &&
        filters.features.includes("transmission")
      ) {
        fetchedItems = fetchedItems.filter(
          (item) => item?.transmission === "automatic"
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
      // обробка 404 як пустий результат, а не як помилка
      if (error.response?.status === 404) {
        return {
          items: [],
          page,
          hasMore: false,
          total: 0,
          isEmpty: true, // флаг що нема данихпо фільтрам
        };
      }

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch campers"
      );
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        throw new Error("Camper ID is required");
      }

      const response = await api.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch camper details"
      );
    }
  }
);

export const bookCamper = createAsyncThunk(
  "campers/bookCamper",
  async ({ camperId, bookingData }, { rejectWithValue }) => {
    try {
      if (!camperId || !bookingData) {
        throw new Error("Camper ID and booking data are required");
      }

      const response = await api.post(`/campers/${camperId}/book`, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to book camper"
      );
    }
  }
);
