var  Web3  =  require('web3'); 

web3  =  new Web3(new  Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e4c3e83875f24d2891178abee381b935'));

var  ethTx  = ('0x412a20d8623c4cbc7a91396e4e15ed66dfb751dbe5e43e337f5bf8f524430606');

web3.eth.getTransaction(ethTx, function(err, result) { 

if (!err  &&  result !==  null) {

    console.log(result); // Log all the transaction info

    console.log('From Address: ' +  result.from); // Log the from address

    console.log('To Address: ' +  result.to); // Log the to address

    console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it

}

else {

    console.log('Error!', err); // Dump errors here

}

});