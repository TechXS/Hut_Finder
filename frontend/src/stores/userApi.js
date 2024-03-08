import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {handleReverseGeocode} from "../utils/geocode.js";

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
      transformResponse: async (response) => {
        if (response.properties){
          const properties = await Promise.all(response.properties.map(async (property) => {
            let location = await handleReverseGeocode(property.location.coordinates[1], property.location.coordinates[0]);
            return { ...property, location };
          }));
          return {...response,properties};
        } else {
          return response
        }
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