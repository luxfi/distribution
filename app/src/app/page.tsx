'use client'
import React from 'react'
import { createConfig } from '@wagmi/core'
import Header from './layout/components/header'
import { Footer } from '@luxfi/ui'
import siteDef from './site-def'

//
//import rainbow
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { luxMainnet, luxTestnet } from './luxChains';
//
import Home from './home'

const config = getDefaultConfig({
  appName: 'Lux ICO Application',
  projectId: '4ac5eea6b5c5df6d6b28bebff8d5ed4b',
  chains: [luxMainnet, luxTestnet],
  ssr: true
})


const queryClient = new QueryClient()
const Page = () => {
  return (<>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider
          theme={
            darkTheme({
              accentColor: 'white',
              accentColorForeground: 'black',
              borderRadius: 'large',
              overlayBlur: 'small',
            })
          }
        >
          <Header siteDef={siteDef} />
          <Home />
          <Footer siteDef={siteDef} className='grow-0 w-full lg:mx-auto sm:pt-6 border-t-0 flex flex-col justify-between md:justify-start' />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </>)
}

export default Page
