/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  SafeUser,
  SafeUserInterface,
} from "../../../src/LUXSale.test.sol/SafeUser";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract Safe",
        name: "_safe",
        type: "address",
      },
    ],
    name: "addSafe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "doConfirm",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "safe",
    outputs: [
      {
        internalType: "contract Safe",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061016c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063186f035414610046578063726c1c3c14610075578063b84417b7146100a7575b600080fd5b600054610059906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100a5610083366004610116565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b005b6100a56100b5366004610146565b60005460405163d4d9bdcd60e01b8152600481018390526001600160a01b039091169063d4d9bdcd90602401600060405180830381600087803b1580156100fb57600080fd5b505af115801561010f573d6000803e3d6000fd5b5050505050565b60006020828403121561012857600080fd5b81356001600160a01b038116811461013f57600080fd5b9392505050565b60006020828403121561015857600080fd5b503591905056fea164736f6c6343000814000a";

type SafeUserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SafeUserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SafeUser__factory extends ContractFactory {
  constructor(...args: SafeUserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      SafeUser & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SafeUser__factory {
    return super.connect(runner) as SafeUser__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SafeUserInterface {
    return new Interface(_abi) as SafeUserInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): SafeUser {
    return new Contract(address, _abi, runner) as unknown as SafeUser;
  }
}
