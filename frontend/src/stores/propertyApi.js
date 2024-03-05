import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const propertyApi = createApi({
    reducerPath: "propertyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/api/property/`,
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
                return {url: `client`};
            },
        }),
        getProperty: builder.query({
            query: (id) => {
                return {url: `${id}`};
            },
        }),
        getUnitsOfProperty: builder.query({
            query: (id) => {
                return {url: `client/${id}`};
            },
            transformResponse: (response) => {
                return response.units;
            },
        }),
        createProperty: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}`,
                method: "POST",
                body: payload,
            }),
        }),
        updateProperty: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}`,
                method: "PATCH",
                body: payload,
            }),
        }), deleteProperty: builder.mutation({
            query: ({id, payload}) => ({
                url: `${id}`,
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetPropertiesQuery,
    useGetUnitsOfPropertyQuery,
    useCreatePropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
    useGetPropertyQuery
} = propertyApi;