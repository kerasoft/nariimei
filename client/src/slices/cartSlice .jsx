import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
    totalPrice: 0,
    totalQty: 0
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

            if (existingItem) {
                existingItem.qty += qty
                existingItem.price += (item.price * qty)
            } else {
                state.cartItems.push({
                    ...item,
                    qty: qty,
                    price: item.price * qty
                })
            }
            state.totalPrice += (item.price * qty)
            state.totalQty += qty
            console.log(state)
            upadateCart(state)
        },

        deleteFromCart(state, action){
            const {i, decrement, purge} = action.payload
            if(purge){
                state.totalPrice-=state.cartItems[i].price
                state.totalQty-=state.cartItems[i].qty
                state.cartItems.splice(i, 1)

            }
            if(decrement){
                if(state.cartItems[i].qty > 1) {

                    let price = state.cartItems[i].price/state.cartItems[i].qty
                    state.cartItems[i].qty--
                    state.cartItems[i].price-=price
                    state.totalPrice-=price
                    state.totalQty--
                }
            }
            
            upadateCart(state)
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer