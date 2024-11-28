import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { HomeContainer } from "@/container/Home/homeContainer";
import HeaderWithMarquee from "@/components/marquee";
export default function Home() {
  return (
    <main>
      <HeaderWithMarquee />
      <Header />
      <HomeContainer />
      <Footer />
    </main>
  );
}
