import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  theCounter: number;
}

const initialState: CounterState = {
  theCounter: 0
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter(
      state: CounterState,
      action: PayloadAction<number | undefined>
    ): void {
      const incrementAcount = action.payload ?? 1;
      state.theCounter += incrementAcount;
    },
    decrementCounter(
      state: CounterState,
      action: PayloadAction<number | undefined>
    ): void {
      const decrementAcount = action.payload ?? 1;
      state.theCounter -= decrementAcount;
    },
    resetCounter(state: CounterState): void {
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
