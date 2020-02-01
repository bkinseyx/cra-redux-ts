import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DemoFormState {
  formData: any;
  serverError: string | null;
  submitting: boolean;
}

const initialState: DemoFormState = {
  formData: null,
  serverError: null,
  submitting: false
};

const demoFormSlice = createSlice({
  name: "demoFormSlice",
  initialState,
  reducers: {
    formDataChange(state, action: PayloadAction<any>) {
      state.formData = action.payload;
    },
    submitDemoForm(state, action: PayloadAction<any>) {
      state.formData = action.payload;
    },
    clearServerError(state) {
      state.serverError = null;
      state.submitting = false;
    }
  }
});

export const {
  formDataChange,
  submitDemoForm,
  clearServerError
} = demoFormSlice.actions;

export default demoFormSlice.reducer;
