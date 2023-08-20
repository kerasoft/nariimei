// import { PRODUCT_URL } from "../constants";
import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL
            }),
            keepUnusedDataFor: 5,
        }),
        getProduct: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
})

export const { useGetAllProductsQuery, useGetProductQuery } = productsApiSlice