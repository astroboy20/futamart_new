import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { HomeContainer } from "@/container/Home/homeContainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading</div>}>
      <Header />
      <HomeContainer />
      <Footer />
      </Suspense>
    
    </main>
  );
}
