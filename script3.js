var  Web3  =  require('web3');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`)
web3 = new Web3(provider);


const tx = {
  from: '0x13bc18faeC7f39Fb5eE428545dBba611267AEAa4', 
  to: '0xe8c127b57553a711d2FDD5Ea492133670ef72957', 
  value: 100000000000000000,
};

const signPromise = web3.eth.signTransaction(tx, tx.from);

signPromise.then((signedTx) => {  
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);  
  
    sentTx.on("receipt", receipt => {
        console.log("super");
    });
    
    sentTx.on("error", err => {
      console.log("oopsie");
    });
    
}).catch((err) => {
    
    console.log("oupsie2");
    
  });