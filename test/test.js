const UpVoting = artifacts.require('UpVoting')

contract('Create UpVoting', async accounts => {
	UpVoting.defaults({
	  from: accounts[0],
	  gas: 4712388,
	  gasPrice: 10000000000
	});
	it('should allow voting', async () => {
		let instance = await UpVoting.deployed();
		let voter = accounts[0];
		let companies = ['Company A', 'Company B', 'Company C'];

		for(let i in companies) {
			company = web3.utils.sha3(companies[i])
			await instance.vote(company);
			let votes = parseInt(await instance.getVotes(company));
			assert.equal(votes, 1);
		}
	});
	it('should allow delegate voting', async () => {
		let instance = await UpVoting.deployed();
		let owner = accounts[0]
		let voter = accounts[1];
		let company = web3.utils.sha3('Company D');

		await instance.voteFor(company, voter, {from:owner});

		let votes = parseInt(await instance.getVotes(company));
		assert.equal(votes, 1);
	});
	it('should ignore multiple votes from same voter', async () => {
		let instance = await UpVoting.deployed();
		let voter = accounts[0];
		let company = web3.utils.sha3('Company E');

		for(let i=0; i<3; i++) {
			await instance.vote(company, {from:voter});
		}

		let votes = parseInt(await instance.getVotes(company));
		assert.equal(votes, 1);
	});
	// it('should return empty for not registered candidate', async () => {
	// 	let instance = await UpVoting.deployed();
	// 	let company = web3.utils.sha3('Company F');

	// 	let votes = parseInt(await instance.getVotes(company));
	// 	console.log(votes)
	// 	assert.equal(votes, 0);
	// });
})