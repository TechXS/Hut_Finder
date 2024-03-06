import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/api/client/`,
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
        getProperties: builder.query({
            query: () => {
                return {url: `/properties`};
            },
        }),
        getProperty: builder.query({
            query: ({id,property_id}) => {
                return {url: `/properties/${property_id}`};
            },
        }),
        getAppointments: builder.query({
            query: (id) => {
                return {url: `${id}/appointments`};
            },
        }),

        createAppointment: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}/appointments`,
                method: "POST",
                body: payload,
            }),
        }),
        addToWishList: builder.mutation({
            query: ({id,property_id, payload}) => ({
                url: `${id}/wishlist/${property_id}`,
                method: "PATCH",
                body: payload,
            }),
        }),
        removeFromWishlist: builder.mutation({
            query: ({id,property_id, payload}) => ({
                url: `${id}/wishlist/${property_id}`,
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
    useAddToWishListMutation,
    useRemoveFromWishlistMutation
} = clientApi;