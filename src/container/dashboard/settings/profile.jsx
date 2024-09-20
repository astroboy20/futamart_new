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
    </div>
  );
};

export { Profile };
