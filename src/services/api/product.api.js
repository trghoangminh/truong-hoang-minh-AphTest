import { api } from "./base";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProductsByCategory: build.query({
      query: ({ ids, page = 1 }) => {
        const key = Array.isArray(ids) && ids.length ? ids.slice().sort().join("-") : "1";
        const params = new URLSearchParams();
        params.set("page", String(page));
        return `products.byCategory.${key}.json?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    getProductByUrl: build.query({
      query: (slug) => `product.detail.${slug}.json`,
      providesTags: (_r, _e, slug) => [{ type: "Products", id: slug }],
    }),
    getRelatedProducts: build.query({
      query: (id) => `products.related.${id}.json`,
      providesTags: ["Products"],
    }),
    searchProducts: build.query({
      query: (q) => `products.search.json?q=${encodeURIComponent(q)}`,
      providesTags: ["Products"],
    }),
    filterSearchProducts: build.mutation({
      query: (body) => ({
        url: `products.filter.json`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetProductByUrlQuery,
  useGetRelatedProductsQuery,
  useSearchProductsQuery,
  useFilterSearchProductsMutation,
} = productApi;


