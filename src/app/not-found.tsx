import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Photo from "../../public/assets/landing/photo.png";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center font-nova overflow-hidden">
      <div className="h-screen flex flex-col items-center jusitfy-center bg-primary w-full relative mx-4 px-2">
        <img alt="" src={Photo.src} className="h-full absolute w-[2600px] z-10 object-cover" />
        <Navbar />

        <div className="w-full max-w-lg mx-auto relative z-20 my-32 rounded-lg border-white border backdrop-blur-lg text-white flex flex-col items-center justify-center p-4 gap-2">
          <h1 className="text-4xl">404 Not found</h1>
          <p>
            The page you are looking for does not exist. 
            Go back to the <Link href="/" className="text-accent">homepage</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}