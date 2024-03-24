import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";
import Photo from "../../../public/assets/landing/photo.png";

export default function DappLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col items-center font-nova overflow-hidden">
      <div className="h-screen flex flex-col items-center jusitfy-center bg-primary w-full relative mx-4 px-2">
        <img alt="" src={Photo.src} className="h-full absolute w-[2600px] z-10 object-cover" />
        <Navbar />
        {children}
      </div>
    </main>
  );
}