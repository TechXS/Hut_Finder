import {createSlice} from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        success: null,
        error: null,
        loading: false,
    },
    reducers: {
        setSuccessNotification: (state, action) => {
            state.error = null;
            console.log("Called")
            console.log(action.payload)
            state.success = action.payload;
            state.loading = false;
        },
        setErrorNotification: (state, action) => {
            state.success = null;
            state.error = action.payload;
            state.loading = false;
        },
        setLoadingNotification: (state, action) => {
            state.loading = action.payload;
        },
        setClearNotification: (state) => {
            state.success = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const {
    setSuccessNotification,
    setErrorNotification,
    setLoadingNotification,
    setClearNotification,
} = notificationSlice.actions;

export const notification = (state) => {
    return {
        success: state.notification.success,
        error: state.notification.error,
        isLoading: state.notification.loading,
    };
};

export default notificationSlice.reducer;
