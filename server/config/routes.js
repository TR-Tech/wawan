var helpers = require('./helpers.js');
var Competition = require('../competitions/competitionController.js');


module.exports = function(app, express) {

	app.get("/api/competition/:id", Competition.getOne);
	app.get("/api/competition/championship/:id", Competition.getAllByChampionshipId);
	app.post("/api/competition/addplayer/:id", Competition.addPlayerToCompetition);
	app.post("/api/competition/newcompetition", Competition.createCompetition);
	app.post("/api/competition/addNewWiner/:id", Competition.addNewWiner);


	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
