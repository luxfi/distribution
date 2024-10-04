// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./LUXToken.sol";

contract LUXSale is Ownable, ReentrancyGuard {
    LUXToken public LUX;                 // The LUX token itself
    uint256 public totalSupply;          // Total LUX amount created
    uint256 public foundersAllocation;   // Amount given to founders
    string public foundersKey;           // Public key of founders

    uint256 public openTime;             // Time of window 0 opening
    uint256 public createFirstDay;       // Tokens sold in window 0

    uint256 public startTime;            // Time of window 1 opening
    uint256 public numberOfDays;         // Number of windows after 0
    uint256 public createPerDay;         // Tokens sold in each window

    uint256 public basePrice;            // Base price of LUX in smallest unit
    uint256 public priceIncreaseRate;    // Daily price increase rate in percentage

    mapping(uint256 => uint256) public dailyTotals;
    mapping(uint256 => mapping(address => uint256)) public userBuys;
    mapping(uint256 => mapping(address => bool)) public claimed;
    mapping(address => string) public keys;

    event LogBuy(uint256 window, address indexed user, uint256 amount);
    event LogClaim(uint256 window, address indexed user, uint256 amount);
    event LogRegister(address indexed user, string key);
    event LogCollect(uint256 amount);
    event LogFreeze();

    constructor(
        uint256 _numberOfDays,
        uint256 _totalSupply,
        uint256 _openTime,
        uint256 _startTime,
        uint256 _foundersAllocation,
        string memory _foundersKey,
        uint256 _basePrice,
        uint256 _priceIncreaseRate
    ) Ownable(msg.sender) {
        require(_numberOfDays > 0, "Invalid number of days");
        require(_totalSupply > _foundersAllocation, "Founders allocation too high");
        require(_openTime < _startTime, "Open time should be less than start time");

        numberOfDays = _numberOfDays;
        totalSupply = _totalSupply;
        openTime = _openTime;
        startTime = _startTime;
        foundersAllocation = _foundersAllocation;
        foundersKey = _foundersKey;

        basePrice = _basePrice;
        priceIncreaseRate = _priceIncreaseRate;

        createFirstDay = (totalSupply * 20) / 100; // 20% allocation for the first day
        createPerDay = (totalSupply - foundersAllocation - createFirstDay) / numberOfDays;
    }

    function initialize(LUXToken _lux) external onlyOwner {
        require(address(LUX) == address(0), "Already initialized");
        require(_lux.totalSupply() == 0, "Token must have zero supply initially");

        LUX = _lux;
        LUX.mint(address(this), totalSupply);

        // Allocate to founders and register their key
        address foundersAddress = 0x9011E888251AB053B7bD1cdB598Db4f9DEd94714;
        LUX.transfer(foundersAddress, foundersAllocation);
        keys[foundersAddress] = foundersKey;
        emit LogRegister(foundersAddress, foundersKey);
    }

    function time() public view virtual returns (uint256) {
        return block.timestamp;
    }

    function today() public view returns (uint256) {
        return dayFor(time());
    }

    function dayFor(uint256 timestamp) public view returns (uint256) {
        return timestamp < startTime ? 0 : ((timestamp - startTime) / 1 days) + 1;
    }

    function createOnDay(uint256 day) public view returns (uint256) {
        return day == 0 ? createFirstDay : createPerDay;
    }

    function getCurrentPriceFloor(uint256 day) public view returns (uint256) {
        return (basePrice * ((100 + priceIncreaseRate) ** day)) / (100 ** day);
    }

    function buyWithLimit(uint256 day, uint256 limit, uint256 currentPrice) public payable nonReentrant {
        require(time() >= openTime && today() <= numberOfDays, "Auction not open");
        require(msg.value >= 0.01 ether, "Minimum ETH not met");
        require(day >= today() && day <= numberOfDays, "Invalid day");

        uint256 minPriceFloor = getCurrentPriceFloor(day);
        require(currentPrice >= minPriceFloor, "Price below floor");

        userBuys[day][msg.sender] += msg.value;
        dailyTotals[day] += msg.value;

        if (limit != 0) {
            require(dailyTotals[day] <= limit, "Daily limit exceeded");
        }

        emit LogBuy(day, msg.sender, msg.value);
    }

    function buy() external payable {
        uint256 day = today();
        uint256 currentPrice = getCurrentPriceFloor(day);
        buyWithLimit(day, 0, currentPrice);
    }

    function claim(uint256 day) public nonReentrant {
        require(today() > day, "Cannot claim yet");

        if (claimed[day][msg.sender] || dailyTotals[day] == 0) {
            return;
        }

        uint256 dailyTotal = dailyTotals[day];
        uint256 userTotal = userBuys[day][msg.sender];
        uint256 tokensAvailable = createOnDay(day);
        uint256 reward = (tokensAvailable * userTotal) / dailyTotal;

        claimed[day][msg.sender] = true;
        LUX.transfer(msg.sender, reward);

        emit LogClaim(day, msg.sender, reward);
    }

    function claimAll() external {
        uint256 currentDay = today();
        for (uint256 i = 0; i < currentDay; i++) {
            if (!claimed[i][msg.sender]) {
                claim(i);
            }
        }
    }

    function register(string memory key) external {
        require(today() <= numberOfDays + 1, "Registration closed");
        require(bytes(key).length <= 64, "Key too long");

        keys[msg.sender] = key;
        emit LogRegister(msg.sender, key);
    }

    function collect() external onlyOwner {
        require(today() > 0, "Cannot collect yet");
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
        emit LogCollect(balance);
    }

    function freeze() external onlyOwner {
        require(today() > numberOfDays + 1, "Cannot freeze yet");
        uint256 remainingTokens = LUX.balanceOf(address(this));
        LUX.burn(remainingTokens);
        emit LogFreeze();
    }
}
