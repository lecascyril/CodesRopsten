//*** Exercice 3 ***//
// Simple token you can buy and send.
contract SimpleToken {
    mapping(address => int) public balances;
    
    /// @dev Creator starts with all the tokens.
    constructor()  {
        balances[msg.sender]+= 1000e18;
    }
    
    /** @dev Send token.
     *  @param _recipient The recipient.
     *  @param _amount The amount to send.
     */
    function sendToken(address _recipient, int _amount) public {
        balances[msg.sender]-=_amount;
        balances[_recipient]+=_amount;
    }
    
}