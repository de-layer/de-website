'use client';
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import Photo from "../../public/assets/landing/photo.png";
const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), { ssr: false });

export default function Home() {
  const futureDate = new Date('2024-06-01T20:00:00Z');
  return (
    <main className="flex flex-col items-center text-center justify-center w-full mx-auto font-nova overflow-hidden">
      <div className="h-screen flex flex-col items-center jusitfy-center bg-primary w-full relative">
        <Image priority src={Photo} className="h-full absolute w-[2600px] z-10 object-cover" alt="" />
        <div className="flex text-secondary mx-auto my-auto relative z-20 justify-center flex-col items-center h-full">
          <div className="">
            <p className="text-6xl sm:text-7xl text-accent  uppercase sm:w-[564px]">
              De Layer
            </p>
            <p className="text-6xl sm:text-7xl sm:w-[564px]">
              COMING SOON
            </p>
            <div className="min-h-10 mt-2">
              <CountdownTimer targetDate={futureDate} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
