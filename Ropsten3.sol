// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Ropsten3 is Ownable {

    struct Apprenant{
        string name;
        uint note;
        //Statut status
    }

    enum Statut{apprenti, certifie, recale}
    Statut public statut;

    mapping (address => Apprenant) apprenantsMapping;
    Apprenant[] apprenantsArray;

    // mapping

    function setAppMapp(address _addr, string calldata _name, uint _note) public onlyOwner {
        // plusieurs manières de faire:
        apprenantsMapping[_addr]= Apprenant(_name, _note);
        // ou
        apprenantsMapping[_addr].name=_name;
        apprenantsMapping[_addr].note=_note;
        // ou encore
        Apprenant memory apprenantFort= Apprenant(_name,_note);
        apprenantsMapping[_addr]=apprenantFort;
    }

    function delete1AppMapp(address _addr) public onlyOwner{
        delete apprenantsMapping[_addr];
        // dans ce cas: apprenantMapping[_addr]= Apprenant("",0)
        apprenantsMapping[_addr].name="";
        apprenantsMapping[_addr].note=0;
    }

    // array

    function addAppArray(string calldata _name, uint _note) public onlyOwner {
        apprenantsArray.push(Apprenant(_name, _note));
        // ou ...
        Apprenant memory apprenantFort= Apprenant(_name,_note);
        apprenantsArray.push(apprenantFort);
    }

    function setAppArray(uint _id, string calldata _name, uint _note) public onlyOwner{
        require (_id<apprenantsArray.length, "tu set un apprenant qui n'existe pas");
        apprenantsArray[_id]=Apprenant(_name, _note);
        // ou 
        apprenantsArray[_id].name=_name;
        apprenantsArray[_id].note=_note;

    }

    function delLastAppArray() public onlyOwner{
        apprenantsArray.pop();
    }

    function deleteAllAppArray() public onlyOwner{
        delete apprenantsArray;
        // dans ce cas: apprenantArray = [] un tableau vide
    }

    function getTab() public view returns (Apprenant[] memory){
        return apprenantsArray;
    }

    // Enums

    function setStatutCertifie() public onlyOwner{
        statut=Statut.certifie;
        // ou
        statut = Statut(1);

    }

    function changeStatut(Statut _num ) public onlyOwner{
        require (uint(_num) < 3, "ce statut n'existe pas" );
        statut = _num;
        // ou 
        statut = Statut(uint (_num));
    }

    function incrementStatut() public onlyOwner{
        require (uint(statut) < 2, "ce statut n'existe pas" );
        statut = Statut (uint (statut) + 1 );        
    }

}