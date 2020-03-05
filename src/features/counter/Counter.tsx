import React from "react";
import "./Counter.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "rootReducer";
import {
  incrementCounter,
  decrementCounter,
  resetCounter
} from "features/counter/counterSlice";

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const { theCounter } = useSelector((state: RootState) => state.counter);

  return (
    <div className="Counter">
      <h1>Counter</h1>
      the counter: {theCounter}
      <button onClick={(): {} => dispatch(incrementCounter())}>
        Increment
      </button>
      <button onClick={(): {} => dispatch(decrementCounter())}>
        Decrement
      </button>
      <button onClick={(): {} => dispatch(resetCounter())}>Reset</button>
    </div>
  );
};

export default Counter;
