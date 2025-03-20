import "./App.css";
import NavBar from "./components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <NavBar />
      <div>
        <h1>This is count {count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
        &nbsp; &nbsp;
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </>
  );
}

export default App;
