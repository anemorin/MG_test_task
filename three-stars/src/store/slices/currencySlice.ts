import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateType } from "../../types/CurrencyTypes";
import { formatCurrency } from "../../utils";

const initialState: IInitialStateType = {
  inputCurrency: {
    currency: "RUB",
  },
  outputCurrency: {
    currency: "USD",
  },
  codes: [],
};

export const currencySlice = createSlice({
  name: "currencySlice",
  initialState,
  reducers: {
    onSetCodes: (state, action: PayloadAction<string[]>) => {
      state.codes = action.payload;
    },
    onChangeInputValue: (state, action: PayloadAction<number>) => {
      state.inputCurrency.value = formatCurrency(action.payload);
    },
    onChangeInputCurrency: (state, action: PayloadAction<string>) => {
      state.inputCurrency.currency = action.payload;
    },
    onChangeOutputValue: (state, action: PayloadAction<number>) => {
      state.outputCurrency.value = formatCurrency(action.payload);
    },
    onChangeOutputCurrency: (state, action: PayloadAction<string>) => {
      state.outputCurrency.currency = action.payload;
    },
    onSwapCurrencies: (state) => {
      const temp = state.inputCurrency;
      state.inputCurrency = state.outputCurrency;
      state.outputCurrency = temp;
    },
  },
});

export const {
  onSetCodes,
  onChangeInputValue,
  onChangeInputCurrency,
  onChangeOutputValue,
  onChangeOutputCurrency,
  onSwapCurrencies,
} = currencySlice.actions;
