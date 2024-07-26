import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomeContainer } from "@/container/Home/homeContainer";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeContainer />
      <Footer />
    </main>
  );
}
