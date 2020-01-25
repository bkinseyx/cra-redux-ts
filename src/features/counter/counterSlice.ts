import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  theCounter: number;
}

const initialState: CounterState = {
  theCounter: 0
};

const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    incrementCounter(state, action: PayloadAction<number | undefined>) {
      const incrementAcount = action.payload ?? 1;
      state.theCounter += incrementAcount;
    },
    decrementCounter(state, action: PayloadAction<number | undefined>) {
      const decrementAcount = action.payload ?? 1;
      state.theCounter -= decrementAcount;
    },
    resetCounter(state) {
      state.theCounter = 0;
    }
  }
});

export const {
  incrementCounter,
  decrementCounter,
  resetCounter
} = counterSlice.actions;

export default counterSlice.reducer;
