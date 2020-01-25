import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./rootReducer";
import {
  incrementCounter,
  decrementCounter,
  resetCounter
} from "features/counter/counterSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { theCounter } = useSelector((state: RootState) => state.counter);

  return (
    <div className="App">
      the counter: {theCounter}
      <button onClick={() => dispatch(incrementCounter())}>Increment</button>
      <button onClick={() => dispatch(decrementCounter())}>Decrement</button>
      <button onClick={() => dispatch(resetCounter())}>Reset</button>
    </div>
  );
};

export default App;
