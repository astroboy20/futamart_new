import React from "react";

export const ProgressUpdate = ({ steps, activeStep, sizes }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex items-center justify-center rounded-full border-2 ${
              activeStep >= index
                ? "bg-black text-white"
                : "bg-transparent text-gray-300 border-[#DADADA]"
            } transition-colors duration-500`}
            style={{
              width: sizes[index]?.width || '40px',
              height: sizes[index]?.height || '40px',
            }}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-[8px] ${
                activeStep > index ? "bg-black" : "bg-gray-200"
              } transition-all duration-500`}
              style={{ flexGrow: 1 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
