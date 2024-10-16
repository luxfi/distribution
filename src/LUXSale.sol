// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./WLUX.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol"; // For TWAP calculations
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol"; // Safe token transfers

/**
 * @title LUXSale Contract
 * @dev Handles contributions, calculates USD value using Uniswap V3 24-hour TWAP,
 *      and distributes WLUX tokens based on contributions.
 */
contract LUXSale is Ownable, ReentrancyGuard {
    /// @notice The WLUX token contract
    WLUX public WLUXToken;

    /// @notice Total WLUX tokens allocated for sale
    uint256 public totalWLUXForSale;

    /// @notice Sale opening time
    uint256 public openTime;

    /// @notice Start time for daily auction windows
    uint256 public startTime;

    /// @notice Total number of auction windows (days)
    uint256 public numberOfDays;

    /// @notice List of accepted ERC20 tokens for contributions
    address[] public acceptedTokens;

    /// @notice Mapping of accepted tokens for quick lookup
    mapping(address => bool) public tokenWhitelist;

    /// @notice Mapping from token address to its corresponding Uniswap V3 pool address
    mapping(address => address) public tokenToPool;

    /// @notice Data structure to hold window-specific totals
    struct WindowData {
        uint256 totalUSD;       // Total USD equivalent contributions in the window
        uint256 unsoldWLUX;     // Amount of WLUX left unsold at window end
    }

    /// @notice Mapping of window number to its data
    mapping(uint256 => WindowData) public windowTotals;

    /// @notice Mapping of window number to user address to their USD contributions
    mapping(uint256 => mapping(address => uint256)) public userContributionsUSD;

    /// @notice Mapping of user address to their total USD contributions across all windows
    mapping(address => uint256) public userTotalContributedUSD;

    /// @notice Mapping of window number to token address to total token contributions
    mapping(uint256 => mapping(address => uint256)) public tokenContributions;

    /// @notice Event emitted when liquidity is added to LUX LP
    event LogAddToLUXLP(uint256 indexed window, uint256 amount);

    /// @notice Event emitted when liquidity is added
    event LogLiquidity(uint256 indexed window, uint256 tokenAmount, address token);

    /// @notice Event emitted when a user contributes
    event LogBuy(uint256 indexed window, address indexed user, address token, uint256 amount, uint256 usdValue);

    /// @notice Event emitted when a user claims WLUX tokens
    event LogClaim(uint256 indexed window, address indexed user, uint256 amount);

    /**
     * @dev Constructor to initialize the LUXSale contract.
     * @param _numberOfDays Total number of auction windows (days).
     * @param _totalWLUXForSale Total WLUX tokens allocated for sale.
     * @param _openTime Sale opening time (Unix timestamp).
     * @param _startTime Start time for daily auction windows (Unix timestamp).
     */
    constructor(
        uint256 _numberOfDays,
        uint256 _totalWLUXForSale,
        uint256 _openTime,
        uint256 _startTime
    ) Ownable() {
        require(_numberOfDays > 0, "Invalid number of days");
        require(_totalWLUXForSale > 0, "Invalid total WLUX for sale");

        numberOfDays = _numberOfDays;
        totalWLUXForSale = _totalWLUXForSale;
        openTime = _openTime;
        startTime = _startTime;
    }

    /**
     * @dev Initializes the WLUX token contract.
     * @param _wlux Address of the WLUX token contract.
     */
    function initialize(WLUX _wlux) external onlyOwner {
        require(address(WLUXToken) == address(0), "Already initialized");
        WLUXToken = _wlux;
    }

    /**
     * @dev Sets the token whitelist and their corresponding Uniswap V3 pool addresses.
     * @param tokens Array of token addresses to accept.
     * @param pools Array of Uniswap V3 pool addresses corresponding to the tokens.
     */
    function setTokenWhitelist(address[] calldata tokens, address[] calldata pools) external onlyOwner {
        require(tokens.length == pools.length, "Tokens and pools length mismatch");
        for (uint256 i = 0; i < tokens.length; i++) {
            acceptedTokens.push(tokens[i]);
            tokenWhitelist[tokens[i]] = true;
            tokenToPool[tokens[i]] = pools[i];
        }
    }

    /**
     * @dev Allows users to contribute tokens during an auction window.
     * @param window The auction window number.
     * @param token The address of the token being contributed.
     * @param amount The amount of tokens being contributed.
     */
    function contribute(uint256 window, address token, uint256 amount) external nonReentrant {
        require(tokenWhitelist[token], "Token not accepted");
        require(block.timestamp >= openTime, "Sale not open yet");
        require(block.timestamp < startTime + (window * 1 days), "Window closed");

        // Transfer the token from the user to the contract
        TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);

        // Calculate the USD value of the contributed tokens
        uint256 usdValue = convertToUSD(token, amount);
        require(usdValue > 0, "Invalid USD value");

        // Update contribution mappings
        tokenContributions[window][token] += amount;
        userTotalContributedUSD[msg.sender] += usdValue;
        windowTotals[window].totalUSD += usdValue;
        userContributionsUSD[window][msg.sender] += usdValue;

        emit LogBuy(window, msg.sender, token, amount, usdValue);
    }

    /**
     * @dev Converts a token amount to its USD equivalent using Uniswap V3 24-hour TWAP.
     * @param token The address of the token to convert.
     * @param amount The amount of the token.
     * @return usdValue The USD equivalent value.
     */
    function convertToUSD(address token, uint256 amount) public view returns (uint256 usdValue) {
        address poolAddress = tokenToPool[token];
        require(poolAddress != address(0), "No pool for this token");

        // Get the 24-hour TWAP price of the token in terms of LUSD/LUX
        uint32 secondsAgo = 86400; // 24 hours
        uint160 sqrtPriceX96 = getTWAP(poolAddress, secondsAgo);

        // Convert sqrtPriceX96 to price
        uint256 priceX96 = uint256(sqrtPriceX96) * uint256(sqrtPriceX96) >> (96 * 2 - 96);

        // Adjust for decimals
        uint8 tokenDecimals = IERC20(token).decimals();
        usdValue = (amount * priceX96) / (1 << 96) / (10 ** tokenDecimals);
    }

    /**
     * @dev Retrieves the 24-hour TWAP from the Uniswap V3 pool.
     * @param poolAddress The address of the Uniswap V3 pool.
     * @param _secondsAgo The number of seconds in the past to start the TWAP calculation.
     * @return sqrtPriceX96 The square root of the price as a Q64.96 value.
     */
    function getTWAP(address poolAddress, uint32 _secondsAgo) internal view returns (uint160 sqrtPriceX96) {
        require(_secondsAgo != 0, "Seconds ago cannot be zero");

        IUniswapV3Pool pool = IUniswapV3Pool(poolAddress);

        uint32;
        secondsAgos[0] = _secondsAgo;
        secondsAgos[1] = 0;

        (int56[] memory tickCumulatives, ) = pool.observe(secondsAgos);

        int56 tickCumulativesDelta = tickCumulatives[1] - tickCumulatives[0];
        uint32 timeDelta = _secondsAgo;

        int24 arithmeticMeanTick = int24(tickCumulativesDelta / int56(int32(timeDelta)));
        // Always round to negative infinity
        if (tickCumulativesDelta < 0 && (tickCumulativesDelta % int56(int32(timeDelta)) != 0)) {
            arithmeticMeanTick--;
        }

        // Get the sqrt price from the mean tick
        sqrtPriceX96 = OracleLibrary.getSqrtRatioAtTick(arithmeticMeanTick);
    }

    /**
     * @dev Allows users to claim their WLUX tokens after the auction window has closed.
     * @param window The auction window number.
     */
    function claim(uint256 window) external nonReentrant {
        require(block.timestamp > startTime + (window * 1 days), "Claim period not started");

        uint256 userUSDContribution = userContributionsUSD[window][msg.sender];
        require(userUSDContribution > 0, "No contributions to claim");

        uint256 totalWindowUSD = windowTotals[window].totalUSD;
        uint256 wluxAmount = (userUSDContribution * totalWLUXForSale) / totalWindowUSD;

        // Transfer WLUX tokens to the user
        WLUXToken.transfer(msg.sender, wluxAmount);

        // Reset the user's USD contributions for the window
        userContributionsUSD[window][msg.sender] = 0;

        emit LogClaim(window, msg.sender, wluxAmount);
    }

    /**
     * @dev Allows the owner to add liquidity to the LUX LP.
     * @param window The auction window number.
     * @param tokenAmount The amount of tokens to add to the liquidity pool.
     * @param token The address of the token being added.
     */
    function addLiquidity(uint256 window, uint256 tokenAmount, address token) external onlyOwner {
        uint256 usdValue = convertToUSD(token, tokenAmount);
        windowTotals[window].unsoldWLUX = usdValue / 3;

        emit LogAddToLUXLP(window, tokenAmount);
        emit LogLiquidity(window, tokenAmount, token);
    }
}
