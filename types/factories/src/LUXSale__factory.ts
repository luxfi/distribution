/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { LUXSale, LUXSaleInterface } from "../../src/LUXSale";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_numberOfDays",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_openTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_foundersAllocation",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_foundersKey",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_basePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceIncreaseRate",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "window",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LogBuy",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "window",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LogClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LogCollect",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "LogFreeze",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "key",
        type: "string",
      },
    ],
    name: "LogRegister",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "LUX",
    outputs: [
      {
        internalType: "contract LUXToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "basePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
    ],
    name: "buyWithLimit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createFirstDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "createOnDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "createPerDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "dailyTotals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "dayFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "foundersAllocation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "foundersKey",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "freeze",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
    ],
    name: "getCurrentPriceFloor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract LUXToken",
        name: "_lux",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "keys",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfDays",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceIncreaseRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "time",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "today",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userBuys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620019ed380380620019ed83398101604081905262000034916200018f565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000129565b5060018055876200007657600080fd5b8387116200008357600080fd5b8486106200009057600080fd5b600988905560038790556006869055600885905560048490556005620000b7848262000334565b50600b829055600c819055600354606490620000d590601462000416565b620000e1919062000436565b600781905550600954600754600454600354620000ff919062000459565b6200010b919062000459565b62000117919062000436565b600a55506200046f9650505050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600080610100898b031215620001ad57600080fd5b885197506020808a0151975060408a0151965060608a0151955060808a0151945060a08a015160018060401b0380821115620001e857600080fd5b818c0191508c601f830112620001fd57600080fd5b81518181111562000212576200021262000179565b604051601f8201601f19908116603f011681019083821181831017156200023d576200023d62000179565b816040528281528f868487010111156200025657600080fd5b600093505b828410156200027a57848401860151818501870152928501926200025b565b60009281019095019190915250505060c08a015160e0909a0151989b979a5095989497939692505050565b600181811c90821680620002ba57607f821691505b602082108103620002db57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200032f57600081815260208120601f850160051c810160208610156200030a5750805b601f850160051c820191505b818110156200032b5782815560010162000316565b5050505b505050565b81516001600160401b0381111562000350576200035062000179565b6200036881620003618454620002a5565b84620002e1565b602080601f831160018114620003a05760008415620003875750858301515b600019600386901b1c1916600185901b1785556200032b565b600085815260208120601f198616915b82811015620003d157888601518255948401946001909101908401620003b0565b5085821015620003f05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141762000430576200043062000400565b92915050565b6000826200045457634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111562000430576200043062000400565b61156e806200047f6000396000f3fe6080604052600436106101d85760003560e01c80638da5cb5b11610102578063d1058e5911610095578063e9f6bd0b11610064578063e9f6bd0b14610503578063f2c298be14610519578063f2fde38b14610539578063f96512cc1461055957600080fd5b8063d1058e5914610499578063d174d584146104ae578063d90c1759146104ce578063e5225381146104ee57600080fd5b8063b74e452b116100d1578063b74e452b14610438578063c4d66de81461044d578063c7876ea41461046d578063cfae52e11461048357600080fd5b80638da5cb5b146103c857806392724df4146103fa578063a6f2ae3a1461041a578063b42568881461042257600080fd5b80633904e1bf1161017a578063670d14b211610149578063670d14b214610350578063715018a61461037057806378e97925146103855780637d34f5ac1461039b57600080fd5b80633904e1bf146102cd57806353014d67146103055780635ca811391461031b57806362a5af3b1461033b57600080fd5b806318160ddd116101b657806318160ddd1461025f5780631db580fa14610275578063379607f51461028b578063389ae4d1146102ab57600080fd5b80630842d271146101dd578063120aa877146101f257806316ada54714610242575b600080fd5b6101f06101eb366004610f37565b61056f565b005b3480156101fe57600080fd5b5061022d61020d366004610f78565b600f60209081526000928352604080842090915290825290205460ff1681565b60405190151581526020015b60405180910390f35b34801561024e57600080fd5b50425b604051908152602001610239565b34801561026b57600080fd5b5061025160035481565b34801561028157600080fd5b5061025160045481565b34801561029757600080fd5b506101f06102a6366004610fa8565b6106a6565b3480156102b757600080fd5b506102c0610829565b6040516102399190610fc1565b3480156102d957600080fd5b506102516102e8366004610f78565b600e60209081526000928352604080842090915290825290205481565b34801561031157600080fd5b50610251600c5481565b34801561032757600080fd5b50610251610336366004610fa8565b6108b7565b34801561034757600080fd5b506101f06108d1565b34801561035c57600080fd5b506102c061036b36600461100f565b6109f1565b34801561037c57600080fd5b506101f0610a0a565b34801561039157600080fd5b5061025160085481565b3480156103a757600080fd5b506102516103b6366004610fa8565b600d6020526000908152604090205481565b3480156103d457600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610239565b34801561040657600080fd5b50610251610415366004610fa8565b610a1e565b6101f0610a5c565b34801561042e57600080fd5b5061025160065481565b34801561044457600080fd5b50610251610a85565b34801561045957600080fd5b506101f061046836600461100f565b610a95565b34801561047957600080fd5b50610251600b5481565b34801561048f57600080fd5b5061025160075481565b3480156104a557600080fd5b506101f0610c92565b3480156104ba57600080fd5b506002546103e2906001600160a01b031681565b3480156104da57600080fd5b506102516104e9366004610fa8565b610ce5565b3480156104fa57600080fd5b506101f0610d24565b34801561050f57600080fd5b5061025160095481565b34801561052557600080fd5b506101f0610534366004611049565b610dc2565b34801561054557600080fd5b506101f061055436600461100f565b610e50565b34801561056557600080fd5b50610251600a5481565b610577610e90565b6006544210158015610592575060095461058f610a85565b11155b61059b57600080fd5b662386f26fc100003410156105af57600080fd5b6105b7610a85565b83101580156105c857506009548311155b6105d157600080fd5b60006105dc84610a1e565b9050808210156105eb57600080fd5b6000848152600e6020908152604080832033845290915281208054349290610614908490611110565b90915550506000848152600d602052604081208054349290610637908490611110565b9091555050821561065d576000848152600d602052604090205483101561065d57600080fd5b6040805185815234602082015233917fe054057d0479c6218d6ec87be73f88230a7e4e1f064cee6e7504e2c4cd9d6150910160405180910390a2506106a160018055565b505050565b6106ae610e90565b806106b7610a85565b116106c157600080fd5b6000818152600f6020908152604080832033845290915290205460ff16806106f557506000818152600d6020526040902054155b61081d576000818152600d6020908152604080832054600e83528184203385529092528220549091610726846108b7565b90506000836107358484611123565b61073f919061113a565b6000868152600f6020908152604080832033808552925291829020805460ff19166001179055600254915163a9059cbb60e01b81526004810191909152602481018390529192506001600160a01b03169063a9059cbb906044016020604051808303816000875af11580156107b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107dc919061115c565b50604080518681526020810183905233917f51223fdc0a25891366fb358b4af9fe3c381b1566e287c61a29d01c8a173fe4f4910160405180910390a2505050505b61082660018055565b50565b600580546108369061117e565b80601f01602080910402602001604051908101604052809291908181526020018280546108629061117e565b80156108af5780601f10610884576101008083540402835291602001916108af565b820191906000526020600020905b81548152906001019060200180831161089257829003601f168201915b505050505081565b600081156108c757600a546108cb565b6007545b92915050565b6108d9610eba565b6009546108e7906001611110565b6108ef610a85565b116108f957600080fd5b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa158015610942573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061096691906111b8565b600254604051630852cd8d60e31b8152600481018390529192506001600160a01b0316906342966c6890602401600060405180830381600087803b1580156109ad57600080fd5b505af11580156109c1573d6000803e3d6000fd5b50506040517fad487f3c412409f5b36d6b5ae6f3bb9c34e15234b3e9f101bb6ef0d584593c61925060009150a150565b601060205260009081526040902080546108369061117e565b610a12610eba565b610a1c6000610ee7565b565b6000610a2b8260646112b5565b82600c546064610a3b9190611110565b610a4591906112b5565b600b54610a529190611123565b6108cb919061113a565b6000610a66610a85565b90506000610a7382610a1e565b9050610a818260008361056f565b5050565b6000610a9042610ce5565b905090565b610a9d610eba565b6002546001600160a01b031615610ab357600080fd5b806001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610af1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1591906111b8565b15610b1f57600080fd5b600280546001600160a01b0319166001600160a01b0383169081179091556003546040516340c10f1960e01b815230600482015260248101919091526340c10f1990604401600060405180830381600087803b158015610b7e57600080fd5b505af1158015610b92573d6000803e3d6000fd5b50506002546004805460405163a9059cbb60e01b8152739011e888251ab053b7bd1cdb598db4f9ded9471492810183905260248101919091529093506001600160a01b03909116915063a9059cbb906044016020604051808303816000875af1158015610c03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c27919061115c565b506001600160a01b0381166000908152601060205260409020610c4b60058261130f565b50806001600160a01b03167fd80364ba2cbb1e827ab8adac9651cdfc27fb7b61c0a95663cb80b82d7636ad226005604051610c8691906113f0565b60405180910390a25050565b6000610c9c610a85565b905060005b81811015610a81576000818152600f6020908152604080832033845290915290205460ff16610cd357610cd3816106a6565b80610cdd8161147b565b915050610ca1565b60006008548210610d1c576201518060085483610d029190611494565b610d0c919061113a565b610d17906001611110565b6108cb565b600092915050565b610d2c610eba565b6000610d36610a85565b11610d4057600080fd5b47610d536000546001600160a01b031690565b6001600160a01b03166108fc829081150290604051600060405180830381858888f19350505050158015610d8b573d6000803e3d6000fd5b506040518181527f4ceba015d961d93f1d6825703b730a8ba05619c005dfd8073aee773dc6725fbb9060200160405180910390a150565b600954610dd0906001611110565b610dd8610a85565b1115610de357600080fd5b604081511115610df257600080fd5b336000908152601060205260409020610e0b82826114a7565b50336001600160a01b03167fd80364ba2cbb1e827ab8adac9651cdfc27fb7b61c0a95663cb80b82d7636ad2282604051610e459190610fc1565b60405180910390a250565b610e58610eba565b6001600160a01b038116610e8757604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61082681610ee7565b600260015403610eb357604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6000546001600160a01b03163314610a1c5760405163118cdaa760e01b8152336004820152602401610e7e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080600060608486031215610f4c57600080fd5b505081359360208301359350604090920135919050565b6001600160a01b038116811461082657600080fd5b60008060408385031215610f8b57600080fd5b823591506020830135610f9d81610f63565b809150509250929050565b600060208284031215610fba57600080fd5b5035919050565b600060208083528351808285015260005b81811015610fee57858101830151858201604001528201610fd2565b506000604082860101526040601f19601f8301168501019250505092915050565b60006020828403121561102157600080fd5b813561102c81610f63565b9392505050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561105b57600080fd5b813567ffffffffffffffff8082111561107357600080fd5b818401915084601f83011261108757600080fd5b81358181111561109957611099611033565b604051601f8201601f19908116603f011681019083821181831017156110c1576110c1611033565b816040528281528760208487010111156110da57600080fd5b826020860160208301376000928101602001929092525095945050505050565b634e487b7160e01b600052601160045260246000fd5b808201808211156108cb576108cb6110fa565b80820281158282048414176108cb576108cb6110fa565b60008261115757634e487b7160e01b600052601260045260246000fd5b500490565b60006020828403121561116e57600080fd5b8151801515811461102c57600080fd5b600181811c9082168061119257607f821691505b6020821081036111b257634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156111ca57600080fd5b5051919050565b600181815b8085111561120c5781600019048211156111f2576111f26110fa565b808516156111ff57918102915b93841c93908002906111d6565b509250929050565b600082611223575060016108cb565b81611230575060006108cb565b816001811461124657600281146112505761126c565b60019150506108cb565b60ff841115611261576112616110fa565b50506001821b6108cb565b5060208310610133831016604e8410600b841016171561128f575081810a6108cb565b61129983836111d1565b80600019048211156112ad576112ad6110fa565b029392505050565b600061102c8383611214565b601f8211156106a157600081815260208120601f850160051c810160208610156112e85750805b601f850160051c820191505b81811015611307578281556001016112f4565b505050505050565b81810361131a575050565b611324825461117e565b67ffffffffffffffff81111561133c5761133c611033565b6113508161134a845461117e565b846112c1565b6000601f821160018114611384576000831561136c5750848201545b600019600385901b1c1916600184901b1784556113e9565b600085815260209020601f19841690600086815260209020845b838110156113be578286015482556001958601959091019060200161139e565b50858310156113dc5781850154600019600388901b60f8161c191681555b50505060018360011b0184555b5050505050565b60006020808352600084546114048161117e565b80848701526040600180841660008114611425576001811461143f5761146d565b60ff1985168984015283151560051b89018301955061146d565b896000528660002060005b858110156114655781548b820186015290830190880161144a565b8a0184019650505b509398975050505050505050565b60006001820161148d5761148d6110fa565b5060010190565b818103818111156108cb576108cb6110fa565b815167ffffffffffffffff8111156114c1576114c1611033565b6114cf8161134a845461117e565b602080601f83116001811461150457600084156114ec5750858301515b600019600386901b1c1916600185901b178555611307565b600085815260208120601f198616915b8281101561153357888601518255948401946001909101908401611514565b50858210156115515787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea164736f6c6343000814000a";

type LUXSaleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LUXSaleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LUXSale__factory extends ContractFactory {
  constructor(...args: LUXSaleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _numberOfDays: BigNumberish,
    _totalSupply: BigNumberish,
    _openTime: BigNumberish,
    _startTime: BigNumberish,
    _foundersAllocation: BigNumberish,
    _foundersKey: string,
    _basePrice: BigNumberish,
    _priceIncreaseRate: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _numberOfDays,
      _totalSupply,
      _openTime,
      _startTime,
      _foundersAllocation,
      _foundersKey,
      _basePrice,
      _priceIncreaseRate,
      overrides || {}
    );
  }
  override deploy(
    _numberOfDays: BigNumberish,
    _totalSupply: BigNumberish,
    _openTime: BigNumberish,
    _startTime: BigNumberish,
    _foundersAllocation: BigNumberish,
    _foundersKey: string,
    _basePrice: BigNumberish,
    _priceIncreaseRate: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _numberOfDays,
      _totalSupply,
      _openTime,
      _startTime,
      _foundersAllocation,
      _foundersKey,
      _basePrice,
      _priceIncreaseRate,
      overrides || {}
    ) as Promise<
      LUXSale & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): LUXSale__factory {
    return super.connect(runner) as LUXSale__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LUXSaleInterface {
    return new Interface(_abi) as LUXSaleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): LUXSale {
    return new Contract(address, _abi, runner) as unknown as LUXSale;
  }
}
