import React from "react";

const Personal = ({ data, setData, error}) => {
  const { name = '', age = '', email = '' } = data || {};
  const handlechange = (e, key) => {
    console.log(e.target.value)
    setData((prev) => {
        return {
            ...prev,
            [key]: e.target.value
        }
    })
  }
  return (
    <div>
      <div>
        <label>Name: </label>
        <input type="text" defaultValue={name} onKeyUp={(e) => handlechange(e, 'name')}/>
        <span className="error">{error?.name}</span>
      </div>
      <div>
        <label>Age: </label>
        <input type="number" defaultValue={age} onKeyUp={(e) => handlechange(e, 'age')}/>
        <span className="error">{error?.age}</span>
      </div>
      <div>
        <label>Email: </label>
        <input type="text" defaultValue={email} onKeyUp={(e) => handlechange(e, 'email')}/>
        <span className="error">{error?.email}</span>
      </div>
    </div>
  );
};

export default Personal;
