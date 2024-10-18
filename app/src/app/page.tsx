'use client'
import React from 'react'
import { createConfig } from '@wagmi/core'
import { WagmiProvider, http } from 'wagmi'
import { Header, Footer } from '@luxfi/ui'
import siteDef from './site-def'
import { luxMainnet, luxTestnet, luxDevnet, luxChaosnet } from './luxChains'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

const queryClient = new QueryClient()
const Page = () => {
  return (<>
    <Header siteDef={siteDef} />
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <ConnectKitProvider>
          <Home />
        </ConnectKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
    <Footer siteDef={siteDef} className='grow-0 w-full lg:mx-auto sm:pt-6 border-t-0 flex flex-col justify-between md:justify-start'/>
  </>)
}

export default Page
