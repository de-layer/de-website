import { AppButton } from "@/components/AppButton";

export default function DappPage() {
  return (
    <div className="flex flex-col max-w-lg w-full mx-auto z-20 my-32 gap-4">
      <AppButton href="/dapp/bridge">Bridge</AppButton>
      <AppButton href="/dapp/testnet">Testnet</AppButton>
    </div>
  );
}

