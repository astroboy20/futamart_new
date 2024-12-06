"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";

const PiracyPolicy = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const router = useRouter();

  const onAgree = () => {
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-5  py-[3%] px-[6%]">
     <div className="relative w-full m-auto bg-[url('/images/settings.png')] bg-center bg-cover h-[400px] flex justify-center items-center">
  <div className="absolute inset-0 bg-[#00000099]"></div>
  <h1 className="relative text-[30px] lg:text-[60px] font-[600] text-[white]">
    Privacy Settings
  </h1>
</div>

      <div>
        <div className="text-[16p] lg:text-[20px] font-[400] list-disc flex flex-col gap-5 text-justify">
          <p>
            At futamart, your privacy is our priority. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you use our platform.
            <br />
            <br />
            <strong>Information We Collect</strong>
            <br />
            <strong>Personal Information:</strong> Name, email address, phone
            number, and Identity Document, provided during registration or
            business registration.
            <br />
            <strong>Usage Data:</strong> Browsing history, device information,
            and IP address to enhance your shopping experience.
            <br />
            <br />
            <strong>How We Use Your Information</strong>
            <ul className="list-disc pl-5">
              <li>To process and deliver your orders.</li>
              <li>To personalize your shopping experience.</li>
              <li>To communicate updates, offers, and respond to inquiries.</li>
            </ul>
            <br />
            <strong>Data Protection</strong>
            <br />
            Your data is encrypted and stored securely. We implement
            industry-standard measures to protect your information from
            unauthorized access.
            <br />
            <br />
            <strong>Third-Party Sharing</strong>
            <br />
            We only share your information with trusted partners for order
            fulfillment, payment processing, and marketing. We do not sell your
            data to third parties.
            <br />
            <br />
            <strong>Your Rights</strong>
            <ul className="list-disc pl-5">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt-out of marketing communications.</li>
            </ul>
            <br />
            For any questions or concerns, please contact us at{" "}
            <strong>info@futamart.com</strong>. By using futamart, you agree to
            this Privacy Policy. We may update this policy periodically, and
            changes will be communicated on our platform.
          </p>

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />{" "}
            <p>I agree to this conditions</p>
          </label>
        </div>
      </div>
      <Button
        disabled={!isChecked}
        className="text-[16px] lg:text-[20px] font-[600] h-[55px]"
        onClick={onAgree}
      >
        Agree
      </Button>
    </div>
  );
};

export { PiracyPolicy };
