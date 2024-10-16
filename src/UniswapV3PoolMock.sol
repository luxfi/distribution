// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UniswapV3PoolMock {
    address public token0;
    address public token1;

    uint256 public mockPrice;

    constructor(address _token0, address _token1) {
        token0 = _token0;
        token1 = _token1;
    }

    function setMockPrice(uint256 _mockPrice) external {
        mockPrice = _mockPrice;
    }

    function observe(uint32[] calldata secondsAgos)
        external
        view
        returns (int56[] memory tickCumulatives, uint160[] memory secondsPerLiquidityCumulativeX128s)
    {
        tickCumulatives = new int56[](secondsAgos.length);
        secondsPerLiquidityCumulativeX128s = new uint160[](secondsAgos.length);

        // Return mock tick cumulative values based on mockPrice
        for (uint256 i = 0; i < secondsAgos.length; i++) {
            tickCumulatives[i] = int56(int256(mockPrice));
            secondsPerLiquidityCumulativeX128s[i] = 0;
        }
    }
}
