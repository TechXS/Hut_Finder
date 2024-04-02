import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {handleReverseGeocode} from "../utils/geocode.js";

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
            query: (location) => {
                return {url: `/properties?location=${location}`};
            },
            transformResponse: async (response) => {
                const properties = await Promise.all(response.map(async (property) => {
                    let location = await handleReverseGeocode(property.location.coordinates[1], property.location.coordinates[0]);
                    return { ...property, location };
                }));
                return properties;
            },
        }),
        // getProperty: builder.query({
        //     query: ({id,property_id}) => {
        //         return {url: `/properties/${property_id}`};
        //     },
        // }),
        getProperty: builder.query({
            query: ({property_id}) => {
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
                method: "POST",
                body: payload,
                
            }),
        }),
        getWishlistProperties: builder.query({
            query: (id) => {
                return { url: `${id}/wishlist` }; // Assuming this endpoint returns the wishlist properties for the given user ID
            },
            transformResponse: async (response) => {
                // Perform any necessary transformation on the wishlist properties response
                return response;
            },
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
    useRemoveFromWishlistMutation,
    useGetWishlistPropertiesQuery
} = clientApi;