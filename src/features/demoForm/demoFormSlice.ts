import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitDemoFormApi } from "../../api";
import { AppThunk } from "store";

interface DemoFormState {
  formKey: number;
  // generally I try to avoid any, but in this case I think it is worth it. the schema defines the type.
  formData: {};
  serverError: string | null;
  serverSuccessMessage: string | null;
  submitting: boolean;
}

const initialState: DemoFormState = {
  formKey: Date.now(),
  formData: {},
  serverError: null,
  serverSuccessMessage: null,
  submitting: false
};

const demoFormSlice = createSlice({
  name: "demoForm",
  initialState,
  reducers: {
    /** call when form data changes */
    formDataChange(state, action: PayloadAction<{}>): void {
      state.formData = action.payload;
      state.serverSuccessMessage = null;
      state.serverError = null;
    },
    /** call to clear form (e.g. from a Clear button) */
    clearForm(state): void {
      state.formKey = Date.now(); // clears the form!
      state.serverSuccessMessage = null;
      state.serverError = null;
      state.submitting = false;
      state.formData = {};
    },
    /** api call starts -- not called directly, see submitDemoForm */
    submitDemoFormStart(state): void {
      state.serverSuccessMessage = null;
      state.serverError = null;
      state.submitting = true;
    },
    /** api call successful, not called directly */
    submitDemoFormSuccess(state, action: PayloadAction<string | null>): void {
      state.serverError = null;
      state.submitting = false;
      state.serverSuccessMessage = action.payload;
    },
    /** api call failed */
    submitDemoFormFailure(state, action: PayloadAction<string | null>): void {
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
 * This function will call the redux actions as needed.
 * We define this outside of the reducer because it doesn't directly modify state.
 * Instead it will asynchronously call reducers as needed.
 * A thunk is a function returned by another function.
 * It is a style of doing async stuff with redux.
 * redux-toolkit inserts redux-thunk middleware by default.
 */
export const submitDemoForm = (formData: {}): AppThunk => async (
  dispatch
): Promise<void> => {
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
