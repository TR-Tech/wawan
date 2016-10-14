var helpers = require('./helpers.js');

var Competition = require('../competitions/competitionController.js');
var Championship = require('../championships/championshipController.js');
var Player = require('../players/playerController.js');

var club =  require('../clubs/clubController.js');
var referee = require('../referees/refereeController.js');
var coach = require('../coaches/coachController.js');

module.exports = function(app, express) {
	//club routes
	app.get('/api/clubs', club.getAllClubs);
	app.get('/api/club/:id', club.getClub);
	app.post('/api/club', club.createClub);
	app.put('/api/club/:id/edit', club.editClub);
	app.delete('/api/club/removeClub/:id', club.removeClub);

	//referee routes
	app.get('/api/referees', referee.getAllReferees);
	app.get('/api/referee/:id', referee.getReferee);
	app.post('/api/referee', referee.createReferee);
	app.put('/api/referee/:id/edit', referee.editReferee);
	app.delete('/api/referee/removeReferee/:id', referee.removeReferee);

	// Competition routes :
	app.get("/api/competition/:id", Competition.getOne);
	app.get("/api/competition/championship/:id", Competition.getAllByChampionshipId);
	app.post("/api/competition/addplayer/:id", Competition.addPlayerToCompetition);
	app.post("/api/competition/playerJoinCompetition/:id", Competition.playerJoinCompetition);
	app.post("/api/competition/newcompetition", Competition.createCompetition);
	app.post("/api/competition/addNewWiner/:id", Competition.addNewWiner);
	app.get("/api/competition/getAllAboutCompetition/:id", Competition.getAllAboutCompetition);
	app.get("/api/competition/getAllPlayerOfCopmetition/:id", Competition.getAllPlayerOfCopmetition);


	// Championship routes :
	app.get("/api/championship/:id", Championship.getOne);
	app.get("/api/championships", Championship.getAll);
	
	app.get("/api/championship/getAllAboutChampionship/:id", Championship.getAllAboutChampionship);
	app.get("/api/championship/getAllAboutChampionshipByName/:id", Championship.getAllAboutChampionshipByName);
	app.post("/api/newchampionship", Championship.createChampionship);
	app.post("/api/addNewRefereeToChampionshipJoin/:id", Championship.addNewRefereeToChampionshipJoin);
	app.post("/api/refereeJoinChampionship/:id", Championship.refereeJoinChampionship);
	app.post("/api/addCompetitionToChampionship/:id", Championship.addCompetitionToChampionship);

	// Player routes :
	app.get("/api/player/getOne/:id", Player.getOnePlayer);
	app.get("/api/player/getAllPlayer", Player.getAllPlayer);
	app.post("/api/player/getAllPlayerByTypeSize", Player.getAllPlayerByTypeSize);
	app.post("/api/player/createNewPlayer", Player.createNewPlayer);
	app.post("/api/player/addImagesToPlayer/:id", Player.addImagesToPlayer);
	app.post("/api/player/editPlayer/:id", Player.editPlayer);

	//coach routes
	app.get('/api/coachs', coach.getAllCoaches);
	app.get('/api/coach/:id', coach.getCoach);
	app.post('/api/coach', coach.createCoach);
	app.put('/api/coach/:id/edit', coach.editCoach);
	app.delete('/api/coach/removeCoach/:id', coach.removeCoach);

	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
