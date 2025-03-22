import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const a = useRef(0);
  const btnRef = useRef();

  useEffect(() => {
    a.current = a.current + 1;
    console.log(`Rerendering... value of a is ${a.current}`);
  });

  useEffect(() => {
    btnRef.current.style.backgroundColor = 'red';
    btnRef.current.style.padding = '10px'
  }, [])
  

  return (
    <>
      <p>{count}</p>
      <button
        ref={btnRef}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
    </>
  );
}

export default App;
