import React, { Component } from "react";
import Devinez from "./contracts/Devinez.json";
import getWeb3 from "./getWeb3";
import Addresse from "./Addresse.js";


import "./App.css";

class App extends Component {
  state = {text: "", owned:false, indice:"", web3: null, accounts: null, contract: null};

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Devinez.networks[networkId];

      const instance = new web3.eth.Contract(
        Devinez.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const gagnant = await instance.methods.gagnant().call();
      const indice = await instance.methods.indice().call();
      const owner = await instance.methods.owner().call();
      let owned= accounts[0]==owner;

      let text;
      if(accounts[0]==gagnant){
        text="Bravo vous avez gagné la partie, attendez que l'admin en lance une nouvelle";
      } else if(gagnant != "0x0000000000000000000000000000000000000000"){
        text="Un autre joueur a gagné la partie, attendez que l'admin en lance une nouvelle";
      } else{
        text="La partie n'est pas finie, si vous n'avez pas encore joué alors vous pouvez tenter votre chance";
      }

      this.setState({ text, owned, indice, web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runSet = async () => {
    const { accounts, contract} = this.state;
    let valeur=document.getElementById("valeur").value;
    await contract.methods.playWord(valeur).send({ from: accounts[0] });

    let text;
    const gagnant = await contract.methods.gagnant().call();

    if(accounts[0]==gagnant){
      text="Bravo vous avez gagné la partie sur ce coup de génie, attendez maintenant que l'admin en lance une nouvelle";
    } else if(gagnant != "0x0000000000000000000000000000000000000000"){
      text="Un autre joueur a gagné la partie pendant que tu cherchais, attendez que l'admin en lance une nouvelle";
    } else{
      text="Vous avez joué mais vous avez perdu, faudra attendre la nouvelle partie :(";
    }
    this.setState({text });
    };

    runReset = async () => {
      const { accounts, contract} = this.state;
      let mot=document.getElementById("mot").value;
      let indice=document.getElementById("indice").value;

      await contract.methods.reset(mot, indice).send({ from: accounts[0] });
  
      let text= "Vous avez reset le jeu et indiqué un nouveau mot."
      this.setState({text, indice });
      };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if(this.state.owned){
      return (
        <div className="App">
          <Addresse addr={this.state.accounts} />
          <h1>Deviner c'est gagner!</h1>
          <p>Tu vas jouer au jeu créé ensemble. Voici l'état du jeu:</p>
          <h2>{this.state.text}</h2>
          <p>Vous pouvez jouer maintenant:</p>
          <p>L'indice c'est: {this.state.indice}</p>
          <input type="text" id="valeur" />
          <button onClick={this.runSet}>Essayer?</button>
          <br />
          <br />
          <p>Tu es admin, tu peux donc reset en ajoutant un mot et son indice:          
          <br />
          <input type="text" id="mot" placeholder="mot"/>
          <br />
          <input type="text" id="indice" placeholder="indice"/>
          <br />
          <button onClick={this.runReset}>Reset le jeu</button>
          </p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Addresse addr={this.state.accounts[0]} />
          <h1>Deviner c'est gagner!</h1>
          <p>Tu vas jouer au jeu créé ensemble. Voici l'état du jeu:</p>
          <h2>{this.state.text}</h2>
          <p>Vous pouvez jouer maintenant:</p>
          <p>L'indice c'est: {this.state.indice}</p>
          <input type="text" id="valeur" />
          <button onClick={this.runSet}>Essayer?</button>
        </div>
      );
    }
  }
}

export default App;
