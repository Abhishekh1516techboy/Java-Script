import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ email: "", phone: "" });

  const handleClick = () => {
    alert("i am clicked");
  };

  const handleMouseOver = () => {
    alert(" ia m mouseOver");
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Click me</button>
      </div>

      <div className="red" onMouseOver={handleMouseOver}>
        i am a red div
      </div>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        value={form.email}
        onChange={handleForm}
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleForm}
      />
    </>
  );
}

export default App;
