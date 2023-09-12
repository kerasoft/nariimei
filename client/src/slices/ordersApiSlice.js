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
            })
        })
    })
})

export const { useCreateOrderMutation, useGetOrderByIdQuery } = ordersApiSlice