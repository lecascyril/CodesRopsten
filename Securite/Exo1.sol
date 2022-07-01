// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//*** Exercice 1 ***//
// Contract to store and redeem money.
contract Store {
    struct Safe {
        address owner;
        uint amount;
    }
    
    Safe[] public safes;
    
    /// @dev Store some ETH.
    function store() public payable {

        safes.push(Safe({owner: msg.sender, amount: msg.value}));
    }

    /// @dev Take back all the amount stored.
    function take() public {
        require(safes.length<12000);
        for (uint i; i<safes.length; ++i) {

            Safe storage safe = safes[i];
            if (safe.owner==msg.sender && safe.amount!=0) {
                payable(msg.sender).transfer(safe.amount);
                safe.amount=0;
            }
        }
    }
    
    /// @dev Take back all the amount stored.
    function take(uint a, uint b) public {
        for (uint i=a; i<b; ++i) {
            Safe storage safe = safes[i];
            if (safe.owner==msg.sender && safe.amount!=0) {
                payable(msg.sender).transfer(safe.amount);
                safe.amount=0;
            }
        }
    }
}