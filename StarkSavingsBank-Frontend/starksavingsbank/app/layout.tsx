import type { Metadata } from "next";
import "./globals.css";
import { Cinzel } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Stark Savings Bank",
  description: "The Bank of the North",
};

const cinzel = Cinzel({ weight: ['400', '900'], subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body className={cinzel.className}>
        <AuthProvider>
        <Header />
        {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
