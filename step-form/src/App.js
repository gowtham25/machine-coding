import "./App.css";
import Personal from "./Personal";
import Interest from "./Interest";
import Settings from "./Settings";
import { useState } from "react";

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const formConfig = [
    {
      label: "Personal",
      component: Personal,
      validate: () => {
        const error = {};
        let isValidForm = true;
        if (!formData?.name || formData?.name?.length < 3) {
          error.name = "Enter the valid name";
          isValidForm = false;
        }
        if (!formData?.age || formData.age < 18 || formData.age > 100) {
          error.age = "Enter the valid age";
          isValidForm = false;
        }
        if (!formData?.email) {
          error.email = "Enter the valid Email";
          isValidForm = false;
        }
        setError(error);
        return isValidForm;
      },
    },
    {
      label: "Interest",
      component: Interest,
      validate: () => {
        const error = {};
        let isValidForm = true;
        if (!formData?.interest?.length) {
          error.interest = "Please select atleast 1 field";
          isValidForm = false;
        }
        setError(error);
        return isValidForm;
      },
    },
    {
      label: "Settings",
      component: Settings,
      validate: () => {
        const error = {};
        let isValidForm = true;
        if (!formData?.theme) {
          error.theme = "Please select any 1 option";
          isValidForm = false;
        }
        setError(error);
        return isValidForm;
      },
    },
  ];

  const handleNext = () => {
    if (formConfig?.[activeStep]?.validate()) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleSubmit = () => {
    if (formConfig?.[activeStep]?.validate()) {
      console.log({formData})
      alert('Submitted Successfully');
    }
  };

  const ActiveComponent = formConfig?.[activeStep]?.component;
  return (
    <div className="App">
      <div className="header-container">
        {formConfig.map((val, index) => {
          return (
            <div
              className="heading"
              key={val.label}
              onClick={() => setActiveStep(index)}
            >
              {val.label}
            </div>
          );
        })}
      </div>
      <div className="tab-body">
        <ActiveComponent error={error} data={formData} setData={setFormData} />
      </div>
      <div>
        {activeStep > 0 && <button onClick={handlePrev}>Prev</button>}
        {activeStep < formConfig.length - 1 && (
          <button onClick={handleNext}>next</button>
        )}
        {activeStep === formConfig.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default App;
