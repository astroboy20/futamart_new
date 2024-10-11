import { CloseIcon, SmallFavouriteIcon, SmallLogo, UserIcon } from "@/assets";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { motion, AnimatePresence } from "framer-motion";
import { PiBowlFood } from "react-icons/pi";
import { IoMdPhonePortrait } from "react-icons/io";
import { TbHanger } from "react-icons/tb";
import { PiFanLight } from "react-icons/pi";
import { GiChemicalTank } from "react-icons/gi";
import { TbShoe } from "react-icons/tb";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { FiMessageCircle } from "react-icons/fi";

const MobileNavbar = ({ handleShow }) => {
  const token = Cookies.get("token");
  const { data: categories } = useFetchItems({ url: `${BASE_URL}/categories` });
  const { data: userData } = useFetchItems({
    url: `${BASE_URL}/user`,
  });

  const { logout } = useAuth();
  const role = userData?.data?.role?.name;
  console.log(role);
  const categoryIcons = {
    Food: <PiBowlFood size={"30px"} />,
    "electronic-and-gadgets": <IoMdPhonePortrait size={"30px"} />,
    "fashion-and-clothing": <TbHanger size={"30px"} />,
    "beauty-and-skincare": <PiFanLight size={"30px"} />,
    "hair-products": <GiChemicalTank size={"30px"} />,
    footwears: <TbShoe size={"30px"} />,
  };

  return (
    <>
      <AnimatePresence>
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
          className="lg:hidden fixed overflow-y-scroll no-scrollbar top-0 left-0 w-full h-[100dvh] bg-white z-[9999] p-[6%] flex flex-col gap-8"
        >
          <div className="flex justify-between">
            <SmallLogo />
            <span onClick={handleShow}>
              <CloseIcon />
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <Link href={"/user/chat"} onClick={handleShow}>
              <p className="flex items-center gap-3">
                <FiMessageCircle className="text-[23px]" />
                Chats
              </p>
            </Link>
            <Link href={"/"} onClick={handleShow}>
              <p className="flex items-center gap-3">
                <UserIcon />
                User Account
              </p>
            </Link>
            <Link href={"/favourite"} onClick={handleShow}>
              <p className="flex items-center gap-3">
                <SmallFavouriteIcon />
                Favourite
              </p>
            </Link>
          </div>

          <hr />

          <div className="flex flex-col gap-5">
            <h2 className="text-[18px] font-[600]">Categories</h2>
            {categories?.data?.map((category) => (
              <div key={category.slug} className="flex items-center gap-3">
                {categoryIcons[category.slug] ||
                  categoryIcons[category.name] ||
                  null}
                <Link href={`${category.slug}`} onClick={handleShow}>
                  <p>{category.name}</p>
                </Link>
              </div>
            ))}
          </div>

          <hr />

          <div className="flex flex-col gap-5">
            <h2 className="text-[18px] font-[600]">Others</h2>
            {userData && (
              <Link href={role === "seller" ? "/dashboard" : "/seller"}>
                <p>
                  {role === "seller" ? "Go to Dashboard" : "Become a Seller"}
                </p>
              </Link>
            )}

            <p>Contact Us</p>
            <p>
              {token ? (
                <span onClick={logout}>Log Out</span>
              ) : (
                <Link href={"/login"}>Login</Link>
              )}{" "}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export { MobileNavbar };
