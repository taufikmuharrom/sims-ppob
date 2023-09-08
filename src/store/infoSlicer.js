import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bannerApi, serviceApi } from "../services/api";

export const getServices = createAsyncThunk(
  "info/getServices",
  async (payloads, thunkAPI) => {
    try {
      const data = await serviceApi();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBanners = createAsyncThunk(
  "info/getBanners",
  async (payloads, thunkAPI) => {
    try {
      const data = await bannerApi();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  serviceList: [],
  bannerList: [],
  errorMessageInfo: "",
};

const transcSlicer = createSlice({
  name: "transc",
  initialState,
  extraReducers: {
    [getServices.fulfilled]: (state, action) => {
      const serviceList = action?.payload?.data?.data;
      state.serviceList = serviceList;
    },
    [getServices.rejected]: (state, action) => {
      state.errorMessageInfo = action.payload;
    },
    [getBanners.fulfilled]: (state, action) => {
      const bannerList = action?.payload?.data?.data;
      state.bannerList = bannerList;
    },
    [getBanners.rejected]: (state, action) => {
      state.errorMessageInfo = action.payload;
    },
  },
});

export default transcSlicer.reducer;
