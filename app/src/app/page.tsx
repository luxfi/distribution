'use client';

import { WagmiConfig, createConfig } from 'wagmi';
import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { luxMainnet, luxTestnet, luxDevnet, luxChaosnet } from './chains'; // You'll need to define these
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

import  Home  from './home'; // Move the existing Home component to a separate file

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [luxMainnet, luxTestnet, luxDevnet, luxChaosnet],
  [publicProvider()]
);

const config = createConfig(
  getDefaultConfig({
    appName: 'Lux Token Distribution',
    chains,
    publicClient,
    webSocketPublicClient,
  })
);

const Page = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Home />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Page;
