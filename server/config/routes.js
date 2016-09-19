var helpers = require('./helpers.js');


module.exports = function(app, express) {


	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
