import { configureStore } from "@reduxjs/toolkit";
import { currencySlice } from "./slices/currencySlice";
import { currencyService } from "../services/currencyService";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currencySlice: currencySlice.reducer,
      currencyService: currencyService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(currencyService.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
