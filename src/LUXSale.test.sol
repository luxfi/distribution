// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TestUser is ReentrancyGuard {
    TestableLUXSale public sale;

    constructor(TestableLUXSale _sale) {
        sale = _sale;
    }

    receive() external payable {}

    function doBuy(uint256 wad) external payable nonReentrant {
        require(msg.value == wad, "Value mismatch");
        sale.buy{value: msg.value}();
    }

    function doBuyWithLimit(uint256 wad, uint256 window, uint256 limit) external payable nonReentrant {
        require(msg.value == wad, "Value mismatch");
        sale.buyWithLimit{value: msg.value}(window, limit);
    }

    function doClaim(uint256 window) external nonReentrant {
        sale.claim(window);
    }

    function doFreeze() external nonReentrant {
        sale.freeze();
    }

    function doExec(uint256 wad) external nonReentrant {
        (bool success, ) = address(sale).call{value: wad}("");
        require(success, "Execution failed");
    }
}

contract TestOwner is Ownable {
    TestableLUXSale public sale;

    constructor(TestableLUXSale _sale) {
        sale = _sale;
    }

    receive() external payable {}

    function doCollect() external onlyOwner nonReentrant {
        sale.collect();
    }
}

contract TestableLUXSale is LUXSale {
    uint256 public localTime;

    constructor(
        uint256 _numberOfDays,
        uint256 _totalSupply,
        uint256 _openTime,
        uint256 _startTime,
        uint256 _foundersAllocation,
        string memory _foundersKey
    )
        LUXSale(_numberOfDays, _totalSupply, _openTime, _startTime, _foundersAllocation, _foundersKey)
    {}

    function time() public view override returns (uint256) {
        return localTime;
    }

    function addTime(uint256 extra) external onlyOwner {
        localTime += extra;
    }
}

contract LUXSaleTest {
    TestableLUXSale public sale;
    ERC20Burnable public LUX;
    TestUser public user1;
    TestUser public user2;
    TestOwner public owner;
    uint256 public window;

    function setUp() external {
        string memory x = "founderKey";

        LUX = new ERC20Burnable();
        window = 0;

        sale = new TestableLUXSale(
            5,
            156.25 ether,
            block.timestamp,
            block.timestamp + 1 days,
            10 ether,
            x
        );

        sale.initialize(LUX);

        user1 = new TestUser(sale);
        user2 = new TestUser(sale);
        owner = new TestOwner(sale);

        payable(address(user1)).transfer(100 ether);
        payable(address(user2)).transfer(100 ether);
    }

    function addTime() public {
        sale.addTime(1 days);
    }

    function nextRound(uint256 wad, uint256 wad1, uint256 wad2) public {
        if (wad != 0) sale.buy{value: wad}();
        if (wad1 != 0) user1.doBuy(wad1);
        if (wad2 != 0) user2.doBuy(wad2);

        addTime();

        sale.claim(window);
        user1.doClaim(window);
        user2.doClaim(window);

        window++;
    }

    function testBuy() public {
        sale.buy{value: 1 ether}();
    }

    function testBuyWithLimit() public {
        sale.buyWithLimit{value: 1 ether}(0, 2 ether);
    }

    function testFailBuyOverLimit() public {
        user1.doBuy(1 ether);
        sale.buyWithLimit{value: 1 ether}(0, 1.5 ether);
    }

    function testBuyLaterWindow() public {
        sale.buyWithLimit{value: 1 ether}(3, 2 ether);
    }

    function testFailBuyTooLate() public {
        addTime();
        sale.buyWithLimit{value: 1 ether}(0, 0);
    }

    function testBuyFirstDay() public {
        sale.buy{value: 1 ether}();
        sale.addTime(1 days);
        sale.claim(0);
    }

    function testFreeze() public {
        nextRound(1 ether, 0, 0);
        addTime();
        user1.doFreeze();
    }

    function testCollect() public {
        nextRound(1 ether, 0, 0);
        owner.doCollect();
    }

    function testMultiUserAsymmetricBid() public {
        nextRound(1 ether, 9 ether, 0);
    }
}

contract LUXSalePreInitTests {
    TestableLUXSale public sale;
    TestUser public user1;

    function setUp() external {
        string memory x = "founderKey";

        sale = new TestableLUXSale(
            5,
            156.25 ether,
            block.timestamp,
            block.timestamp + 1 days,
            10 ether,
            x
        );

        user1 = new TestUser(sale);
        payable(address(user1)).transfer(100 ether);
        sale.addTime(1 days);
    }

    function testFailTokenAuthority() public {
        ERC20Burnable LUX = new ERC20Burnable();
        sale.initialize(LUX);
    }
}

contract MultisigUser {
    MultiSigWallet public multisig;

    function addMultisig(MultiSigWallet _multisig) external {
        multisig = _multisig;
    }

    function doConfirm(uint256 id) external {
        multisig.confirmTransaction(id);
    }
}

contract MultisigTests {
    TestableLUXSale public sale;
    MultisigUser public user1;
    MultisigUser public user2;
    MultiSigWallet public multisig;

    function setUp() external {
        string memory x = "founderKey";

        sale = new TestableLUXSale(
            5,
            156.25 ether,
            block.timestamp,
            block.timestamp + 1 days,
            10 ether,
            x
        );

        sale.addTime(block.timestamp + 1);

        user1 = new MultisigUser();
        user2 = new MultisigUser();

        address;
        members[0] = address(user1);
        members[1] = address(user2);
        members[2] = address(this);

        multisig = new MultiSigWallet(members, 2);
        user1.addMultisig(multisig);
    }

    function testRegister() public {
        bytes memory calldata = abi.encodeWithSignature("register(string)", "abc");
        uint256 id = multisig.submitTransaction(address(sale), 0, calldata);
        user1.doConfirm(id);
    }
}
