import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const Profile = ({ setSelected }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          className="flex lg:hidden"
          onClick={() => setSelected("profile")}
        >
          <IoIosArrowBack />
        </button>
        Profile
      </div>
      <div className="relative w-full">
        <div className="w-auto h-[180px] rounded bg-[#F2F3F4] "> </div>
        <div className="w-[140px] h-[140px] rounded-full bg-[#fff] absolute bottom-[-30%] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
         <div></div> upload!
        </div>
      </div>
    </div>
  );
};

export { Profile };
