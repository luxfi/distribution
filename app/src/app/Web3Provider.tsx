'use client';

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { luxMainnet, luxTestnet, luxDevnet, luxChaosnet } from './luxChains';

const { chains, publicClient } = configureChains(
  [luxMainnet, luxTestnet, luxDevnet, luxChaosnet, mainnet],
  [publicProvider()]
);

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    publicClient,
    appName: 'Lux App',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // required for WalletConnect 2.0
  })
);

export const Web3Provider = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};
