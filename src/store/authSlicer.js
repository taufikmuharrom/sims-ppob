import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (payloads) => {
  console.log("auth/login payloads", payloads);
  // try {
  //   const data = await AuthService.login(payloads)
  //   return { user: data }
  // } catch (error) {
  //   const message =
  //     (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
  //   return thunkAPI.rejectWithValue()
  // }
});

export const register = createAsyncThunk("auth/register", async (payloads) => {
  console.log("auth/register payloads", payloads);
  // try {
  //   const data = await AuthService.login(payloads)
  //   return { user: data }
  // } catch (error) {
  //   const message =
  //     (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
  //   return thunkAPI.rejectWithValue()
  // }
});

const initialState = {
  isLoggedIn: false,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {},
});

export const { logout } = authSlicer.actions;
export default authSlicer.reducer;
