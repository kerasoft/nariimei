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
        
    })
})

export const { useLoginUserMutation } = usersApiSlice