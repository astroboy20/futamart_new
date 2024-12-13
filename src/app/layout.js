import { ReactQueryClientProvider } from "@/providers/providers";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { PostHogProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Update metadata
export const metadata = {
  title: "futamart - Your Marketplace for All",
  description:
    "Join futamart to sell and buy products with ease. Connect with buyers and boost your sales!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/futamart.png" />
        {/* Open Graph metadata */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/doqmoy4ix/image/upload/v1726765077/futamart-logo_bwairn.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://futamart.vercel.app" />
      </head>
      <body className={montserrat.variable}>
        <PostHogProvider>
          <AuthProvider>
            <ReactQueryClientProvider>
              <ChakraProvider
                toastOptions={{ defaultOptions: { position: "top" } }}
              >
                {children}
              </ChakraProvider>
            </ReactQueryClientProvider>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
