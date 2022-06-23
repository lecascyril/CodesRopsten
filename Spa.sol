// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Spa {

    struct Animal{
        string race;
        uint taille;
        uint age;
        bool isAdopted;
    }

    Animal[]  Animaux;
    mapping(address => uint) public Adoption;
    event animalAdded(uint id);
    event animalAdopted(uint _id, address _addr);


    // CRUD = create read update delete

    function Add(string calldata _race, uint _taille, uint _age) public {
        Animaux.push(Animal(_race, _taille, _age, false));
        emit animalAdded(Animaux.length-1);
    }

    function Get(uint _id) public view returns (Animal memory Rex){
        return Rex = Animaux[_id];
    }

    function Set( uint _id, string calldata _race, uint _taille, uint _age  ) public {
        Animaux[_id].race=_race;
        Animaux[_id].taille=_taille;
        Animaux[_id].age=_age;
    }

    function Delete(uint _id) public {
        delete Animaux[_id];
    }

    // Adoption

    function AdoptOne(uint _id) public {
        require (Animaux[_id].isAdopted==false, "cet animal est deja adopte");
        Animaux[_id].isAdopted=true;
        Adoption[msg.sender]=_id;
        emit animalAdopted(_id, msg.sender);
    }

    
    function GetAdoption(address _addr) public view returns (Animal memory Rex){
        return Rex = Animaux[Adoption[_addr]];
    }

    function AdoptIfMax(string calldata _race, uint _tailleMax, uint _ageMax) public returns (bool) {
        for(uint i; i<Animaux.length;i++){
             if (keccak256(abi.encodePacked(_race)) == keccak256(abi.encodePacked(Animaux[i].race))){
                if(Animaux[i].taille<=_tailleMax){
                    if(Animaux[i].age<_ageMax){
                        if(Animaux[i].isAdopted==false){
                            Animaux[i].isAdopted=true;
                            Adoption[msg.sender]=i;
                            emit animalAdopted(i, msg.sender);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

}
