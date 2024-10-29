import { Footer } from "@/components/footer";
import SellerPage from "@/container/viewSeller/SellerPage"; 
import { Header } from "@/components/headers/header";
import Head from "next/head"; // Import the Head component

export default async function SellerPageDynamic({ params }) {
  return (
    <div>
      <Head>
        <title>Seller Profile - futamart</title>
        <meta name="description" content="Connect with thousands of buyers and boost your sales on futamart's seller platform!" /> 
        <meta name="keywords" content="futamart, sell online, marketplace, seller page" /> 
        <link rel="canonical" href={`https://futamart.vercel.app/seller/${params}`} /> 
      </Head>
      <Header />
      <SellerPage params={params} />
      <Footer />
    </div>
  );
}
