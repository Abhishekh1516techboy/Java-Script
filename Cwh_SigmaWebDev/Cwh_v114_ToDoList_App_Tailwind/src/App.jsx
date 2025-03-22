import "./App.css";
import NavBar from "./components/NavBar";
import TodoInput from "./components/TodoInput";

function App() {
  return (
    <div className="min-h-screen bg-gray-300 ">
      <NavBar />
      <TodoInput />
    </div>
  );
}

export default App;