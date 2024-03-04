import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const landlordApi = createApi({
    reducerPath: "landlordApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}/landlord/`,
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
        getlProperties: builder.query({
            query: () => {
                return {url: `/properties`};
            },
        }),
    }),
});

export const {
    useGetlPropertiesQuery,
} = landlordApi;