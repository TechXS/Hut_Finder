import {configureStore} from "@reduxjs/toolkit";
import landlordReducer from "./landlordSlice";
import clientReducer from "./clientSlice";
import propertyReducer from "./propertySlice";
import notificationReducer from "./notificationSlice.js";
import {authApi} from "./authApi.js";
import {propertyApi} from "./propertyApi.js";
import { landlordApi } from "./landlordApi.js";
import {userApi} from "./userApi.js";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        landlord: landlordReducer,
        client: clientReducer,
        property: propertyReducer,
        notification: notificationReducer,
        [authApi.reducerPath]: authApi.reducer,
        [propertyApi.reducerPath]: propertyApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [landlordApi.reducerPath]: landlordApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(propertyApi.middleware)
            .concat(userApi.middleware)
            .concat(landlordApi.middleware),
});
setupListeners(store.dispatch);