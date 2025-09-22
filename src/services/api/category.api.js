import { api } from "./base";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `categories.json`,
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;


