import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const landlordApi = createApi({
    reducerPath: "landlordApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/api/landlord/`,
        prepareHeaders: (headers) => {
            const accessToken = sessionStorage.getItem("token");
            if (accessToken) {
                headers.set("authorization", `Bearer ${accessToken}`);
                // headers.set("Content-Type", "application/json");
                // headers.set("Content-Type", "multipart/form-data");

            }
            return headers;
        }, 
    }),
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: (id) => {
                return {url: `${id}/properties`};
            },
        }),
        getProperty: builder.query({
            query: ({id, property_id}) => {
                return {url: `${id}/properties/${property_id}`};
            },
        }),
        getAppointments: builder.query({    
            query: (id) => {
                return {url: `${id}/appointments`};
            },
        }),

        createProperty: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}`,
                method: "POST",
                body: payload,
            }),
        }),
        uploadImage: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}/property/image`,
                method: "POST",
                body: payload,
            }),
        }),
        uploadUnitImage: builder.mutation({
            query: ({payload}) => ({
                url: `unit/image`,
                method: "POST",
                body: payload,
            }),
        }),
        updateProperty: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}/property`,
                method: "PATCH",
                body: payload,
            }),
        }),
        updateUnit: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}/property/unit`,
                method: "PATCH",
                body: payload,
            }),
        }),
        deleteProperty: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}`,
                method: "DELETE",
                body: payload,
            }),
        }),
        deleteImage: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}/property/image`,
                method: "DELETE",
                body: payload,
            }),
        }),
        deleteUnitImage: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}/unit/images`,
                method: "DELETE",
                body: payload,
            }),
        }),
        getAllAmenities: builder.query({
            query: () => {
                return {url: `amenities`};
            },
        }),
    })
});

export const {
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useGetAppointmentsQuery,
    useCreatePropertyMutation,
    useUploadImageMutation,
    useUploadUnitImageMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
    useDeleteImageMutation,
    useDeleteUnitImageMutation,
    useGetAllAmenitiesQuery,
    useUpdateUnitMutation,
} = landlordApi;