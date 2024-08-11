import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils";
import {
  ICodesResponse,
  ICurrencyConvertRequest,
  ICurrencyConvertResponse,
} from "../types/CurrencyTypes";

export const currencyService = createApi({
  reducerPath: "currencyService",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCodes: builder.query<ICodesResponse, null>({
      query: () => ({
        url: "codes",
        method: "get",
      }),
    }),
    getConvertCurrencies: builder.query<
      ICurrencyConvertResponse,
      ICurrencyConvertRequest
    >({
      query: (params) => ({
        url: `pair/${params.from}/${params.to}/${params.amount}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetCodesQuery, useGetConvertCurrenciesQuery } =
  currencyService;
