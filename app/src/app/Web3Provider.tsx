'use client';
import { createConfig } from '@wagmi/core';
import {mainnet, sepolia} from '@wagmi/core/chains'
import { WagmiProvider, http } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { luxMainnet, luxTestnet, luxDevnet, luxChaosnet } from './luxChains';



const queryClient = new QueryClient();

const config = createConfig({
  chains: [luxMainnet, luxTestnet, luxDevnet, luxChaosnet, mainnet, sepolia],
  transports: {
    [luxMainnet.id]: http(),
    [luxTestnet.id]: http(),
    [luxDevnet.id]: http(),
    [luxChaosnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http()
  }
});
export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};