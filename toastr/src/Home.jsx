import React, { useContext } from "react";
import { ToastProvider, ToastrContext } from "./ToastContext"; // ✅ Import the context

const Home = () => {
  const { addToastr } = useContext(ToastrContext);
  return (
    <div className="button-container">
      <button onClick={() => addToastr("success", "It is success", "top-left")}>
        Success
      </button>
      <button
        onClick={() => addToastr("success", "It is Failure", "top-right")}
      >
        Failure
      </button>
    </div>
  );
};

export default Home;
