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
import type { NonPayableOverrides } from "../../../../../../common";
import type {
  SafeProxy,
  SafeProxyInterface,
} from "../../../../../../@safe-global/safe-contracts/contracts/proxies/SafeProxy.sol/SafeProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_singleton",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516100f73803806100f783398101604081905261002f91610067565b6001600160a01b03811661004257600080fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055610097565b60006020828403121561007957600080fd5b81516001600160a01b038116811461009057600080fd5b9392505050565b6052806100a56000396000f3fe6080604052600080546001600160a01b0316632cf35bc960e11b823501602757808252602082f35b3682833781823684845af490503d82833e806040573d82fd5b503d81f3fea164736f6c6343000814000a";

type SafeProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SafeProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SafeProxy__factory extends ContractFactory {
  constructor(...args: SafeProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _singleton: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_singleton, overrides || {});
  }
  override deploy(
    _singleton: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_singleton, overrides || {}) as Promise<
      SafeProxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SafeProxy__factory {
    return super.connect(runner) as SafeProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SafeProxyInterface {
    return new Interface(_abi) as SafeProxyInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): SafeProxy {
    return new Contract(address, _abi, runner) as unknown as SafeProxy;
  }
}
