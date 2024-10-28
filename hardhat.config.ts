import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import '@nomicfoundation/hardhat-verify'
import 'hardhat-watcher'
import * as dotenv from "dotenv";

import { HardhatUserConfig } from 'hardhat/types'

dotenv.config();

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 200,
    },
    metadata: {
      bytecodeHash: 'none',
    },
    debug: {
      revertStrings: "strip", // Strips revert strings to reduce contract size
    },
  },
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    lux: {
      url: "https://api.lux.network/",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    lux_testnet: {
      url: "https://api.lux-test.network",
      accounts: [process.env.PRIVATE_KEY ?? ""],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "15B6F1WNW4Q8YND5TY64I378A36AXT188A",
    customChains: [
      {
        network: "lux",
        chainId: 7777,
        urls: {
          apiURL: "https://api.explore.lux.network/api",
          browserURL: "https://explore.lux.network"
        }
      },
      {
        network: "lux_testnet",
        chainId: 8888,
        urls: {
          apiURL: "https://api.explore.lux-test.network/api",
          browserURL: "https://explore.lux-test.network"
        }
      },
    ]
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          evmVersion: 'istanbul',
          optimizer: {
            enabled: true,
            runs: 200,
          },
          metadata: {
            bytecodeHash: 'none',
          },
          debug: {
            revertStrings: "strip",
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
  paths: {
    sources: "./src", // Change this line to point to your src folder
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
}

export default config
