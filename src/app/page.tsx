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
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">Relaunch of De Layer<br /><br />Dear community, we are officially announcing the relaunch of De Layer token.<br /><br />We are still in the process of working out the details of the relaunch. <br /><br />Here are the things we have decided on now:<br />- The token will be relaunched on a new smart contract<br />-…</p>&mdash; De δ (@delayerevm) <a href="https://twitter.com/delayerevm/status/1796995459203866767?ref_src=twsrc%5Etfw">June 1, 2024</a></blockquote>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </div>
        </div>
      </div>
    </main>
  );
}
