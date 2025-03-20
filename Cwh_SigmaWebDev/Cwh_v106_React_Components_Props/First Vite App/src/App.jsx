import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <h1>Abhishekh Kumar</h1>
      <div className="cards">
        <Card
          title="Samsung"
          desc="This is a Samsung S24 ULTRA Smartphone powered by AI."
        />
        <Card
          title="Apple"
          desc="This is a Apple 16 PRO max Smartphone powered by Apple Intelisense."
        />
        <Card
          title="Sony"
          desc="This is a Sony Mark V  Smartphone 16:21 ratio."
        />
        <Card
          title="Nokia"
          desc="This is a Nokia 14 Smartphone with 5000 Mah battery."
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
