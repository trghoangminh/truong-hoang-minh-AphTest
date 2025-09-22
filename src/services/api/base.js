import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/mock/" }),
  tagTypes: ["Categories", "Products"],
  endpoints: () => ({}),
});

export default api;


