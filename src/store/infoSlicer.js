import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceApi } from "../services/api";

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

const initialState = {
  serviceList: "",
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
  },
});

export default transcSlicer.reducer;
