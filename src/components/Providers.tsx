"use client";
import { config, projectId } from "@/util/wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { PropsWithChildren } from "react";
import { State, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
});

export default function Providers({ children, initialState }: PropsWithChildren<{ initialState?: State; }>) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}