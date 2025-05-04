import React, { createContext, useState } from "react";
import Toastr from "./Toastr";

const ToastrContext = createContext({});

const ToastProvider = ({ children }) => {
  const [toastrList, setToastrList] = useState(new Map());

  const generateUniqueCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const removeToastr = (position, uniqueId) => {
    setToastrList((prev) => {
      const newMap = new Map(prev);
      const oldData = newMap.get(position);
      if (oldData.length) {
        const updateData = oldData.filter((val) => {
          return val.id !== uniqueId;
        });
        newMap.set(position, updateData);
      }
      return newMap;
    });
  };

  const addToastr = (type, message, position, dismissedTime = 3) => {
    const uniqueId = generateUniqueCode();
    setToastrList((prev) => {
      const newMap = new Map(prev);
      const oldData = newMap.get(position);
      const updatedData = [
        ...(oldData || []),
        {
          id: uniqueId,
          message,
          dismissedTime,
        },
      ];
      newMap.set(position, updatedData);
      return newMap;
    });

    // setTimeout(() => {
    // removeToastr(position, uniqueId);
    // }, dismissedTime * 1000);
  };

  return (
    <ToastrContext.Provider value={{ addToastr: addToastr }}>
      {children}
      {toastrList.get("top-left") && (
        <div className="container top-left">
          {[...toastrList.get("top-left")].map((val) => {
            return (
              <Toastr
                key={val.id}
                message={val.message}
                position="top-left"
                id={val.id}
                onClose={removeToastr}
                dismissedTime={val.dismissedTime}
              />
            );
          })}
        </div>
      )}

      {toastrList.get("top-right") && (
        <div className="container top-right">
          {[...toastrList.get("top-right")].map((val) => {
            return (
              <Toastr
                key={val.id}
                message={val.message}
                position="top-right"
                id={val.id}
                onClose={removeToastr}
                dismissedTime={val.dismissedTime}
              />
            );
          })}
        </div>
      )}
    </ToastrContext.Provider>
  );
};

export { ToastProvider, ToastrContext };
