import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constants'

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/user`
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const { useCreateOrderMutation, useGetOrderByIdQuery, useGetMyOrdersQuery } = ordersApiSlice