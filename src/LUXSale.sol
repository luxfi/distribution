// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LUXSale is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    ERC20Burnable public LUX;            // The LUX token itself
    uint256 public totalSupply;          // Total LUX amount created
    uint256 public foundersAllocation;   // Amount given to founders
    string public foundersKey;           // Public key of founders

    uint256 public openTime;             // Time of window 0 opening
    uint256 public createFirstDay;       // Tokens sold in window 0

    uint256 public startTime;            // Time of window 1 opening
    uint256 public numberOfDays;         // Number of windows after 0
    uint256 public createPerDay;         // Tokens sold in each window

    uint256 public basePrice;            // Base price of LUX in USD (0.00011 USD)
    uint256 public priceIncreaseRate;    // Daily price increase rate (1%)

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
    ) {
        numberOfDays = _numberOfDays;
        totalSupply = _totalSupply;
        openTime = _openTime;
        startTime = _startTime;
        foundersAllocation = _foundersAllocation;
        foundersKey = _foundersKey;

        basePrice = _basePrice; // Set base price to 0.00011 USD (in smallest unit)
        priceIncreaseRate = _priceIncreaseRate; // Set daily increase rate to 1%

        createFirstDay = totalSupply.mul(20).div(100); // 20% allocation for the first day
        createPerDay = totalSupply.sub(foundersAllocation).sub(createFirstDay).div(numberOfDays);

        require(numberOfDays > 0, "Invalid number of days");
        require(totalSupply > foundersAllocation, "Founders allocation too high");
        require(openTime < startTime, "Open time should be less than start time");
    }

    function initialize(ERC20Burnable _luxToken) external onlyOwner {
        require(address(LUX) == address(0), "Already initialized");
        require(_luxToken.totalSupply() == 0, "Token must have zero supply initially");

        LUX = _luxToken;
        LUX.mint(address(this), totalSupply);

        // Allocate to founders and mark key
        LUX.transfer(0xb1, foundersAllocation);
        keys[0xb1] = foundersKey;
        emit LogRegister(0xb1, foundersKey);
    }

    function time() public view returns (uint256) {
        return block.timestamp;
    }

    function today() public view returns (uint256) {
        return dayFor(time());
    }

    function dayFor(uint256 timestamp) public view returns (uint256) {
        return timestamp < startTime ? 0 : (timestamp.sub(startTime)).div(23 hours) + 1;
    }

    function createOnDay(uint256 day) public view returns (uint256) {
        return day == 0 ? createFirstDay : createPerDay;
    }

    function getCurrentPriceFloor(uint256 day) public view returns (uint256) {
        return basePrice.mul((100 + priceIncreaseRate)**day).div(100**day);
    }

    function buyWithLimit(uint256 day, uint256 limit, uint256 currentPrice) public payable nonReentrant {
        require(time() >= openTime && today() <= numberOfDays, "Auction not open");
        require(msg.value >= 0.01 ether, "Minimum ETH not met");
        require(day >= today() && day <= numberOfDays, "Invalid day");

        uint256 minPriceFloor = getCurrentPriceFloor(day);
        require(currentPrice >= minPriceFloor, "Price below floor");

        userBuys[day][msg.sender] = userBuys[day][msg.sender].add(msg.value);
        dailyTotals[day] = dailyTotals[day].add(msg.value);

        if (limit != 0) {
            require(dailyTotals[day] <= limit, "Daily limit exceeded");
        }

        emit LogBuy(day, msg.sender, msg.value);
    }

    function buy() external payable {
        buyWithLimit(today(), 0, getCurrentPriceFloor(today()));
    }

    function claim(uint256 day) public nonReentrant {
        require(today() > day, "Cannot claim yet");

        if (claimed[day][msg.sender] || dailyTotals[day] == 0) {
            return;
        }

        uint256 dailyTotal = dailyTotals[day];
        uint256 userTotal = userBuys[day][msg.sender];
        uint256 price = createOnDay(day).mul(1e18).div(dailyTotal);
        uint256 reward = price.mul(userTotal).div(1e18);

        claimed[day][msg.sender] = true;
        LUX.transfer(msg.sender, reward);

        emit LogClaim(day, msg.sender, reward);
    }

    function claimAll() external {
        for (uint256 i = 0; i < today(); i++) {
            claim(i);
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
        payable(owner()).transfer(address(this).balance);
        emit LogCollect(address(this).balance);
    }

    function freeze() external onlyOwner {
        require(today() > numberOfDays + 1, "Cannot freeze yet");
        LUX.burn(LUX.balanceOf(address(this)));
        emit LogFreeze();
    }
}
