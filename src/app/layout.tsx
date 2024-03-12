import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Cinzel_Decorative, Inter, Italiana, Nova_Mono, Nova_Square, Ropa_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", });
const cinzel = Cinzel_Decorative({ weight: ['400', '700', '900'], variable: "--font-cinzel", subsets: ['latin'] });
const italiana = Italiana({ weight: ['400'], variable: "--font-italiana", subsets: ['latin'] });
const ropa = Ropa_Sans({ weight: ['400'], variable: "--font-ropa", subsets: ['latin'] });
const nova = Nova_Square({ weight: ['400'], variable: "--font-nova", subsets: ['latin'] });
const novanew = Nova_Mono({ weight: ['400'], variable: "--font-novanew", subsets: ['latin'] });
export const metadata: Metadata = {
  title: "De Layer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = undefined; // cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${novanew.variable}  ${nova.variable}  ${ropa.variable} ${italiana.variable} ${inter.variable} `}>
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
