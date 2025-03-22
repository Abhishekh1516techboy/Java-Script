import { useState } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import './App.css'

function App() {
  const [value, setValue] = useState(0); 
  
  return (
    <div className="App">
      <Navbar/>
      <h1 className="My-App">This is My First React App</h1>
      <div className="value">{value}</div>
      <button className="btn" onClick={()=>{setValue(value + 1)}}>Click Me</button>
      <Footer/>
    </div>
  );
}

export default App;
