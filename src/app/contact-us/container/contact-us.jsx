import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { PhoneIcon } from "lucide-react";
import { WhatsappIcon } from "@/assets";

const ContactUs = () => {
  return (
    <div className="flex flex-col gap-5  lg:py-[3%] lg:px-[6%]">
      <h1 className="text-[24px] lg:text-[40px] font-[600] px-8 py-0 lg:px-0 lg:py-0">
        Contact Us
      </h1>
      <div className=" w-full flex flex-col gap-20 lg:flex-row justify-between">
        <div className="bg-[#ECEBEB] px-8 py-5 w-full lg:w-[65%] flex flex-col gap-5 border border-[#D9D9D9]">
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-[700]" htmlFor="email">
              Email Address
            </label>
            <Input type="email" id="email rounded-[6px] " />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-[700]" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="h-[200px] p-3 rounded-[6px]"
              rows="2"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <Button className="text-[16px] lg:text-[20px] font-[600] h-[75px] lg:h-[55px] rounded-[16px] mt-10">
            Continue
          </Button>
        </div>
        <div className="px-8 py-5 flex flex-col gap-5 w-full lg:w-[35%] border border-[#D9D9D9]">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <PhoneIcon className="w-6 h-6" />
              <p className="text-[20px] font-[700]">Phone Support</p>
            </div>
            <p className="text-[16px] font-[600]">+234-705-428-9365</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <WhatsappIcon />
              <p className="text-[20px] font-[700]">Whatsapp</p>
            </div>
            <p className="text-[12px] font-[600] flex flex-wrap items-center gap-1">
              Click{" "}
              <a
                href="https://wa.me/+2347054289365"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 underline text-blue-500"
              >
                here
              </a>{" "}
              to send us a message on Whatsapp
            </p>
          </div>
          <div>
            <Image
              src={"/images/support.png"}
              width={450}
              height={450}
              alt="support-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactUs };
