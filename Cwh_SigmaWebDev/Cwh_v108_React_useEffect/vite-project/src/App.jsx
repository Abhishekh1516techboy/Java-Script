// import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   alert("Hey Developer Welcome to my Channel.");
  // }, []);

  // useEffect(() => {
  //   alert("Count change.");
  // }, [count]);

  return (
    <>
      <NavBar />
      <h1>This is useEffect Hooks</h1>
    </>
  );
}

export default App;
