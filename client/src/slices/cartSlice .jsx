import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
    totalPrice: 0,
    totalQty: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload

            const existingItem = state.cartItems.find((cartItem) => item._id === cartItem._id)

            if (existingItem) {
                existingItem.qty += (item.qty || 1)
                existingItem.price += item.price
            } else {
                state.cartItems.push({
                    ...item,
                    qty: 1
                })
            }
            state.totalPrice += item.price
            state.totalQty += (item.qty || 1)

            localStorage.setItem('cart', JSON.stringify(state))
        },
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer