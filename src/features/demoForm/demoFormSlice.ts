import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitDemoFormApi } from "../../api";
import { AppThunk } from "store";

interface DemoFormState {
  formKey: number;
  formData: any;
  serverError: string | null;
  serverSuccessMessage: string | null;
  submitting: boolean;
}

const initialState: DemoFormState = {
  formKey: Date.now(),
  formData: null,
  serverError: null,
  serverSuccessMessage: null,
  submitting: false
};

const demoFormSlice = createSlice({
  name: "demoFormSlice",
  initialState,
  reducers: {
    formDataChange(state, action: PayloadAction<any>) {
      state.formData = action.payload;
    },
    clearForm(state) {
      state.formKey = Date.now();
      state.serverSuccessMessage = null;
      state.serverError = null;
      state.submitting = false;
      state.formData = null;
    },
    submitDemoFormStart(state) {
      state.serverSuccessMessage = null;
      state.serverError = null;
      state.submitting = true;
    },
    submitDemoFormSuccess(state, action: PayloadAction<string | null>) {
      state.serverError = null;
      state.submitting = false;
      state.serverSuccessMessage = action.payload;
    },
    submitDemoFormFailure(state, action: PayloadAction<string | null>) {
      state.serverError = action.payload;
      state.serverSuccessMessage = null;
      state.submitting = false;
    }
  }
});

export const {
  formDataChange,
  clearForm,
  submitDemoFormStart,
  submitDemoFormSuccess,
  submitDemoFormFailure
} = demoFormSlice.actions;

export const submitDemoForm = (formData: any): AppThunk => async dispatch => {
  try {
    dispatch(submitDemoFormStart());
    const successMessage = await submitDemoFormApi(formData);
    dispatch(submitDemoFormSuccess(successMessage));
  } catch (err) {
    dispatch(submitDemoFormFailure(err.toString()));
  }
};

export default demoFormSlice.reducer;
