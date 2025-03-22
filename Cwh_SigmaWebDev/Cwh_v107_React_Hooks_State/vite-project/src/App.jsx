import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="counter">The count is {count}</div>
      <button className="btn" onClick={() => {setCount(count + 1)}}>Click Me</button>
    </>
  );
}

export default App;
