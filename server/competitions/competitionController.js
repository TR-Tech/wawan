var Competition = require("./competitionModel.js");
var Player = require("../players/playerModel.js");
var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {

	getOne : function (req, res, next) {
		Competition.findOne({_id:req.params.id})
		.exec(function (err, competition) {
			repsonseHandler(err, req, res, {status: 200, returnObj: competition}, next);
		})
	},

	getAllByChampionshipId : function (req, res, next) {
		Competition.find({championship:req.params.id})
		.exec(function (err, competitions) {
			repsonseHandler(err, req, res, {status: 200, returnObj: competitions}, next);
		})
	},

	addPlayerToCompetition : function (req, res, next) {
		var competitionId = req.params.id;
		var competitionsEnterpoint = req.body.enterpoint;
		var playerId = req.body.playerId;
		console.log(competitionId);
		console.log(playerId);
		Player.findOneAndUpdate({_id: playerId}, {$pull : {competitions: competitionId}}).exec();
		Player.findOneAndUpdate({_id: playerId}, {$push : {competitions: competitionId}}).exec();
		Player.findOneAndUpdate({_id: playerId}, { $inc: { points: competitionsEnterpoint }}).exec();
		Competition.findOneAndUpdate({_id: competitionId}, {$pull : {players: playerId}}).exec();
		Competition.findOneAndUpdate({_id: competitionId}, {$push : {players: playerId}},{new : true})
		.exec(function (err, competition) {
			repsonseHandler(err, req, res, {status: 200, returnObj: competition}, next);
		})
	},

	createCompetition : function (req, res, next) {
		var competition = req.body; 
		var newCompetition = new Competition({
			name : competition.name,
			nameAr : competition.nameAr,
			championship : competition.championship,
			type : competition.type,
			typeAr : competition.typeAr,
			size : competition.size,
			sizeAr : competition.sizeAr,
			players : competition.players,
			winersPoints : competition.winersPoints,
			enterpoint : competition.enterpoint
		})
		.save(function (err, newCompetition) {
			repsonseHandler(err, req, res, {status: 200, returnObj: newCompetition}, next);
		});
	}

}
