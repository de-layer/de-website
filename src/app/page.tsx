'use client';
import BigButton from "@/components/BigButton";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import SmallButtons from "@/components/SmallButtons";
import Tokenomics from "@/components/Tokenomics";
import { useEffect, useState } from 'react';
import CGC from "../../public/assets/icons/cgc.png";
import CMC from "../../public/assets/icons/cmc.png";
import Dext from "../../public/assets/icons/dext.png";
import Github from "../../public/assets/icons/github.png";
import Telegram from "../../public/assets/icons/telegram.png";
import X from "../../public/assets/icons/twitter.png";
import Photo from "../../public/assets/landing/photo.png";

const CountdownTimer = ({ targetDate }: any) => {
  const [timeRemaining, setTimeRemaining] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1000);

      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    return (<div className="text-accent text-left text-[16px] mt-2">
      <span className="font-nova"> {hours}h </span> /
      <span className="font-nova">  {minutes.toString().padStart(2, "0")}m </span>/
      <span className="font-nova"> {seconds.toString().padStart(2, "0")}s</span>
    </div>);
  };

  return (
    <div>
      <div>{formatTime(timeRemaining)}</div>
    </div>
  );
};

export default function Home() {
  const initialDate = new Date('2024-03-10T22:00:00-00:00');
  const futureDate = new Date(initialDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  return (
    <main className="flex flex-col items-center font-nova overflow-hidden">
      <div className="h-screen flex flex-col items-center jusitfy-center bg-primary w-full relative">
        <img alt="" src={Photo.src} className="h-full absolute w-[2600px] z-10 object-cover" />
        <Navbar />
        <div className="flex text-secondary  relative z-20 justify-center flex-col max-w-[1300px] xl:h-[70%] mt-auto xl:my-20 xl:w-[70%] px-2 py-10">
          <div className="mt-auto mr-auto">
            <p className="text-4xl text-accent  uppercase sm:w-[564px]">
              De Layer
            </p>
            <p className="text-4xl sm:w-[564px]">
              AN EVM SUBNET ON BITTENSOR
            </p>
            <p className="text-[16px] text-light mt-2 max-w-[550px]">
              De Layer brings all EVM capabilities to the protocol for decentralized subnets - Bittensor. It’s a developer-friendly layer that encourages the creation of decentralized applications using well-known tools.
              Join us to build the DeFi of Bittensor. Welcome to the cult.
            </p>
            <div className="flex flex-row space-x-6 mt-4 items-center">
              <a href="https://twitter.com/delayerevm" target="_blank" rel="noreferrer">
                <img alt="x.com" src={X.src} className="max-w-[20px]" />
              </a>
              <a href="https://t.me/delayerevm" target="_blank" rel="noreferrer">
                <img alt="telegram" src={Telegram.src} className="max-w-[20px]" />
              </a>
              <a href="https://github.com/de-layer/de" target="_blank" rel="noreferrer">
                <img alt="github" src={Github.src} className="max-w-[20px]" />
              </a>
              <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xe2baaa8eefc273ad8c126d0ec40cb6059cdc12a1?t=1710079015737" target="_blank" rel="noreferrer">
                <img alt="dextools" src={Dext.src} className="max-w-[20px]" />
              </a>
              <a href="https://www.coingecko.com/en/coins/de-layer" target="_blank" rel="noreferrer">
                <img alt="coingecko" src={CGC.src} className="max-w-[20px]" />
              </a>
              <img alt="coinmarketcap" src={CMC.src} className="max-w-[20px] cursor-not-allowed opacity-50" />
            </div>
            <CountdownTimer targetDate={futureDate} />
          </div>
        </div>
      </div>
      <CTA />
      <Tokenomics />
      <Features />
      <Roadmap />
      <BigButton />
      <SmallButtons />
      <Footer />
    </main>
  );
}
