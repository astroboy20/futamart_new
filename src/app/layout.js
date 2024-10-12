import { ReactQueryClientProvider } from "@/providers/providers";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "futamart",
  description: "The All-in-One Marketplace Where Businesses Thrive and Shoppers Discover with Ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/futamart.png" />
      </head>
      <body className={montserrat.variable}>
        <AuthProvider>
          <ReactQueryClientProvider>
            <ChakraProvider
              toastOptions={{ defaultOptions: { position: "top" } }}
            >
              {children}
            </ChakraProvider>
          </ReactQueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

