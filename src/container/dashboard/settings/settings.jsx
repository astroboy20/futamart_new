"use client";
import React, { useState } from "react";
import { PrivacyPolicies } from "./privacy";
import { TermsofService } from "./termsofService";
import { Notifications } from "./notifications";
import { PasswordSettings } from "./passwordSettings";
import { Profile } from "./profile";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Settings = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [selected, setSelected] = useState("profile");

  const handleSelected = (value) => {
    setSelected(value);
  };

  const sideData = [
    { id: 1, name: "Profile", value: "profile" },
    { id: 2, name: "Password settings", value: "password" },
    { id: 3, name: "Manage notifications", value: "manage" },
    { id: 4, name: "Terms of service", value: "terms" },
    { id: 5, name: "Privacy policies", value: "privacy" },
  ];

  return (
    <main className="flex flex-col gap-10 py-5 lg:p-5">
      <div className="flex justify-between">
        <h1 className="text-[24px] font-[600] underline">Settings</h1>
      </div>

      <div className="flex justify-between">
        {isDesktop && (
          <aside className="flex flex-col gap-6">
            {sideData.map((data) => (
              <p
                key={data.id}
                onClick={() => handleSelected(data.value)}
                className={`cursor-pointer  ${
                  selected === data.value
                    ? "border border-black p-2 rounded bg-gray-200"
                    : ""
                }`}
              >
                {data.name}
              </p>
            ))}
          </aside>
        )}
        <aside
          className={`rounded-[4px] bg-white drop-shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] h-fit ${
            !isDesktop ? " w-[100%]" : " w-[70%]"
          } p-5 `}
        >
          {selected === "profile" && (
            <div>
              <Profile setSelected={setSelected} />
            </div>
          )}
          {selected === "password" && (
            <div>
              <PasswordSettings />
            </div>
          )}
          {selected === "manage" && (
            <div>
              <Notifications />
            </div>
          )}
          {selected === "terms" && (
            <div>
              <TermsofService />
            </div>
          )}
          {selected === "privacy" && (
            <div>
              <PrivacyPolicies />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export { Settings };
