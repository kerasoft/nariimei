import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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

export const { useLoginUserMutation, useLogoutUserMutation, useGetUserProfileMutation } = usersApiSlice