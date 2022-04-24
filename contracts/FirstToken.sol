//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FirstToken {
    uint _totalSupply;
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;

    constructor(uint256 total) {
        _totalSupply = total;
        balances[msg.sender] = _totalSupply;
    }

    event Transfer(address sender, address recipient, uint256 amount);
    event Approval(address sender, address delegate, uint256 amount);

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256){
        return balances[account];
    }

    function transfer(address recipient,uint256 amount) public returns (bool) {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - amount;
        balances[recipient] = balances[recipient] + amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address spender, address delegate) public view returns (uint256) {
        return allowed[spender][delegate];
    }

    function approve(address delegate, uint256 amount) public returns (bool) {
        allowed[msg.sender][delegate] = amount;
        emit Approval(msg.sender, delegate, amount);
        return true;
    }

    function transferFrom(address owner, address recipient, uint256 amount) public returns (bool) {
        require(amount <= allowed[owner][msg.sender]);
        require(amount <= balances[owner]);
        balances[recipient] = balances[recipient] + amount;
        balances[owner] = balances[owner] - amount;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - amount;
        emit Transfer(owner, recipient, amount);
        return true;
    }
}
