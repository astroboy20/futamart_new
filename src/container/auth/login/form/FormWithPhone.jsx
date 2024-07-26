import { DontShow, PasswordIcon } from "@/assets";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const FormWithPhone = ({ handleChange, formData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-4 my-4">
      <formcontrol>
        <label className="text-[16px] lg:text-[18px] pb-5">Phone Number</label>
        <Input
          size={"lg"}
          width={"100%"}
          box-shadow={"0px 0px 0px 1px #CDD1DC"}
          placeholder=""
        />
      </formcontrol>
      <formcontrol>
        <label className="text-[16px] lg:text-[18px] pb-5">Password</label>
        <div className="flex gap-2 items-center w-full border  shadow-[0px_0px_0px_1_rgba(205,209,220,1)] rounded px-3 ">
          <Input
            placeholder=""
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            isRequired
            className="border-none px-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          <div>
            <span className="bg-inherit" onClick={togglePasswordVisibility}>
              {!showPassword ? <DontShow /> : <PasswordIcon />}
            </span>
          </div>
        </div>
      </formcontrol>
    </div>
  );
};

export { FormWithPhone };
