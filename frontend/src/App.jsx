import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Categories from "./pages/categories.jsx";
import Products from "./pages/products.jsx";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Categories />
      <hr />
      <Products />
    </div>
  );
}

export default App;
