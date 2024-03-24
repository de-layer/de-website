import FaucetForm from "@/components/testnet/FaucetForm";

export default function FaucetPage() {
  return (
    <div className="w-full max-w-lg mx-auto min-h-96 relative z-20 my-32 rounded-lg border-white border backdrop-blur-lg text-white flex flex-col items-start justify-start p-4">
      <h1 className="text-xl font-medium w-full text-center">Daozang Faucet</h1>

      <p>
        The Daozang Faucet is a tool that allows developers to get some testnet tokens for testing purposes.
      </p>

      <h2 className="mt-4 text-lg">
        Rules:
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>Each address can only request tokens once</li>
        <li>For now, only $DEAI holders can request tokens</li>
        <li>Testnet tokens are not real and have no value</li>
      </ul>

      <FaucetForm />
    </div>
  );
}
