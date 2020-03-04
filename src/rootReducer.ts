import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "features/counter/counterSlice";
import demoFormReducer from "features/demoForm/demoFormSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  demoForm: demoFormReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
