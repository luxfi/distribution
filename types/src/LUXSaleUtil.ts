/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
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
} from "../common";

export interface LUXSaleUtilInterface extends Interface {
  getFunction(
    nameOrSignature: "dailyTotals" | "sale" | "unsoldTokens" | "userBuys"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "dailyTotals",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "sale", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unsoldTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userBuys",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "dailyTotals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unsoldTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userBuys", data: BytesLike): Result;
}

export interface LUXSaleUtil extends BaseContract {
  connect(runner?: ContractRunner | null): LUXSaleUtil;
  waitForDeployment(): Promise<this>;

  interface: LUXSaleUtilInterface;

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

  dailyTotals: TypedContractMethod<[], [bigint[]], "view">;

  sale: TypedContractMethod<[], [string], "view">;

  unsoldTokens: TypedContractMethod<[], [bigint[]], "view">;

  userBuys: TypedContractMethod<[user: AddressLike], [bigint[]], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "dailyTotals"
  ): TypedContractMethod<[], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "sale"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "unsoldTokens"
  ): TypedContractMethod<[], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "userBuys"
  ): TypedContractMethod<[user: AddressLike], [bigint[]], "view">;

  filters: {};
}
