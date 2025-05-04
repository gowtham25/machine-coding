import React, { useEffect, useState, useRef } from "react";

const Toastr = ({ message, type, onClose, position, id, dismissedTime }) => {
  const [width, setWidth] = useState(100);
  const [visible, setVisible] = useState(true); // for animation

  const intervalId = useRef(null);
  const timerId = useRef(null);

  useEffect(() => {
    const avg = 100 / ((dismissedTime * 1000) / 100);

    intervalId.current = setInterval(() => {
      setWidth((prev) => Math.max(prev - avg, 0));
    }, 100);

    timerId.current = setTimeout(() => {
      handleClose(); // triggers fade out
    }, dismissedTime * 1000);

    return () => {
      clearInterval(intervalId.current);
      clearTimeout(timerId.current);
    };
  }, [dismissedTime]);

  const handleClose = () => {
    setVisible(false); // triggers fade out
    clearInterval(intervalId.current);
    clearTimeout(timerId.current);

    // Wait for animation to finish before removing from DOM
    setTimeout(() => onClose(position, id), 300); // match with CSS duration
  };

  return (
    <div className={`toast-container ${visible ? "fade-in" : "fade-out"}`}>
      <div className="toastr">
        {message}-{id}
        <div className="remove-tooltip" onClick={handleClose}>
          ×
        </div>
      </div>
      <div
        className="progressbar"
        style={{
          width: `${width}%`,
          transition: "width 0.1s linear",
        }}
      ></div>
    </div>
  );
};

export default Toastr;
