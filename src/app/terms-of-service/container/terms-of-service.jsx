"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";

const Term = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const router = useRouter();
  const onAgree = () => {
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-5 py-[3%] px-[6%]">
      <div className="w-full m-auto bg-[url('/images/overlay.png')] h-[400px] flex justify-center items-center">
        <h1 className="text-[30px] lg:text-[60px] font-[600] text-[white]">
          Terms of Service
        </h1>
      </div>
      <div>
        <p>
          <strong>Terms of Service</strong>
          <br />
          <br />
          Welcome to futamart! By using our platform, you agree to the following
          terms and conditions. Please read them carefully.
          <br />
          <br />
          <strong>1. Account Registration</strong>
          <ul className="list-disc pl-5">
            <li>
              You must provide accurate and complete information during
              registration.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              futamart reserves the right to suspend or terminate accounts for
              violations of these terms.
            </li>
          </ul>
          <br />
          <strong>2. Use of Services</strong>
          <ul className="list-disc pl-5">
            <li>
              Our platform is intended for lawful purposes only. You agree not
              to misuse it in any way.
            </li>
            <li>
              futamart is not liable for content posted by users, including
              product listings or reviews.
            </li>
            <li>
              We reserve the right to modify, suspend, or discontinue any part
              of our services without notice.
            </li>
          </ul>
          <br />
          <strong>3. Transactions</strong>
          <ul className="list-disc pl-5">
            <li>
              All purchases are subject to availability and confirmation of
              payment.
            </li>
            <li>
              Prices are displayed in the local currency and may be subject to
              change.
            </li>
            <li>
              futamart does not guarantee the accuracy or quality of products
              sold by third-party sellers.
            </li>
          </ul>
          <br />
          <strong>4. Intellectual Property</strong>
          <ul className="list-disc pl-5">
            <li>
              All content on the platform, including text, images, and logos, is
              the property of futamart or its licensors.
            </li>
            <li>
              You may not use, reproduce, or distribute any content without
              prior written consent.
            </li>
          </ul>
          <br />
          <strong>5. Limitation of Liability</strong>
          <ul className="list-disc pl-5">
            <li>
              futamart is not liable for any direct, indirect, incidental, or
              consequential damages arising from your use of the platform.
            </li>
            <li>
              We are not responsible for delays or failures in service caused by
              external factors, including technical issues or natural events.
            </li>
          </ul>
          <br />
          <strong>6. Governing Law</strong>
          <br />
          These terms are governed by the laws of Nigeria. Any disputes will be
          resolved in the jurisdiction of Nigerian courts.
          <br />
          <br />
          <strong>7. Changes to Terms</strong>
          <br />
          futamart reserves the right to update these terms at any time.
          Continued use of the platform signifies your acceptance of the updated
          terms.
          <br />
          <br />
          For any questions or concerns regarding these Terms of Service, please
          contact us at <strong>info@futamart.com</strong>.
        </p>
        <label className="flex gap-2 items-center mt-4">
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={isChecked}
            onChange={handleCheckChange}
          />
          <p>I agree to these terms and conditions</p>
        </label>
      </div>
      <Button
        disabled={!isChecked}
        className="text-[16px] lg:text-[20px] font-[600] h-[55px] mt-4"
        onClick={onAgree}
      >
        Agree
      </Button>
    </div>
  );
};

export { Term };
