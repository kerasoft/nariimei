import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        loginUser: builder.mutation({
            query:  (data) => ({
              url: `${USERS_URL}/login`,
              method: 'POST',
              body: data
            }),
        }),
        getUserProfile: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/profile`
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        })
        
    })
})

export const { 
    useLoginUserMutation, 
    useLogoutUserMutation, 
    useGetUserProfileMutation,
    useRegisterUserMutation,
} = usersApiSlice