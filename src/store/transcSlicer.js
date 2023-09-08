import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { balanceApi } from "../services/api";

export const getBalance = createAsyncThunk(
  "transc/getBalance",
  async (payloads, thunkAPI) => {
    try {
      const data = await balanceApi();
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
  balance: "",
  errorMessageTransc: "",
};

const transcSlicer = createSlice({
  name: "transc",
  initialState,
  extraReducers: {
    [getBalance.fulfilled]: (state, action) => {
      const balance = action?.payload?.data?.data?.balance;
      state.balance = balance;
    },
    [getBalance.rejected]: (state, action) => {
      state.errorMessageTransc = action.payload;
    },
  },
});

export default transcSlicer.reducer;
