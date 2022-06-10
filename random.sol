// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

contract Random{
    function random() private view returns (uint8){
        return uint8(uint256(keccak256(block.timestamp,block.difficulty))%100);
    }
}