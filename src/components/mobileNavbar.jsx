import { CloseIcon, SmallLogo } from "@/assets";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { motion } from "framer-motion";

const MobileNavbar = ({ handleShow }) => {
  const { data: categories } = useFetchItems({ url: `${BASE_URL}/categories` });
  console.log(categories);
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1.0,
        delay: 0.2,
      }}
      className="lg:hidden fixed top-0 left-0 w-full h-[100dvh]   bg-white z-100 p-[6%] flex flex-col gap-8"
    >
      <div className="flex justify-between">
        <SmallLogo />
        <span onClick={handleShow}>
          <CloseIcon />
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <p>Cart</p>
        <p>User Account</p>
        <p>Favourite</p>
      </div>

      <div className="flex flex-col gap-5">
        {categories?.data?.map((data) => (
          <div>
            <p>{data.name}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <p>Sell on futamart</p>
        <p>Contact Us</p>
        <p>Logout</p>
      </div>
    </motion.div>
  );
};

export { MobileNavbar };
