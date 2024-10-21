// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Airdrop is Ownable, ReentrancyGuard {
    event EthAirdropComplete(address[] recipients, uint256[] amounts);
    event TokenAirdropComplete(address token, address[] recipients, uint256[] amounts);
    
    constructor() Ownable(msg.sender) {
    }

    // For ETH airdrop
    function airdropEth(
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) external payable onlyOwner nonReentrant {
        require(_recipients.length == _amounts.length, "Length mismatch");
        require(_recipients.length > 0, "Empty arrays");
        
        uint256 totalAmount;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        require(msg.value == totalAmount, "Incorrect ETH amount");

        for (uint256 i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0), "Invalid address");
            (bool success, ) = _recipients[i].call{value: _amounts[i]}("");
            require(success, "ETH transfer failed");
        }

        emit EthAirdropComplete(_recipients, _amounts);
    }

    // For ERC20 token airdrop
    function airdropToken(
        address _token,
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) external onlyOwner nonReentrant {
        require(_recipients.length == _amounts.length, "Length mismatch");
        require(_recipients.length > 0, "Empty arrays");
        require(_token != address(0), "Invalid token address");

        IERC20 token = IERC20(_token);
        
        uint256 totalAmount;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        require(
            token.allowance(msg.sender, address(this)) >= totalAmount,
            "Insufficient allowance"
        );

        for (uint256 i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0), "Invalid address");
            require(
                token.transferFrom(msg.sender, _recipients[i], _amounts[i]),
                "Token transfer failed"
            );
        }

        emit TokenAirdropComplete(_token, _recipients, _amounts);
    }
    // To transfer ownership to a new address
    function transferToNewOwner(address newOwner) external onlyOwner {
        transferOwnership(newOwner);
    }
}