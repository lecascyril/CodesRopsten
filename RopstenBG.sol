// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

contract RopstenBG {

    address ropstenAddr;

    function setAddr(address _addr) public {
        ropstenAddr = _addr; 
    }


    function balance1() public view returns (uint)  {
        return(ropstenAddr.balance);
    }

    function balance2(address _addr) public view returns (uint) {
        return(_addr.balance);
    }

    function sendEth(address _addr) public payable {
        require (msg.value>0,"tu n'envoie rien");
        if(msg.value==0 ){
            revert("c pa bon");
        }
        _addr.call{value: msg.value}("");
    }

}