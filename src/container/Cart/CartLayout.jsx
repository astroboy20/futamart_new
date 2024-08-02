import { Header } from "@/components/headers/header";
import { Footer } from "@/components/footer";
import CartContainer from "./CartContainer.jsx";

const CartLayout = () => {
  return (
    <>
      <Header />
      <CartContainer />
      <Footer />
    </>
  );
};
export default CartLayout;
