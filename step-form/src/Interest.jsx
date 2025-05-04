
import React from "react";

const Interest = ({ data, setData, error }) => {
  const { interest = [] } = data || {};
  const handlechange = (e, key) => {
    console.log(e.target)
    setData((prev) => {
      return {
        ...prev,
        [key]: e.target.checked
          ? [...(prev?.[key] || []), e.target.name]
          : prev?.[key].filter((val) => val !== e.target.name),
      };
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interest.includes("coding")}
            onChange={(e) => handlechange(e, "interest")}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interest.includes("music")}
            onChange={(e) => handlechange(e, "interest")}
          />
          Music
        </label>
        <label>
          <input
            type="checkbox"
            name="javascript"
            checked={interest.includes("javascript")}
            onChange={(e) => handlechange(e, "interest")}
          />
          Javascript
        </label>
        <span className="error">{error?.interest}</span>
      </div>
    </div>
  );
};

export default Interest;
