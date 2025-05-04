import React, { useContext } from "react";
import { ToastProvider, ToastrContext } from "./ToastContext"; // ✅ Import the context
import Home from "./Home";
import "./index.css";

const App = () => {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
};

export default App;
