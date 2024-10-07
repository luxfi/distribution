// src/app/luxChains.ts
import {type Chain} from 'viem'
export const luxMainnet = {
  id: 7777,
  name: 'Lux Mainnet',
  nativeCurrency: { name: 'Lux', symbol: 'LUX', decimals: 18 },
  rpcUrls: { default: {http: ['https://api.lux.network']} },
  blockExplorers: { default: { name: 'Lux Explorer', url: 'https://explore.lux.network' } },
} as const satisfies Chain;

export const luxTestnet = {
  id: 8888,
  name: 'Lux Testnet',
  nativeCurrency: { name: 'tLux', symbol: 'tLUX', decimals: 18 },
  rpcUrls: { default: {http: ['https://api.lux-test.network']} },
  blockExplorers: { default: { name: 'Testnet Explorer', url: 'https://explore.lux-test.network' } },
} as const satisfies Chain;

export const luxDevnet = {
  id: 9999,
  name: 'Lux Devnet',
  nativeCurrency: { name: 'dLux', symbol: 'dLUX', decimals: 18 },
  rpcUrls: { default: {http: ['https://api.lux-dev.network']} },
  blockExplorers: { default: { name: 'Devnet Explorer', url: 'https://explore.lux-dev.network' } },
} as const satisfies Chain;
export const luxChaosnet = {
  id: 1111,
  name: 'Lux Chaosnet',
  nativeCurrency: { name: 'cLux', symbol: 'cLUX', decimals: 18 },
  rpcUrls: { default: {http: ['https://api.lux-chaos.network']} },
  blockExplorers: { default: { name: 'Chaosnet Explorer', url: 'https://explore.lux-chaos.network' } },
}as const satisfies Chain;