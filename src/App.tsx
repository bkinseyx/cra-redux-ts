import React from "react";
import "./App.css";
import Counter from "features/counter/Counter";
import DemoForm from "features/demoForm/DemoForm";
import "bootstrap/dist/css/bootstrap.min.css";

import "App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="card">
        <Counter></Counter>
      </div>
      <div className="card">
        <DemoForm></DemoForm>
      </div>
    </div>
  );
};

export default App;
