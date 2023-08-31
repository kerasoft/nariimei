import {
    createSlice
} from "@reduxjs/toolkit";

import { toast } from 'react-toastify'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
    totalPrice: 0,
    totalQty: 0,
}

const upadateCart = (state) => {
    localStorage.setItem('cart', JSON.stringify(state))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload
            let qty = (item.qty || 1)
            const existingItem = state.cartItems.find((cartItem) => item._id === cartItem._id)

            function updateTotal(){
                state.totalPrice += (item.price * qty)
                state.totalQty += qty
            }

            if (existingItem) {
                if((existingItem.qty+qty)<=item.stock){
                    existingItem.qty += qty
                    existingItem.totalPerUnit += (item.price * qty)
                    updateTotal()
                    upadateCart(state)
                }else {
                    toast('Sorry, Not more of this item in stock')
                }
            } else {
                state.cartItems.push({
                    ...item,
                    qty: qty,
                    totalPerUnit: item.price * qty
                })
                updateTotal()
                upadateCart(state)
            }
        },

        deleteFromCart(state, action){
            const {i, decrement, purge} = action.payload
            if(purge){
                state.totalPrice-=state.cartItems[i].totalPerUnit
                state.totalQty-=state.cartItems[i].qty
                state.cartItems.splice(i, 1)

            }
            if(decrement){
                if(state.cartItems[i].qty > 1) {
                    state.cartItems[i].qty--
                    state.cartItems[i].totalPerUnit-=state.cartItems[i].price
                    state.totalPrice-=state.cartItems[i].price
                    state.totalQty--
                }
            }
            
            upadateCart(state)
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer