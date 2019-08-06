const Web3 = require("web3");
var web3;
const crypto = require('crypto');
// var KeyEncoder = require('key-encoder'),
    // keyEncoder = new KeyEncoder('secp256k1')
const fs = require('fs');

const contractJson = JSON.parse(fs.readFileSync('./build/contracts/UpVoting.json', 'utf8'));
var contract;
var account;

exports.init = async (provider, addr) => {
	const options = {
	  transactionConfirmationBlocks: 1
	};
	web3 = new Web3(new Web3.providers.HttpProvider(provider), null, options);

	var accountList = await web3.eth.personal.getAccounts();
	account = accountList[0];

	web3.eth.net.isListening()
		.then(() => console.log('Connected to ' + provider + ' using account ' + account))
		.catch(function(e) {
			console.log('Unable to connect to ' + provider + ': ' + e);
			process.exit(1);
		});

	contract = new web3.eth.Contract(contractJson.abi, addr, {
		defaultAccount: account,
		defaultGasPrice: '100000000000',
		defaultGas: '4712388',
		gas: 4712388,
  		gasPrice: 100000000000,
		from: account
	});

	if(!addr) {
		try {
			console.log('Deploying new UpVoting contract');
			contract.deploy({
				data: contractJson.bytecode
			}).send()
			.on('error', function(error) {
				console.error(error);
				process.exit(1);
			})
			.on('transactionHash', function(tx) {
				console.log('Transaction hash: ' + tx);
			})
			.on('receipt', function(receipt){
				console.log('UpVoting deployed at ' + receipt.contractAddress);
				contract.options.address = receipt.contractAddress;
				console.log("API ready to rock (and block)");
			});
		}
		catch(e) {
			 console.error(e);
		}
	}
	else {
		console.log("API ready to rock (and for block)");
	}	

}

exports.createAccount = async (req, res) => {
	var acc = web3.eth.accounts.create();
	var privateKey = acc.privateKey.slice(2);

	const user = crypto.createECDH('secp256k1');
	user.setPrivateKey(privateKey, 'hex');

	const publicKeyHex = user.getPublicKey('hex');
	const privateKeyHex =  user.getPrivateKey('hex');

	let data = {
		'publicKey': publicKeyHex,
		'privateKey': privateKeyHex,
		'account': acc.address
	};

	res.status(201);
	res.json(data);
}

exports.vote = async (req, res) => {
	if(!req.body.account || !req.body.candidate) res.status(404).json({"error":"Invalid parameters"});
	// await web3.eth.sendTransaction({to:Contractaddress, from:Accountaddress, data: getData});

	contract.methods.voteFor(web3.utils.sha3(req.body.candidate), req.body.account).send()
		.on('error', function(errorMessage) {
			console.error(errorMessage);
			res.status(500);
			res.send({'error': 'Error processing request'});
		})
		.on('receipt', async function(receipt){
			let data = {
				'transactionHash': receipt.transactionHash
			}
			res.status(201).send(data)
		})
}

exports.getContractAddress = (req, res) => {
	res.status(201).send({address: contract.options.address});
}

exports.setContractAddress = async (req, res) => {
	if(!req.body.address) {
		res.status(401).send({error: 'Contract address not providee'});
	}
	let bytecode = await web3.eth.getCode(req.body.address);
	if(bytecode == '0x') {
		res.status(401).send({error:'There is no contract at provided address'});
	}
	contract.options.address = req.body.address;

	res.status(201).send({success: 'Contract address was updated'});
}

exports.getVotes = async (req, res) => {
	if(!req.params.candidate) {
		res.status(401).send({error:'Candidate was not provided'});
	}

	try {
		let votes = parseInt(await contract.methods.getVotes(web3.utils.sha3(req.params.candidate)).call());
		res.status(201).send({
			candidate: req.params.candidate,
			votes: votes
		});
	}
	catch(e) {
		console.error(e);
		res.status(422).send({error:'Requested candidate has not being voted yet'});
	}
}

exports.getVoteHistory = async (req, res) => {
	if(!req.params.page || !req.params.size) {
		res.status(401).send({error: 'Missing input parameters'});
	}

	contract.getPastEvents('Voted', {fromBlock: 0, toBlock: 'latest'})
		.then( events => {
			const a = req.params.page*req.params.size;
			const b = a+parseInt(req.params.size);
			res.status(201).send(events.reverse().slice(a, b));
		})
		.catch( e => {
			console.error(e);
			res.status(503).send({error:'Error while processing request'});
		})
}