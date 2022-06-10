// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

contract parent{

// Declaring internal

// state varaiable

uint internal sum;

 

// Defining external function to set value of internal state variable sum

function setValue(uint _value) external {

 sum = _value;

}

}

// Defining child contract

contract child is parent{

 // Defining external function to return value of internal state variable sum

function getValue() external view returns(uint) {

 return sum;

}

}

// Defining calling contract

contract caller {

// Creating child contract object

child cc = new child();

 // Defining function to call setValue and getValue functions

function testInheritance(uint _value) public returns (uint) {

 cc.setValue(_value);

 return cc.getValue();

}

}

