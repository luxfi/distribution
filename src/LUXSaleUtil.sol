// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./LUXSale.sol";

contract LUXSaleUtil {
    LUXSale public sale;

    constructor(LUXSale _sale) {
        sale = _sale;
    }

    // Retrieve daily totals across all 369 auction days
    function dailyTotals() external view returns (uint256[369] memory result) {
        for (uint256 i = 0; i < 369; i++) {
            result[i] = sale.getWindowTotalUSD(i);
        }
    }

    // Retrieve each user's daily contributions across all auction days
    function userBuys(address user) external view returns (uint256[369] memory result) {
        for (uint256 i = 0; i < 369; i++) {
            result[i] = sale.userBuys(i, user);
        }
    }

    // Retrieve claim status for each day across the entire auction period
    // function userClaims(address user) external view returns (bool[369] memory result) {
    //     for (uint256 i = 0; i < 369; i++) {
    //         result[i] = sale.claimed(i, user);
    //     }
    // }

    // Retrieve remaining tokens to be burned, distributed, or allocated to LP pools
    function unsoldTokens() external view returns (uint256[369] memory result) {
        for (uint256 i = 0; i < 369; i++) {
            result[i] = sale.unsoldTokens(i);
        }
    }
}
