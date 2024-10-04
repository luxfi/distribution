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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  TestOwner,
  TestOwnerInterface,
} from "../../../src/LUXSale.test.sol/TestOwner";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract TestableLUXSale",
        name: "_sale",
        type: "address",
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
    name: "doCollect",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sale",
    outputs: [
      {
        internalType: "contract TestableLUXSale",
        name: "",
        type: "address",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516103d33803806103d383398101604081905261002f916100d8565b338061005557604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005e81610088565b5060018055600280546001600160a01b0319166001600160a01b0392909216919091179055610108565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100ea57600080fd5b81516001600160a01b038116811461010157600080fd5b9392505050565b6102bc806101176000396000f3fe60806040526004361061004e5760003560e01c80636ad1fe021461005a578063715018a614610096578063842eb662146100ad5780638da5cb5b146100c2578063f2fde38b146100e057600080fd5b3661005557005b600080fd5b34801561006657600080fd5b5060025461007a906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b3480156100a257600080fd5b506100ab610100565b005b3480156100b957600080fd5b506100ab610114565b3480156100ce57600080fd5b506000546001600160a01b031661007a565b3480156100ec57600080fd5b506100ab6100fb36600461027f565b610195565b6101086101d8565b6101126000610205565b565b61011c6101d8565b610124610255565b600260009054906101000a90046001600160a01b03166001600160a01b031663e52253816040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561017457600080fd5b505af1158015610188573d6000803e3d6000fd5b5050505061011260018055565b61019d6101d8565b6001600160a01b0381166101cc57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b6101d581610205565b50565b6000546001600160a01b031633146101125760405163118cdaa760e01b81523360048201526024016101c3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60026001540361027857604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b60006020828403121561029157600080fd5b81356001600160a01b03811681146102a857600080fd5b939250505056fea164736f6c6343000814000a";

type TestOwnerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestOwnerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestOwner__factory extends ContractFactory {
  constructor(...args: TestOwnerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _sale: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_sale, overrides || {});
  }
  override deploy(
    _sale: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_sale, overrides || {}) as Promise<
      TestOwner & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): TestOwner__factory {
    return super.connect(runner) as TestOwner__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestOwnerInterface {
    return new Interface(_abi) as TestOwnerInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): TestOwner {
    return new Contract(address, _abi, runner) as unknown as TestOwner;
  }
}
