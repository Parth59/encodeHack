// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, Ownable {
    // Mapping from address to string
    mapping(address => string) private addressToString;
    
    // Event emitted when string is updated
    event StringUpdated(address indexed user, string newString);

    constructor() ERC20("TalentProtocol-V2", "TP2") Ownable(msg.sender) {
        // Mint initial supply to owner (e.g., 1 million tokens)
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // Function to set string for an address
    function setString(address _address, string memory _str) public {
        addressToString[_address] = _str;
        emit StringUpdated(_address, _str);
    }

    // Function to get string for an address
    function getString(address _address) public view returns (string memory) {
        return addressToString[_address];
    }

    // Optional: Function to mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}