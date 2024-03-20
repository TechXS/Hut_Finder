import { createSlice } from "@reduxjs/toolkit";

export const landlordSlice = createSlice({
  name: "landlord",
  initialState: {
    loginForm: {
      data: {},
      error: null,
    },
    signupForm: {
      data: {},
      error: null,
    },
    currentLandlord: {},
    propertyData: null,
    landlordData: {},
    getDataError: null,
    getDataSuccess: null,
    forgotPassSuccess: null,
  }, 
  reducers: {
    setCurrentLandlord: (state, action) => {
      state.loginForm.error = null;
      state.loginForm.data = {};
      state.signupForm.error = null;
      state.signupForm.data = {};
      state.forgotPassSuccess = null;
      state.currentLandlord = { ...action.payload, role: "landlord" };
    },
    setLoginForm: (state, action) => {
      state.loginForm.error = null;
      state.forgotPassSuccess = null;
      state.loginForm.data = { ...state.loginForm.data, ...action.payload };
    },
    setSignupForm: (state, action) => {
      state.signupForm.error = null;
      state.forgotPassSuccess = null;
      state.signupForm.data = { ...state.signupForm.data, ...action.payload };
    },
    setSignupError: (state, action) => {
      state.signupForm.error = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginForm.error = action.payload;
    },
    setLandlordData: (state, action) => {
      state.landlordData = action.payload;
      state.getDataError = null;
      state.getDataSuccess = null;
    },
    setGetDataError: (state, action) => {
      state.getDataError = action.payload;
    },
    setGetDataSuccess: (state, action) => {
      state.getDataSuccess = action.payload;
    },
    setLandlordLogout: (state) => {
      state.currentLandlord = {};
      state.landlordData = {};
      state.propertyData = {};
      state.getDataError = null;
      state.getDataSuccess = null;
      state.forgotPassSuccess = null;
      localStorage.removeItem("currentLandlord");
    },
    setPropertyData: (state, action) => {
      state.propertyData = action.payload;
      state.getDataError = null;
      state.getDataSuccess = null;
    },
    setForgotPassSuccess: (state, action) => {
      state.forgotPassSuccess = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoginForm,
  setSignupForm,
  setSignupError,
  setLoginError,
  setCurrentLandlord,
  setLandlordData,
  setGetDataError,
  setGetDataSuccess,
  setLandlordLogout,
  setPropertyData,
  setForgotPassSuccess
} = landlordSlice.actions;

export const loginForm = (state) => {
  return {
    loginData: state.landlord.loginForm.data,
    loginError: state.landlord.loginForm.error,
  };
};

export const signupForm = (state) => {
  return {
    signupData: state.landlord.signupForm.data,
    signupError: state.landlord.signupForm.error,
  };
};
export const selectCurrentLandlord = (state) => state.landlord.currentLandlord;

export const selectPropertyData = (state) => state.landlord.propertyData;

export const selectLandlordData = (state) => {
  return {
    properties: state.landlord.landlordData?.properties,
    appointments: state.landlord.landlordData?.appointments,
    totalVacantUnits:state.landlord.landlordData?.totalVacantUnits,
    totalProperties:state.landlord.landlordData?.totalProperties,
    totalPendingAppointments:state.landlord.landlordData?.totalPendingAppointments,
    getDataError: state.landlord.getDataError,
  };
};

export const selectTotalRentDue = (state) => {
  return {
    amount: state.landlord.landlordData.totalRentDue?.amount,
    percentage: state.landlord.landlordData.totalRentDue?.percentage,
  };
};

export const selectTotalVacantUnits = (state) => {
  return {
    amount: state.landlord.landlordData.totalVacantUnits?.amount,
    percentage: state.landlord.landlordData.totalVacantUnits?.percentage,
  };
};

export const selectTotalRentCollected = (state) => {
  return {
    amount: state.landlord.landlordData.totalRentCollected?.amount,
    percentage: state.landlord.landlordData.totalRentCollected?.percentage,
  };
};

export const selectTotalUsers = (state) => {
  return {
    amount: state.landlord.landlordData.totalUsers?.amount,
    percentage: state.landlord.landlordData.totalUsers?.percentage,
  };
};
export const selectAllComments = (state) =>
  state.landlord.landlordData.allComments;

export const selectGetDataError = (state) => state.landlord.getDataError;

export const selectGetDataSuccess = (state) => state.landlord.getDataSuccess;

export const selectForgotPassSuccess = (state) => state.landlord.forgotPassSuccess;

export default landlordSlice.reducer;
