import { Footer } from "@/components/footer";
import SellerPage from "@/container/viewSeller/SellerPage"; 
import { Header } from "@/components/headers/header";
export default async function SellerPageDynamic({ params }) {
  return (
    <div>
      <Header />
      <SellerPage params={params} />;
      <Footer/>
    </div>
  );
}
