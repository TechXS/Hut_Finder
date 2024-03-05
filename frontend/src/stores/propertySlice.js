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
            number: "",
            type: "",
            price: "",
        }
    },
    reducers: {
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
                number: "",
                type: "",
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

export default propertySlice.reducer;
