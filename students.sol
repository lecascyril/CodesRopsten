// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Students {

    struct Etudiant{
        string name;
        uint note;
    }
    
    enum  Classe {
        sixieme,cinquieme,quatrieme
    }
    Classe public classe;

    Etudiant[] public EtudiantsArray;
    mapping(address => Etudiant) public EtudiantsMap;

    function getArray(string calldata _name) public view returns (Etudiant memory) {
        for (uint i; i<EtudiantsArray.length; i++){
            if (keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(EtudiantsArray[i].name))){
                return EtudiantsArray[i];
            }
        }
    }

    function getMap(address _addr) public view returns (Etudiant memory) {
        return EtudiantsMap[_addr];
    }

    function set(address _addr, string calldata _name, uint _note) public {
        EtudiantsMap[_addr].name=_name;
        EtudiantsMap[_addr].note=_note;
        EtudiantsArray.push(Etudiant(_name,_note));
    }

    function deleter(address _addr) public {
        for (uint i; i<EtudiantsArray.length; i++){
            if (keccak256(abi.encodePacked(EtudiantsArray[i].name)) == keccak256(abi.encodePacked(EtudiantsMap[_addr].name))){
                delete EtudiantsArray[i];
            }
        }
        delete EtudiantsMap[_addr];
    }

    function setClasse(Classe _n) public{
        classe = Classe(_n);
    }
    
}



