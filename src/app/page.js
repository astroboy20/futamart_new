import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { HomeContainer } from "@/container/Home/homeContainer";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeContainer />
      <Footer />
    </main>
  );
}
