import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { arbitrum, base, mainnet } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID as string;

const metadata = {
  name: 'De Layer',
  description: 'De Layer',
  url: 'https://delayer.network', // origin must match your domain & subdomain
  icons: ['https://delayer.network/favicon.ico']
};

const chains = [mainnet, base, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
});

export { config };
