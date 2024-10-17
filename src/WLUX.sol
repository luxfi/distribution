// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title WLUX Token Contract
 * @dev ERC20 token representing Wrapped LUX (WLUX) for testing purposes.
 *      On mainnet, this contract will point to the real WLUX contract.
 */
contract WLUX is ERC20 {
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor(uint256 initialSupply) ERC20("Wrapped LUX", "WLUX") {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Mint new WLUX tokens.
     * @param to The address to receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    /**
     * @dev Burn WLUX tokens from an address.
     * @param from The address to burn tokens from.
     * @param amount The amount of tokens to burn.
     */
    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
