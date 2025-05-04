import React from "react";

const Settings = ({ data, setData, error }) => {
  const { theme = '' } = data || {};
  const handlechange = (e, key) => {
    setData((prev) => {
      return {
        ...prev,
        [key]: e.target.name,
      };
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="dark"
            checked={theme === "dark"}
            onChange={(e) => handlechange(e, "theme")}
          />
          Dark
        </label>
        <label>
          <input
            type="radio"
            name="light"
            checked={theme === "light"}
            onChange={(e) => handlechange(e, "theme")}
          />
          Light
        </label>
        
        <span className="error">{error?.theme}</span>
      </div>
    </div>
  );
};

export default Settings;
