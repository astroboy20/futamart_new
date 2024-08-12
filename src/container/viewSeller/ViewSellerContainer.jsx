"use client";
import { ProgressUpdate } from "@/components/progressUpdate";
import { useEffect, useState } from "react";
import { Introduction } from "./introduction";
import { SellerRefForm } from "./sellerRefForm";
import { Camera } from "./camera";
import { FileUpload } from "./fileUpload";
import { Button } from "@/components/ui/button";
import { BackIcon } from "@/assets";
import { progressBarSizes } from "@/providers/data";

const ViewSellerContainer = () => {
  const steps = ["Introduction", "Seller Reference", "Camera", "File Upload"];
  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState(null);

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return <Introduction nextStep={nextStep} />;
      case 1:
        return <SellerRefForm nextStep={nextStep} />;
      case 2:
        return <Camera nextStep={nextStep} />;
      case 3:
        return <FileUpload nextStep={nextStep} />;
      default:
        return (
          <div className="h-full">
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <img
                className="w-[134px] h-[134px] lg:w-[177px] lg:h-[177px]"
                src="https://s3-alpha-sig.figma.com/img/0922/0689/b274ee972d831e5904384601d399411c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CgSxjUqOU40qxIcSmuHqTeKw9oonsdIvZc5lTBwFDfBKmuSmM2u6KbpgfiySvppSjK6ShL7~cAch5XPmZ-i5YXEiiclRGBOcUF-tlw71wyzYn2TyS54KM1MJYX0jPCnuVsFSjVjgw2Wc20DjNfoM7hJ3TlZeTmKPJN16E30YiKTS4ptfCbL715mzChtal9mB-yEdjSl2UEzo3-1JV-8nkSE-xCED8oEr4kmc7l62D7at49dompgefIE7iw8KVTKrPYCN3GfyewGGamO3n2-R3L~ZCEtqbsrpib4e-Ibgl7NYMLyD74dGHx0~gNBoaI~yIomrgJozs3yw~bfpRRygqw__"
                alt="Registration successful"
              />
              <p className="text-[20px] leading-[24.38px] lg:text-[32px] font-semibold lg:leading-[39.01]">
                Registration successful
              </p>
            </div>
            <Button className="text-[15px] leading-[18.29px] w-full bg-[#000000] text-[#FFFFFF] p-3 rounded-md lg:text-[24px] lg:leading-[29.26px]">
              Continue
            </Button>
          </div>
        );
    }
  };

  useEffect(() => {
    setContent(renderContent());
  }, [activeStep]);

  return (
    <>
      <div className="flex flex-col gap-8 p-[6%]">
        {activeStep > 0 && (
          <span onClick={prevStep}>
            <BackIcon />
          </span>
        )}
        <div className="lg:px-[6%] flex flex-col gap-6">
          <ProgressUpdate
            steps={steps}
            activeStep={activeStep}
            sizes={progressBarSizes}
          />
          {content}
        </div>
      </div>
    </>
  );
};

export { ViewSellerContainer };
