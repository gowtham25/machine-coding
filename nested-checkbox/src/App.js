import "./App.css";
import CheckboxComponent from "./CheckboxComponent";
import { useState } from "react";

const checkboxConfig = [
  {
    id: 1,
    name: "Fruits",
    children: [
      {
        id: 2,
        name: "Citrus",
        children: [
          { id: 3, name: "Orange" },
          { id: 4, name: "Lemon" },
        ],
      },
      {
        id: 5,
        name: "Berries",
        children: [
          { id: 6, name: "Strawberries" },
          { id: 7, name: "Blueberries" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Tropical",
    children: [
      { id: 9, name: "Banana" },
      { id: 10, name: "Mango" },
    ],
  },
  { id: 11, name: "Apple" },
];

export default function App() {
  const [checked, setChecked] = useState({});
  return (
    <div className="App">
      <CheckboxComponent
        data={checkboxConfig}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
}
