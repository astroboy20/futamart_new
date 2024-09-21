import React from "react";
import { useAuth } from "@/context/AuthContext";
import { FaRegShareSquare } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@chakra-ui/react";
import { BASE_URL, useFetchItems } from "./useFetchItems";
const ShareLinkButton = () => {
  const toast = useToast();
  const { data: business } = useFetchItems({ url: `${BASE_URL}/business` });
  const slug = business?.data?.slug;
  const businessUrl = `https://futamart.vercel.app/seller/${slug}`;

  const handleCopy = () => {
    if (businessUrl) {
      navigator.clipboard.writeText(businessUrl).then(() => {
        toast({
          title: "Copied!",
          description: "Link copied to clipboard.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span onClick={handleCopy} className="cursor-pointer">
              <FaRegShareSquare size={24} />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {/* <p>{user?.data?.email}</p> */}
            https://futamart.vercel.app/seller/google
            https://futamart.vercel.app/seller/google
            <p>{businessUrl}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { ShareLinkButton };
