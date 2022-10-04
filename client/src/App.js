import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Foods from "./pages/foods";
import Places from "./pages/places";
import Korzinka from "./pages/korzinka";
import Context from "./Context/Context";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("food_order")) || []
  );
  const obj = { order, setOrder };

  return (
    <Context.Provider value={obj}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods/:id" element={<Foods />} />
          <Route path="/places/:id" element={<Places />} />
          <Route path="/korzinka" element={<Korzinka />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
