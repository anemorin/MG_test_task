import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const apiPath = "https://v6.exchangerate-api.com/v6/229c5f54ec95fdec7a904d0c/";
const headers = {
  accept: "text/plain",
  "Content-Type": "application/json",
};

const baseQuery = fetchBaseQuery({
  baseUrl: apiPath,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const formatCurrency = (currency: number) => {
  return Number(currency.toFixed(2));
};

export { apiPath, headers, baseQuery, formatCurrency };
