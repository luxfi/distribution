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
  LUXSalePreInitTests,
  LUXSalePreInitTestsInterface,
} from "../../../src/LUXSale.test.sol/LUXSalePreInitTests";

const _abi = [
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
    inputs: [],
    name: "setUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "testFailTokenAuthority",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "user1",
    outputs: [
      {
        internalType: "contract TestUser",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061303b806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630a9254e4146100515780636ad1fe021461005b578063989e6d021461008a578063ac1717b014610092575b600080fd5b6100596100a5565b005b60005461006e906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b610059610238565b60015461006e906001600160a01b031681565b60408051808201909152600a815269666f756e6465724b657960b01b60208201526005680878678326eac90000426100e081620151806102f9565b678ac7230489e800008565640b5eece00060016040516100ff906102d2565b610110989796959493929190610320565b604051809103906000f08015801561012c573d6000803e3d6000fd5b50600080546001600160a01b0319166001600160a01b03929092169182179055604051610158906102df565b6001600160a01b039091168152602001604051809103906000f080158015610184573d6000803e3d6000fd5b50600180546001600160a01b0319166001600160a01b0392909216918217905560405160009068056bc75e2d631000009082818181858883f193505050501580156101d3573d6000803e3d6000fd5b50600054604051630502ca6b60e01b81526201518060048201526001600160a01b0390911690630502ca6b906024015b600060405180830381600087803b15801561021d57600080fd5b505af1158015610231573d6000803e3d6000fd5b5050505050565b6000604051610246906102ec565b604080825260099082015268262aac102a37b5b2b760b91b606082015260806020820181905260039082015262098aab60eb1b60a082015260c001604051809103906000f08015801561029d573d6000803e3d6000fd5b5060005460405163189acdbd60e31b81526001600160a01b03808416600483015292935091169063c4d66de890602401610203565b611a76806103a983390190565b61053580611e1f83390190565b610cdb8061235483390190565b8082018082111561031a57634e487b7160e01b600052601160045260246000fd5b92915050565b60006101008a835260208a818501528960408501528860608501528760808501528160a085015286518083860152600092505b8083101561037257878301820151858401610120015291810191610353565b600061012082870181019190915260c086019790975260e0850195909552505050601f909101601f19160101969550505050505056fe60806040523480156200001157600080fd5b5060405162001a7638038062001a7683398101604081905262000034916200019f565b878787878787878733806200006357604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6200006e8162000139565b5060018055876200007e57600080fd5b8387116200008b57600080fd5b8486106200009857600080fd5b600988905560038790556006869055600885905560048490556005620000bf848262000344565b50600b829055600c819055600354606490620000dd90601462000426565b620000e9919062000446565b60078190555060095460075460045460035462000107919062000469565b62000113919062000469565b6200011f919062000446565b600a55506200047f9e505050505050505050505050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600080610100898b031215620001bd57600080fd5b885197506020808a0151975060408a0151965060608a0151955060808a0151945060a08a015160018060401b0380821115620001f857600080fd5b818c0191508c601f8301126200020d57600080fd5b81518181111562000222576200022262000189565b604051601f8201601f19908116603f011681019083821181831017156200024d576200024d62000189565b816040528281528f868487010111156200026657600080fd5b600093505b828410156200028a57848401860151818501870152928501926200026b565b60009281019095019190915250505060c08a015160e0909a0151989b979a5095989497939692505050565b600181811c90821680620002ca57607f821691505b602082108103620002eb57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200033f57600081815260208120601f850160051c810160208610156200031a5750805b601f850160051c820191505b818110156200033b5782815560010162000326565b5050505b505050565b81516001600160401b0381111562000360576200036062000189565b6200037881620003718454620002b5565b84620002f1565b602080601f831160018114620003b05760008415620003975750858301515b600019600386901b1c1916600185901b1785556200033b565b600085815260208120601f198616915b82811015620003e157888601518255948401946001909101908401620003c0565b5085821015620004005787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141762000440576200044062000410565b92915050565b6000826200046457634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111562000440576200044062000410565b6115e7806200048f6000396000f3fe6080604052600436106101ee5760003560e01c80637d34f5ac1161010d578063cfae52e1116100a0578063e52253811161006f578063e522538114610540578063e9f6bd0b14610555578063f2c298be1461056b578063f2fde38b1461058b578063f96512cc146105ab57600080fd5b8063cfae52e1146104d5578063d1058e59146104eb578063d174d58414610500578063d90c17591461052057600080fd5b8063b4256888116100dc578063b425688814610474578063b74e452b1461048a578063c4d66de81461049f578063c7876ea4146104bf57600080fd5b80637d34f5ac146103ed5780638da5cb5b1461041a57806392724df41461044c578063a6f2ae3a1461046c57600080fd5b8063389ae4d11161018557806362a5af3b1161015457806362a5af3b1461038d578063670d14b2146103a2578063715018a6146103c257806378e97925146103d757600080fd5b8063389ae4d1146102fd5780633904e1bf1461031f57806353014d67146103575780635ca811391461036d57600080fd5b806316ada547116101c157806316ada5471461029c57806318160ddd146102b15780631db580fa146102c7578063379607f5146102dd57600080fd5b80630502ca6b146101f35780630842d27114610215578063120aa8771461022857806316743ca614610278575b600080fd5b3480156101ff57600080fd5b5061021361020e366004610fb0565b6105c1565b005b610213610223366004610fc9565b6105e3565b34801561023457600080fd5b5061026361024336600461100a565b600f60209081526000928352604080842090915290825290205460ff1681565b60405190151581526020015b60405180910390f35b34801561028457600080fd5b5061028e60115481565b60405190815260200161026f565b3480156102a857600080fd5b5060115461028e565b3480156102bd57600080fd5b5061028e60035481565b3480156102d357600080fd5b5061028e60045481565b3480156102e957600080fd5b506102136102f8366004610fb0565b61071c565b34801561030957600080fd5b5061031261089f565b60405161026f919061103a565b34801561032b57600080fd5b5061028e61033a36600461100a565b600e60209081526000928352604080842090915290825290205481565b34801561036357600080fd5b5061028e600c5481565b34801561037957600080fd5b5061028e610388366004610fb0565b61092d565b34801561039957600080fd5b50610213610947565b3480156103ae57600080fd5b506103126103bd366004611088565b610a67565b3480156103ce57600080fd5b50610213610a80565b3480156103e357600080fd5b5061028e60085481565b3480156103f957600080fd5b5061028e610408366004610fb0565b600d6020526000908152604090205481565b34801561042657600080fd5b506000546001600160a01b03165b6040516001600160a01b03909116815260200161026f565b34801561045857600080fd5b5061028e610467366004610fb0565b610a94565b610213610ad2565b34801561048057600080fd5b5061028e60065481565b34801561049657600080fd5b5061028e610afb565b3480156104ab57600080fd5b506102136104ba366004611088565b610b0e565b3480156104cb57600080fd5b5061028e600b5481565b3480156104e157600080fd5b5061028e60075481565b3480156104f757600080fd5b50610213610d0b565b34801561050c57600080fd5b50600254610434906001600160a01b031681565b34801561052c57600080fd5b5061028e61053b366004610fb0565b610d5e565b34801561054c57600080fd5b50610213610d9d565b34801561056157600080fd5b5061028e60095481565b34801561057757600080fd5b506102136105863660046110c2565b610e3b565b34801561059757600080fd5b506102136105a6366004611088565b610ec9565b3480156105b757600080fd5b5061028e600a5481565b6105c9610f09565b80601160008282546105db9190611189565b909155505050565b6105eb610f36565b600654601154101580156106085750600954610605610afb565b11155b61061157600080fd5b662386f26fc1000034101561062557600080fd5b61062d610afb565b831015801561063e57506009548311155b61064757600080fd5b600061065284610a94565b90508082101561066157600080fd5b6000848152600e602090815260408083203384529091528120805434929061068a908490611189565b90915550506000848152600d6020526040812080543492906106ad908490611189565b909155505082156106d3576000848152600d60205260409020548310156106d357600080fd5b6040805185815234602082015233917fe054057d0479c6218d6ec87be73f88230a7e4e1f064cee6e7504e2c4cd9d6150910160405180910390a25061071760018055565b505050565b610724610f36565b8061072d610afb565b1161073757600080fd5b6000818152600f6020908152604080832033845290915290205460ff168061076b57506000818152600d6020526040902054155b610893576000818152600d6020908152604080832054600e8352818420338552909252822054909161079c8461092d565b90506000836107ab848461119c565b6107b591906111b3565b6000868152600f6020908152604080832033808552925291829020805460ff19166001179055600254915163a9059cbb60e01b81526004810191909152602481018390529192506001600160a01b03169063a9059cbb906044016020604051808303816000875af115801561082e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085291906111d5565b50604080518681526020810183905233917f51223fdc0a25891366fb358b4af9fe3c381b1566e287c61a29d01c8a173fe4f4910160405180910390a2505050505b61089c60018055565b50565b600580546108ac906111f7565b80601f01602080910402602001604051908101604052809291908181526020018280546108d8906111f7565b80156109255780601f106108fa57610100808354040283529160200191610925565b820191906000526020600020905b81548152906001019060200180831161090857829003601f168201915b505050505081565b6000811561093d57600a54610941565b6007545b92915050565b61094f610f09565b60095461095d906001611189565b610965610afb565b1161096f57600080fd5b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156109b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109dc9190611231565b600254604051630852cd8d60e31b8152600481018390529192506001600160a01b0316906342966c6890602401600060405180830381600087803b158015610a2357600080fd5b505af1158015610a37573d6000803e3d6000fd5b50506040517fad487f3c412409f5b36d6b5ae6f3bb9c34e15234b3e9f101bb6ef0d584593c61925060009150a150565b601060205260009081526040902080546108ac906111f7565b610a88610f09565b610a926000610f60565b565b6000610aa182606461132e565b82600c546064610ab19190611189565b610abb919061132e565b600b54610ac8919061119c565b61094191906111b3565b6000610adc610afb565b90506000610ae982610a94565b9050610af7826000836105e3565b5050565b6000610b0961053b60115490565b905090565b610b16610f09565b6002546001600160a01b031615610b2c57600080fd5b806001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b8e9190611231565b15610b9857600080fd5b600280546001600160a01b0319166001600160a01b0383169081179091556003546040516340c10f1960e01b815230600482015260248101919091526340c10f1990604401600060405180830381600087803b158015610bf757600080fd5b505af1158015610c0b573d6000803e3d6000fd5b50506002546004805460405163a9059cbb60e01b8152739011e888251ab053b7bd1cdb598db4f9ded9471492810183905260248101919091529093506001600160a01b03909116915063a9059cbb906044016020604051808303816000875af1158015610c7c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca091906111d5565b506001600160a01b0381166000908152601060205260409020610cc4600582611388565b50806001600160a01b03167fd80364ba2cbb1e827ab8adac9651cdfc27fb7b61c0a95663cb80b82d7636ad226005604051610cff9190611469565b60405180910390a25050565b6000610d15610afb565b905060005b81811015610af7576000818152600f6020908152604080832033845290915290205460ff16610d4c57610d4c8161071c565b80610d56816114f4565b915050610d1a565b60006008548210610d95576201518060085483610d7b919061150d565b610d8591906111b3565b610d90906001611189565b610941565b600092915050565b610da5610f09565b6000610daf610afb565b11610db957600080fd5b47610dcc6000546001600160a01b031690565b6001600160a01b03166108fc829081150290604051600060405180830381858888f19350505050158015610e04573d6000803e3d6000fd5b506040518181527f4ceba015d961d93f1d6825703b730a8ba05619c005dfd8073aee773dc6725fbb9060200160405180910390a150565b600954610e49906001611189565b610e51610afb565b1115610e5c57600080fd5b604081511115610e6b57600080fd5b336000908152601060205260409020610e848282611520565b50336001600160a01b03167fd80364ba2cbb1e827ab8adac9651cdfc27fb7b61c0a95663cb80b82d7636ad2282604051610ebe919061103a565b60405180910390a250565b610ed1610f09565b6001600160a01b038116610f0057604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61089c81610f60565b6000546001600160a01b03163314610a925760405163118cdaa760e01b8152336004820152602401610ef7565b600260015403610f5957604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208284031215610fc257600080fd5b5035919050565b600080600060608486031215610fde57600080fd5b505081359360208301359350604090920135919050565b6001600160a01b038116811461089c57600080fd5b6000806040838503121561101d57600080fd5b82359150602083013561102f81610ff5565b809150509250929050565b600060208083528351808285015260005b818110156110675785810183015185820160400152820161104b565b506000604082860101526040601f19601f8301168501019250505092915050565b60006020828403121561109a57600080fd5b81356110a581610ff5565b9392505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156110d457600080fd5b813567ffffffffffffffff808211156110ec57600080fd5b818401915084601f83011261110057600080fd5b813581811115611112576111126110ac565b604051601f8201601f19908116603f0116810190838211818310171561113a5761113a6110ac565b8160405282815287602084870101111561115357600080fd5b826020860160208301376000928101602001929092525095945050505050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561094157610941611173565b808202811582820484141761094157610941611173565b6000826111d057634e487b7160e01b600052601260045260246000fd5b500490565b6000602082840312156111e757600080fd5b815180151581146110a557600080fd5b600181811c9082168061120b57607f821691505b60208210810361122b57634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561124357600080fd5b5051919050565b600181815b8085111561128557816000190482111561126b5761126b611173565b8085161561127857918102915b93841c939080029061124f565b509250929050565b60008261129c57506001610941565b816112a957506000610941565b81600181146112bf57600281146112c9576112e5565b6001915050610941565b60ff8411156112da576112da611173565b50506001821b610941565b5060208310610133831016604e8410600b8410161715611308575081810a610941565b611312838361124a565b806000190482111561132657611326611173565b029392505050565b60006110a5838361128d565b601f82111561071757600081815260208120601f850160051c810160208610156113615750805b601f850160051c820191505b818110156113805782815560010161136d565b505050505050565b818103611393575050565b61139d82546111f7565b67ffffffffffffffff8111156113b5576113b56110ac565b6113c9816113c384546111f7565b8461133a565b6000601f8211600181146113fd57600083156113e55750848201545b600019600385901b1c1916600184901b178455611462565b600085815260209020601f19841690600086815260209020845b838110156114375782860154825560019586019590910190602001611417565b50858310156114555781850154600019600388901b60f8161c191681555b50505060018360011b0184555b5050505050565b600060208083526000845461147d816111f7565b8084870152604060018084166000811461149e57600181146114b8576114e6565b60ff1985168984015283151560051b8901830195506114e6565b896000528660002060005b858110156114de5781548b82018601529083019088016114c3565b8a0184019650505b509398975050505050505050565b60006001820161150657611506611173565b5060010190565b8181038181111561094157610941611173565b815167ffffffffffffffff81111561153a5761153a6110ac565b611548816113c384546111f7565b602080601f83116001811461157d57600084156115655750858301515b600019600386901b1c1916600185901b178555611380565b600085815260208120601f198616915b828110156115ac5788860151825594840194600190910190840161158d565b50858210156115ca5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea164736f6c6343000814000a608060405234801561001057600080fd5b5060405161053538038061053583398101604081905261002f91610059565b6001600081905580546001600160a01b0319166001600160a01b0392909216919091179055610089565b60006020828403121561006b57600080fd5b81516001600160a01b038116811461008257600080fd5b9392505050565b61049d806100986000396000f3fe6080604052600436106100595760003560e01c806302686879146100655780636ad1fe0214610087578063a00e37fa146100c3578063e8cb03cc146100d6578063fb7c0a3f146100eb578063fbb2539f146100fe57600080fd5b3661006057005b600080fd5b34801561007157600080fd5b50610085610080366004610432565b61011e565b005b34801561009357600080fd5b506001546100a7906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100856100d136600461044b565b610191565b3480156100e257600080fd5b50610085610292565b6100856100f9366004610432565b61030e565b34801561010a57600080fd5b50610085610119366004610432565b610395565b610126610408565b60015460405163379607f560e01b8152600481018390526001600160a01b039091169063379607f590602401600060405180830381600087803b15801561016c57600080fd5b505af1158015610180573d6000803e3d6000fd5b5050505061018e6001600055565b50565b610199610408565b8234146101a557600080fd5b60015460405163249c937d60e21b8152600481018490526000916001600160a01b0316906392724df490602401602060405180830381865afa1580156101ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102139190610477565b600154604051630842d27160e01b81526004810186905260248101859052604481018390529192506001600160a01b031690630842d2719034906064016000604051808303818588803b15801561026957600080fd5b505af115801561027d573d6000803e3d6000fd5b50505050505061028d6001600055565b505050565b61029a610408565b600160009054906101000a90046001600160a01b03166001600160a01b03166362a5af3b6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156102ea57600080fd5b505af11580156102fe573d6000803e3d6000fd5b5050505061030c6001600055565b565b610316610408565b80341461032257600080fd5b600160009054906101000a90046001600160a01b03166001600160a01b031663a6f2ae3a346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561037257600080fd5b505af1158015610386573d6000803e3d6000fd5b505050505061018e6001600055565b61039d610408565b6001546040516000916001600160a01b03169083908381818185875af1925050503d80600081146103ea576040519150601f19603f3d011682016040523d82523d6000602084013e6103ef565b606091505b50509050806103fd57600080fd5b5061018e6001600055565b60026000540361042b57604051633ee5aeb560e01b815260040160405180910390fd5b6002600055565b60006020828403121561044457600080fd5b5035919050565b60008060006060848603121561046057600080fd5b505081359360208301359350604090920135919050565b60006020828403121561048957600080fd5b505191905056fea164736f6c6343000814000a60806040523480156200001157600080fd5b5060405162000cdb38038062000cdb8339810160408190526200003491620001b1565b3382826003620000458382620002aa565b506004620000548282620002aa565b5050506001600160a01b0381166200008657604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b62000091816200009a565b50505062000376565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200011457600080fd5b81516001600160401b0380821115620001315762000131620000ec565b604051601f8301601f19908116603f011681019082821181831017156200015c576200015c620000ec565b816040528381526020925086838588010111156200017957600080fd5b600091505b838210156200019d57858201830151818301840152908201906200017e565b600093810190920192909252949350505050565b60008060408385031215620001c557600080fd5b82516001600160401b0380821115620001dd57600080fd5b620001eb8683870162000102565b935060208501519150808211156200020257600080fd5b50620002118582860162000102565b9150509250929050565b600181811c908216806200023057607f821691505b6020821081036200025157634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002a557600081815260208120601f850160051c81016020861015620002805750805b601f850160051c820191505b81811015620002a1578281556001016200028c565b5050505b505050565b81516001600160401b03811115620002c657620002c6620000ec565b620002de81620002d784546200021b565b8462000257565b602080601f831160018114620003165760008415620002fd5750858301515b600019600386901b1c1916600185901b178555620002a1565b600085815260208120601f198616915b82811015620003475788860151825594840194600190910190840162000326565b5085821015620003665787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61095580620003866000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a082311161009757806395d89b411161006657806395d89b41146101f6578063a9059cbb146101fe578063dd62ed3e14610211578063f2fde38b1461024a57600080fd5b806370a0823114610197578063715018a6146101c057806379cc6790146101c85780638da5cb5b146101db57600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce5671461016057806340c10f191461016f57806342966c681461018457600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b61010261025d565b60405161010f91906107af565b60405180910390f35b61012b610126366004610819565b6102ef565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b366004610843565b610309565b6040516012815260200161010f565b61018261017d366004610819565b61032d565b005b61018261019236600461087f565b610343565b61013f6101a5366004610898565b6001600160a01b031660009081526020819052604090205490565b610182610350565b6101826101d6366004610819565b610364565b6005546040516001600160a01b03909116815260200161010f565b610102610379565b61012b61020c366004610819565b610388565b61013f61021f3660046108ba565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b610182610258366004610898565b610396565b60606003805461026c906108ed565b80601f0160208091040260200160405190810160405280929190818152602001828054610298906108ed565b80156102e55780601f106102ba576101008083540402835291602001916102e5565b820191906000526020600020905b8154815290600101906020018083116102c857829003601f168201915b5050505050905090565b6000336102fd8185856103d6565b60019150505b92915050565b6000336103178582856103e8565b610322858585610466565b506001949350505050565b6103356104c5565b61033f82826104f2565b5050565b61034d3382610528565b50565b6103586104c5565b610362600061055e565b565b61036f8233836103e8565b61033f8282610528565b60606004805461026c906108ed565b6000336102fd818585610466565b61039e6104c5565b6001600160a01b0381166103cd57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61034d8161055e565b6103e383838360016105b0565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610460578181101561045157604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016103c4565b610460848484840360006105b0565b50505050565b6001600160a01b03831661049057604051634b637e8f60e11b8152600060048201526024016103c4565b6001600160a01b0382166104ba5760405163ec442f0560e01b8152600060048201526024016103c4565b6103e3838383610685565b6005546001600160a01b031633146103625760405163118cdaa760e01b81523360048201526024016103c4565b6001600160a01b03821661051c5760405163ec442f0560e01b8152600060048201526024016103c4565b61033f60008383610685565b6001600160a01b03821661055257604051634b637e8f60e11b8152600060048201526024016103c4565b61033f82600083610685565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0384166105da5760405163e602df0560e01b8152600060048201526024016103c4565b6001600160a01b03831661060457604051634a1406b160e11b8152600060048201526024016103c4565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561046057826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161067791815260200190565b60405180910390a350505050565b6001600160a01b0383166106b05780600260008282546106a59190610927565b909155506107229050565b6001600160a01b038316600090815260208190526040902054818110156107035760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016103c4565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661073e5760028054829003905561075d565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516107a291815260200190565b60405180910390a3505050565b600060208083528351808285015260005b818110156107dc578581018301518582016040015282016107c0565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461081457600080fd5b919050565b6000806040838503121561082c57600080fd5b610835836107fd565b946020939093013593505050565b60008060006060848603121561085857600080fd5b610861846107fd565b925061086f602085016107fd565b9150604084013590509250925092565b60006020828403121561089157600080fd5b5035919050565b6000602082840312156108aa57600080fd5b6108b3826107fd565b9392505050565b600080604083850312156108cd57600080fd5b6108d6836107fd565b91506108e4602084016107fd565b90509250929050565b600181811c9082168061090157607f821691505b60208210810361092157634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561030357634e487b7160e01b600052601160045260246000fdfea164736f6c6343000814000aa164736f6c6343000814000a";

type LUXSalePreInitTestsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LUXSalePreInitTestsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LUXSalePreInitTests__factory extends ContractFactory {
  constructor(...args: LUXSalePreInitTestsConstructorParams) {
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
      LUXSalePreInitTests & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): LUXSalePreInitTests__factory {
    return super.connect(runner) as LUXSalePreInitTests__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LUXSalePreInitTestsInterface {
    return new Interface(_abi) as LUXSalePreInitTestsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): LUXSalePreInitTests {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as LUXSalePreInitTests;
  }
}
