import { Categories } from "@/components/categories";
import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import ProductsInCategory from "@/container/Home/products/ProductsInCategory";

const Page = ({ params }) => {
  const { slug } = params;
  return (
    <>
      <Header />
      <div className="px-[6%]">
        <Categories />
        <ProductsInCategory slug={slug} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
