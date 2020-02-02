import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitDemoFormApi } from "../../api";
import { AppThunk } from "store";

interface DemoFormState {
  formKey: number;
  // generally I try to avoid any, but in this case I think it is worth it. the schema defines the type.
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
  name: "demoForm",
  initialState,
  reducers: {
    /** call when form data changes */
    formDataChange(state, action: PayloadAction<any>) {
      state.formData = action.payload;
      state.serverSuccessMessage = null;
      state.serverError = null;
    },
    /** call to clear form (e.g. from a Clear button) */
    clearForm(state) {
      state.formKey = Date.now(); // clears the form!
      state.serverSuccessMessage = null;
      state.serverError = null;
      state.submitting = false;
      state.formData = null;
    },
    /** api call starts -- not called directly, see submitDemoForm */
    submitDemoFormStart(state) {
      state.serverSuccessMessage = null;
      state.serverError = null;
      state.submitting = true;
    },
    /** api call successful, not called directly */
    submitDemoFormSuccess(state, action: PayloadAction<string | null>) {
      state.serverError = null;
      state.submitting = false;
      state.serverSuccessMessage = action.payload;
    },
    /** api call failed */
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

/**
 * Call this instead of a redux action directly in order to submit the form.
 * This function will call the redux actions as needed
 */
export const submitDemoForm = (formData: any): AppThunk => async dispatch => {
  // this async await pattern replaces calling .then and .catch on promises
  // it is supposed to be more clear, and lest nested
  try {
    dispatch(submitDemoFormStart());
    const successMessage = await submitDemoFormApi(formData);
    dispatch(submitDemoFormSuccess(successMessage));
  } catch (err) {
    dispatch(submitDemoFormFailure(err.toString()));
  }
};

export default demoFormSlice.reducer;
