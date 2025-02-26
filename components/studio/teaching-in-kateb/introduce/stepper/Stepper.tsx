import React, { useState, useEffect, useRef } from "react";
import Step from "./Step";
import StepIndicators from "./StepIndicators";
import StepperNavigation from "./StepperNavigation";

interface StepProps {
  image?: string;
  video?: string;
  title: string;
  body: string;
  subtitle?: string;
}

interface StepperProps {
  steps: StepProps[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const stepContentRef = useRef<HTMLDivElement>(null); // Ref for step content

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      setFade(true);
    }, 300); // 300ms for smooth fade transition
  };

  const handleBack = () => {
    setFade(false);
    setTimeout(() => {
      setStepIndex((prev) => Math.max(prev - 1, 0));
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    if (stepContentRef.current) {
      // Automatically adjust the height based on content
      stepContentRef.current.style.height = `${stepContentRef.current.scrollHeight}px`;
    }
  }, [stepIndex]);

  return (
    <div className='p-4'>
      {/* Wrapper for the fade transition and dynamic height adjustment */}
      <div
        ref={stepContentRef} // Reference for dynamic height adjustment
        className={`min-h-64 transition-all duration-500 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Step {...steps[stepIndex]} />
      </div>

      {/* Step Indicators */}
      <StepIndicators
        stepCount={steps.length}
        currentStep={stepIndex}
        onStepClick={(index) => {
          setFade(false);
          setTimeout(() => {
            setStepIndex(index);
            setFade(true);
          }, 300);
        }}
      />

      {/* Navigation Buttons */}
      <StepperNavigation
        hasNext={stepIndex < steps.length - 1}
        hasPrevious={stepIndex > 0}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default Stepper;
