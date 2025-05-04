import { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [inputArr, setInputArr] = useState(new Array(5).fill(""));
  const refArr = useRef([]);
  const pasteFlag = useRef(false);

  const handleInputChange = (value, index) => {
    if (pasteFlag.current) {
      pasteFlag.current = false; // Reset after paste
      return;
    }
    if (isNaN(value)) return;
    const newArr = [...inputArr];
    const updatedVal = value.trim();
    newArr[index] = updatedVal.slice(-1);
    setInputArr(newArr);
    if (index !== inputArr.length - 1) {
      updatedVal && refArr.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index !== inputArr.length - 1) {
      refArr.current?.[index + 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      refArr.current?.[index - 1].focus();
    } else if (!e.target.value && e.key === "Backspace" && index > 0) {
      refArr.current?.[index - 1].focus();
    }
  };

  const handlePaste = (e, startIndex) => {
    pasteFlag.current = true;
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(paste)) return;

    const chars = paste.slice(0, inputArr.length - startIndex).split("");
    const updated = [...inputArr];
    chars.forEach((char, idx) => {
      updated[startIndex + idx] = char;
      refArr.current[startIndex + idx].value = char;
    });
    setInputArr(updated);
    const nextIndex = Math.min(startIndex + chars.length, inputArr.length - 1);
    refArr.current[nextIndex]?.focus();
  };

  return (
    <div className="input-container">
      {inputArr.map((val, index) => {
        return (
          <input
            key={index}
            value={inputArr[index]}
            type="text"
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
          />
        );
      })}
    </div>
  );
}
