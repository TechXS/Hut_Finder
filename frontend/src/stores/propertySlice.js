import {createSlice} from "@reduxjs/toolkit";

export const propertySlice = createSlice({
    name: "property",
    initialState: {
        propertyForm: {
            data: {
                unitTypes: [],
            },
            error: null,
        },
        unitForm: {
            type: "",
            vacancies: "",
            price: "",
        },
        currentProperty: {}
    },
    reducers: {
        setCurrentProperty: (state, action) => {
            state.currentProperty = action.payload;
        },
        setPropertyForm: (state, action) => {
            // state.propertyForm.data.unitTypes = [];
            state.propertyForm.data = {
                ...state.propertyForm.data,
                ...action.payload,
            };
        },
        setUnitForm: (state, action) => {
            // state.propertyForm.data.unitTypes = [];
            state.unitForm = {
                ...state.unitForm,
                ...action.payload,
            };
        },
        setPropertyFormUnits: (state) => {
            state.propertyForm.data.unitTypes = [
                ...state.propertyForm.data.unitTypes,
                state.unitForm,
            ]
            state.unitForm = {
                type: "",
                vacancies: "",
                price: "",
            }
        },
        setPropertyError: (state, action) => {
            state.propertyForm.error = action.payload;
        },
        setClearPropertyData: (state) => {
            state.propertyForm = {
                data: {
                    unitTypes: [],
                },
            };
        },
    },
});

export const {
    setCurrentProperty,
    setPropertyError,
    setPropertyForm,
    setPropertyFormUnits,
    setClearPropertyData,
    setUnitForm
} = propertySlice.actions;

export const propertyForm = (state) => {
    return {
        propertyData: state.property.propertyForm.data,
        propertyError: state.property.propertyForm.error,
        unitData: state.property.propertyForm.data.unitTypes,
        unit: state.property.unitForm
    }; 
};

export const selectCurrentProperty = (state) => state.property.currentProperty;

export default propertySlice.reducer;
