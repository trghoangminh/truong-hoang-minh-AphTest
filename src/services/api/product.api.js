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
      queryFn: async (slug, _q, _e, fetchWithBQ) => {
        // Always serve from consolidated file for consistent fields
        const list = await fetchWithBQ(`products.details.json`);
        if (list.error) return { error: list.error };
        const found = (list.data || []).find((p) => p.slug === slug);
        if (found) return { data: found };
        // fallback to specific file if not found in consolidated
        const specific = await fetchWithBQ(`product.detail.${slug}.json`);
        if (specific.error) return { error: specific.error };
        return { data: specific.data };
      },
      providesTags: (_r, _e, slug) => [{ type: "Products", id: slug }],
    }),
    getRelatedProducts: build.query({
      queryFn: async (id, _q, _e, fetchWithBQ) => {
        const res = await fetchWithBQ(`products.related.${id}.json`);
        if (!res.error) return { data: res.data };
        // fallback: pick first 4 from consolidated list except current id
        const list = await fetchWithBQ(`products.details.json`);
        if (list.error) return { error: list.error };
        const data = (list.data || [])
          .filter((p) => p.id !== id)
          .slice(0, 4)
          .map((p) => ({ id: p.id, name: p.name, sku: p.sku, slug: p.slug, thumb: p.media?.[0] || "/images/website/product-list_1.png" }));
        return { data };
      },
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


