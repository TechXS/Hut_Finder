import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/`,
    }),
    endpoints: (builder) => ({
        signUpLandlord: builder.mutation({
            query: (payload) => ({
                url: "landlord/signup",
                method: "POST",
                body: payload,
            }),
        }),
        signUpClient: builder.mutation({
            query: (payload) => ({
                url: "client/signup",
                method: "POST",
                body: payload,
            }),
        }),
        signInLandlord: builder.mutation({
            query: (payload) => ({
                url: "landlord/signin",
                method: "POST",
                body: payload,
            }),
            transformResponse: (response) => {
                console.log(response);
                sessionStorage.setItem("token", response.token);
                return {...response.result,role:"landlord"};
            },
        }),
        signInClient: builder.mutation({
            query: (payload) => ({
                url: "client/signin",
                method: "POST",
                body: payload,
            }),
            transformResponse: (response) => {
                console.log(response);
                sessionStorage.setItem("token", response.token);
                return {...response.result,role:"client"};
            },
        }),
        logout: builder.mutation({
            query: (payload) => ({
                url: `logout`,
                method: "DELETE",
                body: payload,
            }),
            transformResponse: (response) => {
                console.log(response);
                sessionStorage.removeItem("token");
                return response;
            },
        }),
        forgotPassword: builder.mutation({
            query: (payload) => ({
                url: "forgotpassword",
                method: "POST",
                body: payload,
            }),
        }),
        resetPassword: builder.mutation({
            query: (payload) => ({
                url: "resetpassword",
                method: "PATCH",
                body: payload,
            }),
        }),
        cancelPasswordReset: builder.mutation({
            query: (id) => ({
                url: `cancelresetpassword?id=${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useSignUpLandlordMutation,
    useSignUpClientMutation,
    useSignInLandlordMutation,
    useSignInClientMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useCancelPasswordResetMutation,
} = authApi;
