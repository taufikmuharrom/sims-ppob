import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlicer";
import transcSlicer from "./transcSlicer";
import infoSlicer from "./infoSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transc: transcSlicer,
    info: infoSlicer,
  },
});
