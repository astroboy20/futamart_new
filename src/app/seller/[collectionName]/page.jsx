import { Footer } from "@/components/footer";
import SellerPage from "@/container/viewSeller/SellerPage"; 
import { Header } from "@/components/headers/header";
import Head from "next/head"; 

export default async function SellerPageDynamic({ params }) {
  return (
    <div>
      <Head>
        <title>Seller Profile - {params.slug} | futamart</title>
        <meta name="description" content={`Explore the products of ${sellerSlug} on FUTAMart!`} />
        <link rel="canonical" href={`https://futamart.vercel.app/seller/${params.slug}`} /> 
      </Head>
      <Header />
      <SellerPage params={params} />
      <Footer />
    </div>
  );
}
