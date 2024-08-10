"use client";
import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const ProgressUpdate = ({ steps, activeStep }) => {
  return (
    <div className="p-[5%]">
      <Stepper colorScheme="black" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator
              sx={{
                bg: index === activeStep ? "black" : "white",
                color: index === activeStep ? "white" : "black",
              }}
            >
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={
                  <StepNumber
                    sx={{
                      bg: "black",
                      color: "white",
                      borderRadius: "100%",
                    }}
                  />
                }
              />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export { ProgressUpdate };
