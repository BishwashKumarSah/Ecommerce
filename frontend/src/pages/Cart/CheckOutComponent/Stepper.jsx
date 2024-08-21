import React, { useEffect, useRef, useState } from "react";
import "./Stepper.css";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const stepRef = useRef([]);

  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const ActiveComponent = steps[currentStep - 1]?.component;


  const handleNextForm = () => {
    setCurrentStep((prev) => {
      if (prev + 1 > steps.length + 1) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[steps.length - 1].offsetWidth / 2,
    });
  }, [stepRef, steps.length]);

  return (
    <>
      <div className="stepper">
        {steps.map((step, index) => {
          const IconComponent = step.iconName
          return (
          <div
            className={`steps ${
              currentStep > index + 1 || isComplete ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
            ref={(el) => (stepRef.current[index] = el)}
            key={step.name}
          >
            <div className="step_number">
              {currentStep > index + 1 ? (
                <IconComponent style={{ color: "green" }} fill="green" />
              ) : (
                <IconComponent />
              )}
            </div>
            <div
              className="step_name"
              style={{
                color: `${currentStep > index + 1 ? "green" : "black"}`,
              }}
            >
              {step.name}
            </div>
          </div>
        )})}
        <div
          className="progress_bar"
          style={{
            width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
            marginLeft: margin.marginLeft,
          }}
        >
          <div
            className="progress"
            style={{
              width: `calc(${(currentStep - 1) / (steps.length - 1)} * 100%)`,
            }}
          ></div>
        </div>
      </div>
      {ActiveComponent && <ActiveComponent handleNextForm={handleNextForm} />}
    </>
  );
};

export default Stepper;
