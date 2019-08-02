'use strict';
module.exports = async function(app) {
	var blockchain = require('./controller');
	await blockchain.init(module.exports.env, module.exports.address);

	app.route('/account')
		.get(blockchain.createAccount);

	app.route('/vote')
		.post(blockchain.vote);

	app.route('/upvoting')
		.get(blockchain.getContractAddress)

	app.route('/upvoting')
		.put(blockchain.setContractAddress)

	app.route('/vote/:candidate')
		.get(blockchain.getVotes);
}