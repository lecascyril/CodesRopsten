import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Address from "./Address.js";


import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, addresses: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      let options = {
        fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
        toBlock: 'latest'
      };

      let options1 = {
        fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
      };

      let listAddress = await instance.getPastEvents('dataStored', options);

      instance.events.dataStored(options1)
						  .on('data', event => listAddress.push(event));
      const response = await instance.methods.get().call();


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ storageValue: response, web3, accounts, contract: instance, addresses:listAddress });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runSet = async () => {
    const { accounts, contract} = this.state;
    let valeur=document.getElementById("valeur").value;
    const transac = await contract.methods.set(valeur).send({ from: accounts[0] });
    const response = await contract.methods.get().call();



    console.log("l'adresse est celle ci: " + transac.events.dataStored.returnValues.addr);
    console.log("la data est celle ci: " + transac.events.dataStored.returnValues.data);
    console.log(transac);

    this.setState({ storageValue: response });
    };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Address addr={this.state.accounts} />        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <div>The stored value is: {this.state.storageValue}</div>
        <p>
          Try changing the value by setting it via the input:
        </p>
        <input type="text" id="valeur" />
        <button onClick={this.runSet}>Set the value you wrote inside the blockchain</button>
        <br />
        <p>Here is the addresses that interacted with the contract, and the value they put</p>
        <table>
        {this.state.addresses.map((addresse) => (
          <tr><td>{addresse.returnValues.addr}</td><td>{addresse.returnValues.data}</td></tr>
        ))}
        </table>
      </div>
    );
  }
}

export default App;
