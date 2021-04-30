pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Erc20 is ERC20 {
  constructor() ERC20('ERC Sample', 'ERC sample token') {
    _mint(msg.sender, 100000);
  }
}
