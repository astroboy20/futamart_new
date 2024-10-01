import AuthLayout from "@/components/authLayout";
import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import Favourite from "@/container/Favourite/Favourite";

const Page = () => {
  // Improved loading state handling
  if (isLoading) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <LoadingComponent /> {/* Extracted loading component for clarity */}
      </div>
    );
  }

  // Error handling
  if (error) {
    return <ErrorComponent message={error.message} />; {/* Extracted error component */}
  }

  return (
    <main>
      <Header />
      <Favourite />
      <Footer />
    </main>
  );
};

// New loading component
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

// New error component
const ErrorComponent = ({ message }) => (
  <div className="text-red-500">{message}</div>
);

export default Page;
