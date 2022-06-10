// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

import  "./simplestorage.sol";

contract RopstenBG is SimpleStorage {

    address ropstenAddr; 
    string public bonjoure;
    uint  public depot;
    address owner;

    event ethReceived(uint amount, address sender);
    event ethReceivedWithData(uint amount, address sender);

    constructor() payable{
	    depot = msg.value;
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender== owner,"vous netes pas l'owner");
        _;
    }

    receive() external payable {
        emit ethReceived(msg.value, msg.sender );
    }

    fallback() external payable {
        emit ethReceivedWithData(msg.value, msg.sender);
    }

    function setAddr(address[] memory _addr) public onlyOwner {
        ropstenAddr = _addr[0]; 
    }

   function balance0() public view returns (uint)  {
        return(address(this).balance);
    }

    function balance1() private view returns (uint)  {
        return(address(this).balance);
    }

    function balance2(address _addr) public view returns (uint) {
        return(_addr.balance);
    }

    function recupBalance() view public onlyOwner returns  (uint){
        uint test = balance1();
        return (test);
    }

    function sendEth(address _addr) public payable {
        require (msg.value>0,"tu n'envoie rien");
        if(msg.value==0 ){
            revert("c pa bon");
        }
        (bool sent, ) = _addr.call{value: msg.value}("");
        require (sent ==true, unicode"le call n'est pas passé");
    }

    function recupVar() public view returns (uint){
        return (storageData);
    }

    

}