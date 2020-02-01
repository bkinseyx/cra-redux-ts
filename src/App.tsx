import React from "react";
import "./App.css";
import Counter from "features/counter/Counter";
import DemoForm from "features/demoForm/DemoForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <Counter></Counter>
      <hr />
      <DemoForm></DemoForm>
    </div>
  );
};

export default App;
