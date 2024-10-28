// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";

interface IUniswapV3Router {
    function addLiquidity(
        address token0,
        address token1,
        uint24 fee,
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min,
        address recipient,
        uint256 deadline
    ) external returns (uint256 amount0, uint256 amount1);
}
interface IERC20Extended is IERC20 {
    function decimals() external view returns (uint8);
}

contract LUXSale is Ownable, ReentrancyGuard {
    IERC20 public WLUXToken;
    IUniswapV3Router public immutable router;

    uint256 public totalWLUXForSale;
    uint256 public openTime;
    uint256 public startTime;
    uint256 public numberOfDays;

    address[] public acceptedTokens;
    mapping(address => bool) public tokenWhitelist;
    mapping(address => address) public tokenToPool;

    struct WindowData {
        uint256 totalUSD;
        uint256 unsoldWLUX;
    }

    mapping(uint256 => WindowData) public windowTotals;
    mapping(uint256 => mapping(address => uint256)) public userContributionsUSD;
    mapping(address => uint256) public userTotalContributedUSD;
    mapping(uint256 => mapping(address => uint256)) public tokenContributions;

    event LogAddToLUXLP(uint256 indexed window, uint256 amount);
    event LogLiquidity(uint256 indexed window, uint256 tokenAmount, address token);
    event LogBuy(uint256 indexed window, address indexed user, address token, uint256 amount, uint256 usdValue);
    event LogClaim(uint256 indexed window, address indexed user, uint256 amount);

    constructor(
        address _wluxToken,
        address _router,
        uint256 _numberOfDays,
        uint256 _totalWLUXForSale,
        uint256 _openTime,
        uint256 _startTime
    ) {
        require(_wluxToken != address(0), "Invalid WLUX address");
        require(_router != address(0), "Invalid router address");
        require(_numberOfDays > 0, "Invalid days");
        require(_totalWLUXForSale > 0, "Invalid WLUX amount");
        require(_startTime > _openTime, "Invalid timing");

        WLUXToken = IERC20(_wluxToken);
        router = IUniswapV3Router(_router);
        numberOfDays = _numberOfDays;
        totalWLUXForSale = _totalWLUXForSale;
        openTime = _openTime;
        startTime = _startTime;
    }

    function setTokenWhitelist(address[] calldata tokens, address[] calldata pools) external onlyOwner {
        require(tokens.length == pools.length, "Length mismatch");
        for (uint256 i = 0; i < tokens.length; i++) {
            require(tokens[i] != address(0) && pools[i] != address(0), "Invalid address");
            acceptedTokens.push(tokens[i]);
            tokenWhitelist[tokens[i]] = true;
            tokenToPool[tokens[i]] = pools[i];
        }
    }

    function getCurrentWindow() public view returns (uint256) {
        if (block.timestamp < startTime) return 0;
        return (block.timestamp - startTime) / 1 days;
    }

    function contribute(uint256 window, address token, uint256 amount) external nonReentrant {
        require(tokenWhitelist[token], "Token not accepted");
        require(block.timestamp >= openTime, "Sale not open");
        require(block.timestamp < startTime + (window * 1 days), "Window closed");

        uint256 usdValue = convertToUSD(token, amount);
        require(usdValue > 0, "Invalid USD value");

        TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);

        tokenContributions[window][token] += amount;
        userTotalContributedUSD[msg.sender] += usdValue;
        windowTotals[window].totalUSD += usdValue;
        userContributionsUSD[window][msg.sender] += usdValue;

        emit LogBuy(window, msg.sender, token, amount, usdValue);
    }

    function claim(uint256 window) external nonReentrant {
        require(block.timestamp > startTime + (window * 1 days), "Claim not started");

        uint256 userUSDContribution = userContributionsUSD[window][msg.sender];
        require(userUSDContribution > 0, "No contributions");

        uint256 totalWindowUSD = windowTotals[window].totalUSD;
        uint256 wluxAmount = (userUSDContribution * totalWLUXForSale) / totalWindowUSD;

        userContributionsUSD[window][msg.sender] = 0;
        require(WLUXToken.transfer(msg.sender, wluxAmount), "Transfer failed");

        emit LogClaim(window, msg.sender, wluxAmount);
    }

    function addLiquidityFullRange(
        address token0,
        address token1,
        uint24 feeTier,
        uint256 amount0Desired,
        uint256 amount1Desired
    ) external onlyOwner {
        require(token0 != address(0) && token1 != address(0), "Invalid tokens");
        
        TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amount0Desired);
        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amount1Desired);

        TransferHelper.safeApprove(token0, address(router), amount0Desired);
        TransferHelper.safeApprove(token1, address(router), amount1Desired);

        router.addLiquidity(
            token0,
            token1,
            feeTier,
            amount0Desired,
            amount1Desired,
            0,
            0,
            address(this),
            block.timestamp + 600
        );

        emit LogLiquidity(getCurrentWindow(), amount0Desired, token0);
        emit LogLiquidity(getCurrentWindow(), amount1Desired, token1);
    }

    function convertToUSD(address token, uint256 amount) public view returns (uint256) {
        address poolAddress = tokenToPool[token];
        require(poolAddress != address(0), "No pool for this token");

        uint32 secondsAgo = 86400;
        uint160 sqrtPriceX96 = getTWAP(poolAddress, secondsAgo);
        uint256 priceX96 = (uint256(sqrtPriceX96) * uint256(sqrtPriceX96)) >> (96 * 2 - 96);
        
        uint8 tokenDecimals = IERC20Extended(token).decimals();
        return (amount * priceX96) / (1 << 96) / (10 ** tokenDecimals);
    }

    function getTWAP(address poolAddress, uint32 secondsAgo) internal view returns (uint160) {
        (int24 arithmeticMeanTick,) = OracleLibrary.consult(poolAddress, secondsAgo);
        return TickMath.getSqrtRatioAtTick(arithmeticMeanTick);
    }

    function getWindowTotalUSD(uint256 windowIndex) external view returns (uint256) {
        return windowTotals[windowIndex].totalUSD;
    }

    function userBuys(uint256 window, address user) external view returns (uint256) {
        return userContributionsUSD[window][user];
    }

    function unsoldTokens(uint256 window) external view returns (uint256) {
        return windowTotals[window].unsoldWLUX;
    }
}
