import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import Favourite from "@/container/Favourite/Favourite";

const Page = () => {
  return (
    <main>
      <Header />
      <div className="px-[6%]">
        <Favourite />
      </div>
      <Footer />
    </main>
  );
};
export default Page;
