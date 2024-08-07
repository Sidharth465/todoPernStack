import { Fragment } from "react";
import "./App.css";
import InputTodo from "./component/InputTodo";
import ListTodo from "./component/ListTodo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
      </div>
      <div className="container p-5">
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
