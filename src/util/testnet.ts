import { Chain } from "wagmi/chains";

export const daozang = {
  id: 6869,
  name: 'Daozang Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tDEAI',
    symbol: 'tDEAI'
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://daozang-explorer.delayer.network/' }
  },
  rpcUrls: {
    default: {
      http: ['https://daozang.delayer.network/'],
    }
  },
  testnet: true,
} as const satisfies Chain;