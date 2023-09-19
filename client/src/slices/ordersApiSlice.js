import {
    apiSlice
} from './apiSlice'
import {
    ORDERS_URL
} from '../constants'

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {
                    ...order
                }
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
        }),
        getPaymentDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
            }),
            keepUnusedDataFor: 5,
        }),
        updatePayStatus: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}/${order.orderId}/pay`,
                method: 'PUT',
                body: order
            })
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetMyOrdersQuery,
    useGetPaymentDetailsQuery,
    useUpdatePayStatusMutation,
} = ordersApiSlice