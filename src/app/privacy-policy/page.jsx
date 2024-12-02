import { Header } from "@/components/headers/header";
import { Footer } from "@/components/footer";
import { PiracyPolicy } from "./container/piracy-policy";

export default function Page() {
  return (
    <>
    <Header/>
      <PiracyPolicy />
      <Footer/>
    </>
  );
}
