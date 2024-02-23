import {createSlice} from "@reduxjs/toolkit";
import {getUnitType} from "../utils/dataUtil";

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        loginForm: {
            data: {},
            error: null,
        },
        signupForm: {
            data: {},
            error: null,
        },
        currentClient: {},
        clientData: {},
        getDataError: null,
        getDataSuccess: null,
        paymentData: [],
        forgotPassSuccess: null,
    },
    reducers: {
        setCurrentClient: (state, action) => {
            state.loginForm.error = null;
            state.loginForm.data = {};
            state.signupForm.error = null;
            state.signupForm.data = {};
            state.forgotPassSuccess = null;
            state.currentClient = {...action.payload, role: "Client"};
        },
        setLoginForm: (state, action) => {
            state.loginForm.error = null;
            state.forgotPassSuccess = null;
            state.loginForm.data = {...state.loginForm.data, ...action.payload};
        },
        setSignupForm: (state, action) => {
            state.signupForm.error = null;
            state.forgotPassSuccess = null;
            state.signupForm.data = {...state.signupForm.data, ...action.payload};
        },
        setSignupError: (state, action) => {
            state.signupForm.error = action.payload;
        },
        setLoginError: (state, action) => {
            state.loginForm.error = action.payload;
        },
        setClientData: (state, action) => {
            state.clientData = {
                ...action.payload,
                unit: {
                    ...action.payload.unit,
                    type: getUnitType(action.payload.unit.type),
                },
            };
            state.getDataError = null;
            state.getDataSuccess = null;
        },
        setGetDataError: (state, action) => {
            state.getDataError = action.payload;
        },
        setGetDataSuccess: (state, action) => {
            state.getDataSuccess = action.payload;
        },
        setClientLogout: (state) => {
            state.currentClient = {};
            state.clientData = {};
            state.paymentData = [];
            state.getDataError = null;
            state.getDataSuccess = null;
            state.forgotPassSuccess = null;
            localStorage.removeItem("currentClient");
        },
        setPaymentData: (state, action) => {
            state.paymentData = action.payload;
            state.getDataError = null;
            state.getDataSuccess = null;
        },
        setForgotPassSuccess: (state, action) => {
            state.forgotPassSuccess = action.payload;
        }
    },
});

export const {
    setLoginForm,
    setSignupForm,
    setSignupError,
    setLoginError,
    setCurrentClient,
    setClientLogout,
    setPaymentData,
    setGetDataError,
    setGetDataSuccess,
    setClientData,
    setForgotPassSuccess
} = clientSlice.actions;

export const loginForm = (state) => {
    return {
        loginData: state.client.loginForm.data,
        loginError: state.client.loginForm.error,
    };
};

export const signupForm = (state) => {
    return {
        signupData: state.client.signupForm.data,
        signupError: state.client.signupForm.error,
    };
};

export const selectCurrentClient = (state) => state.client.currentClient;

export const selectPaymentData = (state) => state.client.paymentData;

export const selectClientData = (state) => {
    return {
        client: state.client.clientData,
        property: state.client.clientData.property,
        unit: state.client.clientData.unit,
        comments: state.client.clientData.comments,
        payments: state.client.clientData.payments,
    };
};

export const selectGetDataError = (state) => state.client.getDataError;
export const selectGetDataSuccess = (state) => state.client.getDataSuccess
export const selectForgotPassSuccess = (state) => state.client.forgotPassSuccess;
export default clientSlice.reducer;
