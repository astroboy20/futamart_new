import AuthLayout from "@/components/authLayout";
import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import Favourite from "@/container/Favourite/Favourite";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Logo_Black } from "@/assets";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    // Example of handling an error
    // setError(new Error('Something went wrong'));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <main>
      <Header />
      <Favourite />
      <Footer />
    </main>
  );
};

const LoadingComponent = () => (
  <div className="flex flex-col text-center">
    <Logo_Black />
    <h1 className="text-[32px] font-[600]">
      <Typewriter
        words={["futamart"]}
        loop={5}
        cursor
        cursorStyle="_"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h1>
  </div>
);

const ErrorComponent = ({ message }) => (
  <div className="text-red-500">{message}</div>
);

export default Page;
