import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({

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
        })
    })
})

export const { useRegistrationMutation, useLoginMutation, useSendotpMutation,useVerifyotpMutation } = authApi