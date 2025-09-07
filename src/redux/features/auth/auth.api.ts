import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
        }),
        registration: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        sendotp: builder.mutation({
            query: (email) => ({
                url: "/otp/send",
                method: "POST",
                data: email
            })
        }),
        verifyotp: builder.mutation({
            query: (userinfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userinfo
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"

            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"

            })
        }),

    })
})

export const { useRegistrationMutation, useLoginMutation, useSendotpMutation, useVerifyotpMutation, useUserInfoQuery,useLogoutMutation} = authApi