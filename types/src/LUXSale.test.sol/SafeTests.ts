/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface SafeTestsInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "safe"
      | "sale"
      | "setUp"
      | "testRegister"
      | "user1"
      | "user2"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "safe", values?: undefined): string;
  encodeFunctionData(functionFragment: "sale", values?: undefined): string;
  encodeFunctionData(functionFragment: "setUp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "testRegister",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "user1", values?: undefined): string;
  encodeFunctionData(functionFragment: "user2", values?: undefined): string;

  decodeFunctionResult(functionFragment: "safe", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sale", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testRegister",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "user1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "user2", data: BytesLike): Result;
}

export interface SafeTests extends BaseContract {
  connect(runner?: ContractRunner | null): SafeTests;
  waitForDeployment(): Promise<this>;

  interface: SafeTestsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  safe: TypedContractMethod<[], [string], "view">;

  sale: TypedContractMethod<[], [string], "view">;

  setUp: TypedContractMethod<[], [void], "nonpayable">;

  testRegister: TypedContractMethod<[], [void], "nonpayable">;

  user1: TypedContractMethod<[], [string], "view">;

  user2: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "safe"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "sale"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setUp"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "testRegister"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "user1"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "user2"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
