// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Devinez is Ownable {
    
    string private mot;
    string public indice;
    address public gagnant;
    mapping(address=>bool) played;


    address[] public players;

    function setMot(string memory _mot, string memory _indice)  public onlyOwner{
        mot=_mot;
        indice=_indice;
    }

    function getWinner() view public returns (string memory){
        if(gagnant==address(0)){
            return "Pas encore de gagnant!";
        }
        else {
            return "Il y a un gagnant!";
        }
    }

    function playWord(string memory _try) public returns (bool) {
        require (played[msg.sender]==false, unicode"vous avez déja joué");
        if (
            keccak256(abi.encodePacked(_try)) == keccak256(abi.encodePacked(mot))
        ){
            gagnant=msg.sender;
            played[msg.sender]=true;
            players.push(msg.sender);
            return true;
        }
        else {
            played[msg.sender]=true;
            players.push(msg.sender);
            return false;
        }
    }

    function reset(string memory _mot, string memory _indice) public onlyOwner{
        uint tailleTableau=players.length;
        address  tempPlayers;
        for (uint i=tailleTableau; i>0; i--){
            tempPlayers=players[i-1];
            played[tempPlayers]=false;
            players.pop();
        }
        gagnant = address(0);
        setMot(_mot, _indice);
    }
}