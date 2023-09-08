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
};
/*
{
    "status": 0,
    "message": "Login Sukses",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbnV0ZWNoLWludGVncmFzaS5jb20iLCJtZW1iZXJDb2RlIjoiTExLUjZKTDEiLCJpYXQiOjE2OTQxNTkwNjUsImV4cCI6MTY5NDIwMjI2NX0.buTVHongBltbxs77hjNH9Ld9YDfXCgNC2kS1VaPWcA8"
    }
}
*/

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("extraReducers login fulfilled", action);
      if (action?.payload?.status === 200) {
        state.errorMessageAuth = "";
        localStorage.setItem("token", action?.payload?.data?.data?.token);
      } else {
        state.errorMessageAuth = "Failed!";
      }
    },
    [login.rejected]: (state, action) => {
      state.successMessageAuth = "";
      state.errorMessageAuth = action.payload;
    },
    [register.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.successMessageAuth = action.payload.data.message;
      } else {
        state.errorMessageAuth = "Failed!";
      }
    },
    [register.rejected]: (state, action) => {
      state.errorMessageAuth = action.payload;
    },
  },
});

export const { logout } = authSlicer.actions;
export default authSlicer.reducer;
