// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@safe-global/safe-contracts/contracts/Safe.sol";
import "@safe-global/safe-contracts/contracts/proxies/SafeProxyFactory.sol";
import "@safe-global/safe-contracts/contracts/common/Enum.sol";
import "./LUXSale.sol";
import "./LUXToken.sol";

contract SafeUser {
    Safe public safe;

    function addSafe(Safe _safe) external {
        safe = _safe;
    }

    function doConfirm(uint256 id) external {
        safe.approveHash(bytes32(id));
    }
}

contract SafeTests {
    TestableLUXSale public sale;
    SafeUser public user1;
    SafeUser public user2;
    Safe public safe;

    function setUp() external {
        string memory x = "founderKey";

        sale = new TestableLUXSale(
            5,
            156.25 ether,
            block.timestamp,
            block.timestamp + 1 days,
            10 ether,
            x,
            0.00011 ether, // basePrice
            1              // priceIncreaseRate
        );

        sale.addTime(1 days);

        user1 = new SafeUser();
        user2 = new SafeUser();

        address[] memory members = new address[](3);
        members[0] = address(user1);
        members[1] = address(user2);
        members[2] = address(this);

        // Create safe wallet with members using SafeProxyFactory
        SafeProxyFactory proxyFactory = new SafeProxyFactory();
        bytes memory safeSetupData = abi.encodeWithSignature(
            "setup(address[],uint256,address,bytes,address,address,uint256,address)",
            members,
            2,
            address(0),
            "",
            address(0),
            address(0),
            0,
            address(0)
        );

        uint256 saltNonce = 0; // Use an appropriate salt nonce
        SafeProxy safeProxy = proxyFactory.createProxyWithNonce(address(new Safe()), safeSetupData, saltNonce);
        address safeAddress = address(safeProxy);
        Safe setupSafe = Safe(payable(safeAddress));

        safe = setupSafe;
        user1.addSafe(safe);
        user2.addSafe(safe);
    }

    function testRegister() public {
        bytes memory encodedData = abi.encodeWithSignature("register(string)", "abc");

        bool success = safe.execTransaction(
            address(sale),
            0,
            encodedData,
            Enum.Operation.Call,
            0,
            0,
            0,
            payable(0),
            payable(0),
            ""
        );
        require(success, "Transaction failed");
    }
}

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
        uint256 currentPrice = sale.getCurrentPriceFloor(window);
        sale.buyWithLimit{value: msg.value}(window, limit, currentPrice);
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

contract TestOwner is Ownable, ReentrancyGuard {
    TestableLUXSale public sale;

    constructor(TestableLUXSale _sale) Ownable(msg.sender) {
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
        string memory _foundersKey,
        uint256 _basePrice,
        uint256 _priceIncreaseRate
    )
        LUXSale(
            _numberOfDays,
            _totalSupply,
            _openTime,
            _startTime,
            _foundersAllocation,
            _foundersKey,
            _basePrice,
            _priceIncreaseRate
        )
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
    LUXToken public LUX;
    TestUser public user1;
    TestUser public user2;
    TestOwner public owner;
    uint256 public window;

    function setUp() external {
        string memory x = "founderKey";

        LUX = new LUXToken("LUX Token", "LUX");
        window = 0;

        sale = new TestableLUXSale(
            5,
            156.25 ether,
            block.timestamp,
            block.timestamp + 1 days,
            10 ether,
            x,
            0.00011 ether, // basePrice
            1              // priceIncreaseRate
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
        uint256 currentPrice = sale.getCurrentPriceFloor(0);
        sale.buyWithLimit{value: 1 ether}(0, 2 ether, currentPrice);
    }

    function testFailBuyOverLimit() public {
        user1.doBuy(1 ether);
        uint256 currentPrice = sale.getCurrentPriceFloor(0);
        sale.buyWithLimit{value: 1 ether}(0, 1.5 ether, currentPrice);
    }

    function testBuyLaterWindow() public {
        uint256 currentPrice = sale.getCurrentPriceFloor(3);
        sale.buyWithLimit{value: 1 ether}(3, 2 ether, currentPrice);
    }

    function testFailBuyTooLate() public {
        addTime();
        uint256 currentPrice = sale.getCurrentPriceFloor(0);
        sale.buyWithLimit{value: 1 ether}(0, 0, currentPrice);
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
            x,
            0.00011 ether, // basePrice
            1              // priceIncreaseRate
        );

        user1 = new TestUser(sale);
        payable(address(user1)).transfer(100 ether);
        sale.addTime(1 days);
    }

    function testFailTokenAuthority() public {
        LUXToken LUX = new LUXToken("LUX Token", "LUX");
        sale.initialize(LUX);
    }
}
