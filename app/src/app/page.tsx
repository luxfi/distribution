'use client'
import React from 'react'
import {  createConfig } from '@wagmi/core'
import { WagmiProvider, http } from 'wagmi'
import { luxMainnet, luxTestnet, luxDevnet, luxChaosnet } from './luxChains'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import Home from './home'

const config = createConfig({
  chains: [luxMainnet, luxTestnet, luxDevnet, luxChaosnet],
  transports: {
    [luxMainnet.id]: http(),
    [luxTestnet.id]: http(),
    [luxDevnet.id]: http(),
    [luxChaosnet.id]: http()
  }
})
const Page = () => {
  return (
    <WagmiProvider config={config}>
        <Home />
    </WagmiProvider>
  )
}

export default Page
