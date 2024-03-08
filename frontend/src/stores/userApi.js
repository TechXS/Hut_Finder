import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/api/`,
    prepareHeaders: (headers) => {
      const accessToken = sessionStorage.getItem("token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }), 
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, layout, payload }) => ({
        url: `${layout}/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    uploadProfileImage: builder.mutation({
      query: ({ id, layout, payload }) => {
        return {
          url: `${layout}/image/${id}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getUserDetails: builder.query({
      query: ({ id, layout }) => {
        return { url: `${layout}/${id}` };
      },
    }),
    addComment: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `comment/${id}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    makePayment: builder.mutation({
      query: (id) => {
        return {
          url: `payment/${id}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
    useUpdateProfileMutation,
    useUploadProfileImageMutation,
    useGetUserDetailsQuery,
    useAddCommentMutation,
    useMakePaymentMutation
} = userApi;