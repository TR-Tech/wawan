var helpers = require('./helpers.js');
var Competition = require('../competitions/competitionController.js');
var Championship = require('../championships/championshipController.js');
var Player = require('../players/playerController.js');

module.exports = function(app, express) {

	// Competition routes :
	app.get("/api/competition/:id", Competition.getOne);
	app.get("/api/competition/championship/:id", Competition.getAllByChampionshipId);
	app.post("/api/competition/addplayer/:id", Competition.addPlayerToCompetition);
	app.post("/api/competition/newcompetition", Competition.createCompetition);
	app.post("/api/competition/addNewWiner/:id", Competition.addNewWiner);
	app.get("/api/competition/getAllAboutCompetition/:id", Competition.getAllAboutCompetition);

	// Championship routes :
	app.get("/api/championship/:id", Championship.getOne);
	app.get("/api/championships", Championship.getAll);
	app.get("/api/championship/getAllAboutChampionship/:id", Championship.getAllAboutChampionship);
	app.post("/api/newchampionship", Championship.createChampionship);
	app.post("/api/addNewRefereeToChampionship/:id", Championship.addNewRefereeToChampionship);
	app.post("/api/addCompetitionToChampionship/:id", Championship.addCompetitionToChampionship);

	// Player routes :
	app.get("/api/player/getOne/:id", Player.getOnePlayer);
	app.get("/api/player/getAllPlayer", Player.getAllPlayer);
	app.post("/api/player/getAllPlayerByTypeSize", Player.getAllPlayerByTypeSize);
	app.post("/api/player/createNewPlayer", Player.createNewPlayer);
	app.post("/api/player/addImagesToPlayer/:id", Player.addImagesToPlayer);
	app.post("/api/player/editPlayer/:id", Player.editPlayer);

	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
