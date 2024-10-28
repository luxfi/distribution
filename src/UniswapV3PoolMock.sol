// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract UniswapV3PoolMock {
    uint256 public mockPrice;
    address public immutable token0;
    address public immutable token1;
    
    constructor(address _token0, address _token1) {
        token0 = _token0;
        token1 = _token1;
        mockPrice = 1e18;
    }

    function observe(uint32[] calldata secondsAgos) external view returns (
        int56[] memory tickCumulatives,
        uint160[] memory secondsPerLiquidityCumulativeX128s
    ) {
        require(secondsAgos.length > 0, "Need at least one datapoint");
        
        tickCumulatives = new int56[](secondsAgos.length);
        secondsPerLiquidityCumulativeX128s = new uint160[](secondsAgos.length);
        
        for(uint i = 0; i < secondsAgos.length; i++) {
            // Create increasing cumulative ticks based on secondsAgo
            tickCumulatives[i] = int56(int256(mockPrice * (block.timestamp - secondsAgos[i])));
            secondsPerLiquidityCumulativeX128s[i] = uint160(mockPrice);
        }
        
        return (tickCumulatives, secondsPerLiquidityCumulativeX128s);
    }

    function setMockPrice(uint256 _mockPrice) external {
        mockPrice = _mockPrice;
    }

    function slot0() external view returns (
        uint160 sqrtPriceX96,
        int24 tick,
        uint16 observationIndex,
        uint16 observationCardinality,
        uint16 observationCardinalityNext,
        uint8 feeProtocol,
        bool unlocked
    ) {
        return (
            uint160(mockPrice),
            int24(int256(mockPrice)),
            0,
            2,
            2,
            0,
            true
        );
    }
}
