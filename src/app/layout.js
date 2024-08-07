import { ReactQueryClientProvider } from "@/providers/providers";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Futamart",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <AuthProvider>
          <ReactQueryClientProvider>
            {children}
          </ReactQueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
