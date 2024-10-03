// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LUXSale.sol"; // Assume you have migrated the LUXSale contract to Solidity ^0.8.x

contract LUXSaleUtil {
    LUXSale public sale;

    constructor(LUXSale _sale) {
        sale = _sale;
    }

    function dailyTotals() external view returns (uint256[369] memory result) {
        for (uint256 i = 0; i < 369; i++) {
            result[i] = sale.dailyTotals(i);
        }
    }

    function userBuys(address user) external view returns (uint256[369] memory result) {
        for (uint256 i = 0; i < 369; i++) {
            result[i] = sale.userBuys(i, user);
        }
    }

    function userClaims(address user) external view returns (bool[369] memory result) {
        for (uint256 i = 0; i < 369; i++) {
            result[i] = sale.claimed(i, user);
        }
    }
}
