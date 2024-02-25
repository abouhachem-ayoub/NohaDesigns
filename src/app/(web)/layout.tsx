import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import { Lugrasimo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";
import Toast from "@/components/Toast/Toast";

const poppins = Poppins({ subsets: ["latin"],
weight:["400","500","700","900"],
style:['italic','normal'],
variable:"--font-poppins" });

const lugrasimo = Lugrasimo({subsets:["latin"] ,
weight:['400'],
style:['normal'],
variable:"--font-lugrasimo" 
})


export const metadata: Metadata = {
  title: "Nohaila's designs",
  description: "Discover the best designs by Nohaila!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeProvider>
          <Toast />
          <main className="font-normal">
          <Header/>
             {children}
          <Footer/>
        </main>
        </ThemeProvider>
        </NextAuthProvider>
       </body>
    </html>
  );
}
