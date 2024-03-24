import Link from "next/link";
import { PropsWithChildren } from "react";

export default function DappPage() {
  return (
    <div className="flex flex-col max-w-lg w-full mx-auto z-20 my-32 gap-4">
      <AppButton href="/dapp/bridge">Bridge</AppButton>
      <AppButton href="/dapp/testnet">Testnet</AppButton>
    </div>
  );
}

function AppButton({ href, children }: PropsWithChildren<{ href: string; }>) {
  return (
    <Link
      className="w-full rounded-lg border-white border backdrop-blur-lg text-white flex flex-col items-center justify-center px-4 py-3 text-xl"
      href={href}
    >
      {children}
    </Link>
  );
}