// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

uint256 constant TOTAL_SUPPLY = 200_000_000 ether;
string constant DESCRIPTION = "Test token";
string constant TICKER = "TEST";

contract Token is ERC20, ERC20Burnable {
    constructor() ERC20(DESCRIPTION, TICKER) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}
