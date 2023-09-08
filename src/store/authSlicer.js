import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registrationApi } from "../services/api";

export const login = createAsyncThunk(
  "auth/login",
  async (payloads, thunkAPI) => {
    try {
      const data = await loginApi(payloads);
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

export const register = createAsyncThunk(
  "auth/register",
  async (payloads, thunkAPI) => {
    try {
      const data = await registrationApi(payloads);
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
  successMessageAuth: "",
  errorMessageAuth: "",
  statusCode: 500,
  isLoggedIn: false,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      console.log("TES", state.isLoggedIn);
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.statusCode = action?.payload?.status;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.successMessageAuth = "";
      state.errorMessageAuth = action.payload;
      state.statusCode = action?.payload?.status;
    },
    [register.fulfilled]: (state, action) => {
      state.successMessageAuth = action.payload.data.message;
      state.statusCode = action?.payload?.status;
    },
    [register.rejected]: (state, action) => {
      state.errorMessageAuth = action.payload;
      state.statusCode = action?.payload?.status;
    },
  },
});

export const { logout } = authSlicer.actions;
export default authSlicer.reducer;
