import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    }, 
    
    reducers: {
        setCredentials(state, action){
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        }
    }
})


export const {setCredentials} = authSlice.actions

export default authSlice.reducer