// src/app/luxChains.ts
export const luxMainnet = {
  id: 7777,
  name: 'Lux Mainnet',
  network: 'lux-mainnet',
  nativeCurrency: { name: 'Lux', symbol: 'LUX', decimals: 18 },
  rpcUrls: { default: 'https://api.lux.network' },
  blockExplorers: { default: { name: 'Lux Explorer', url: 'https://explore.lux.network' } },
};

export const luxTestnet = {
  id: 8888,
  name: 'Lux Testnet',
  network: 'lux-testnet',
  nativeCurrency: { name: 'tLux', symbol: 'tLUX', decimals: 18 },
  rpcUrls: { default: 'https://api.lux-test.network' },
  blockExplorers: { default: { name: 'Testnet Explorer', url: 'https://explore.lux-test.network' } },
};

export const luxDevnet = {
  id: 9999,
  name: 'Lux Devnet',
  network: 'lux-devnet',
  nativeCurrency: { name: 'dLux', symbol: 'dLUX', decimals: 18 },
  rpcUrls: { default: 'https://api.lux-dev.network' },
  blockExplorers: { default: { name: 'Devnet Explorer', url: 'https://explore.lux-dev.network' } },
};

export const luxChaosnet = {
  id: 1111,
  name: 'Lux Chaosnet',
  network: 'lux-chaosnet',
  nativeCurrency: { name: 'cLux', symbol: 'cLUX', decimals: 18 },
  rpcUrls: { default: 'https://api.lux-chaos.network' },
  blockExplorers: { default: { name: 'Chaosnet Explorer', url: 'https://explore.lux-chaos.network' } },
};
