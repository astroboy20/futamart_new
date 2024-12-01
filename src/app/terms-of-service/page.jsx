import { Header } from "@/components/headers/header";
import { Term } from "./container/terms-of-service";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
    <Header/>
      <Term />
      <Footer/>
    </>
  );
}
