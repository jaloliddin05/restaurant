import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Category from "./pages/category";
import Places from "./pages/places";
import Foods from "./pages/foods";
import Admin from "./pages/admin";
import Orders from "./pages/orders";
import Login from "./pages/login";
import Context from "./Context/Context";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(
    JSON.parse(localStorage.getItem("token")) || false
  );
  const [activeLink, SetActiveLink] = useState();

  const obj = { login, setLogin, SetActiveLink, activeLink };
  return (
    <BrowserRouter>
      <Context.Provider value={obj}>
        <div>
          <main className="d-flex">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/category" element={<Category />} />
              <Route path="/places" element={<Places />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
