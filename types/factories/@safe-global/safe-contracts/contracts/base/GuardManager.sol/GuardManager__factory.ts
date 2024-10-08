/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  GuardManager,
  GuardManagerInterface,
} from "../../../../../../@safe-global/safe-contracts/contracts/base/GuardManager.sol/GuardManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "guard",
        type: "address",
      },
    ],
    name: "ChangedGuard",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guard",
        type: "address",
      },
    ],
    name: "setGuard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class GuardManager__factory {
  static readonly abi = _abi;
  static createInterface(): GuardManagerInterface {
    return new Interface(_abi) as GuardManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): GuardManager {
    return new Contract(address, _abi, runner) as unknown as GuardManager;
  }
}
