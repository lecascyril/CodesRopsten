//*** Exercice 2 Correction ***// 
// You choose Head or Tail and send 1 ETH.
// The next party send 1 ETH and try to guess what you chose.
// If it succeed it gets 2 ETH, else you get 2 ETH.
contract HeadOrTail {
    bool public chosen; // True if head/tail has been chosen.
    bytes32 player1HashChoice; // True if the choice is head.
    address payable public player1Address; // The last party who chose.

    bool public guessPlayer2;
    address payable public player2Address;

    address payable public winner;
    bool public endGame;

    uint deadlineEndGame;
    
    /** @dev Must be sent 1 ETH.
     *  Choose head or tail to be guessed by the other player.
     *  @param _hashChooseHead True if head was chosen, false if tail was chosen.
     */
    function choose(bytes32 _hashChooseHead) public payable {
        require(!chosen);
        require(msg.value == 1 ether);
        
        chosen=true;
        player1HashChoice=_hashChooseHead;
        player1Address=payable(msg.sender);
    }

    function calculateHash(bool _chooseHead, uint _randomNumber) public view returns(bytes32) {
        return keccak256(abi.encodePacked(_chooseHead, _randomNumber));
    }
    
    function guess(bool _guessHead) public payable {
        require(chosen);
        require(msg.value == 1 ether);


        player2Address = payable(msg.sender);
        guessPlayer2 = _guessHead;
        deadlineEndGame = block.timestamp + 1 weeks;
            
        chosen=false;
    }

    function resolve(bool _chooseHead, uint _randomNumber) public {
        require(msg.sender == player1Address);
        require(calculateHash(_chooseHead, _randomNumber) == player1HashChoice);

        if (guessPlayer2 == _chooseHead)
            winner = player2Address;
        else
            winner = player1Address;

        endGame = true;
    }


    function winnerTakePrice() public {
        require(endGame);
        winner.transfer(2 wei);
    }

    function resolveWinner() public {
        require (block.timestamp >= deadlineEndGame);
        player2Address.transfer(2 ether);
    }
}