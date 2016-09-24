var Championship = require("./championshipModel.js");
var Competition = require("../competitions/competitionModel.js");
var Referee = require("../referees/refereeModel.js");
var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {

	getOne : function (req, res, next) {
		var championshipId = req.params.id;
		Championship.findOne({_id: championshipId})
		.exec(function (err, championship) {
			repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
		})
	},

	getAll : function (req, res, next) {
		Championship.find().exec(function (err, championships) {
			repsonseHandler(err, req, res, {status: 200, returnObj: championships}, next);
		});
	},

	createChampionship : function (req, res, next) {
		var championship = req.body; 
		console.log(championship);
		var newChampionship = new Championship({
			name : championship.name,
			nameAr : championship.nameAr,
			pic : championship.pic,
			date : championship.date,
			awards : championship.awards,
			address : championship.address,
			requiredPoints : championship.requiredPoints,
			playersLink : championship.playersLink,
			audiencelink : championship.audiencelink,
			competitions : championship.competitions,
			referees : championship.referees
		})
		.save(function (err, newChampionship) {
			console.log(newChampionship);
			if(newChampionship.competitions.length>0){
				for (var i = 0; i < newChampionship.competitions.length; i++) {
					Competition.findOneAndUpdate({_id:newChampionship.competitions[i]},{$set : {championship : newChampionship._id}}).exec();
				}
			}
			if(newChampionship.referees.length>0){
				for (var i = 0; i < newChampionship.referees.length; i++) {
					Referee.findOneAndUpdate({_id:newChampionship.referees[i]},{$push : {competitions : newChampionship._id}}).exec();
				}
			}
			repsonseHandler(err, req, res, {status: 200, returnObj: newChampionship}, next);
		});
	},

	getAllAboutChampionship : function (req, res, next) {
		var championshipObj = {};
		var competitionArr = [];
		var refereeArr = [];

		Championship.findOne({_id: req.params.id})
		.exec(function (err, championship) {
			championshipObj = championship;
			if(championship.competitions.length > 0 || championship.referees.length > 0){
				for (var i = 0; i < championship.competitions.length; i++) {
					Competition.findOne({_id: championship.competitions[i]})
					.exec(function (err, competition) {
						competitionArr.push(competition);
						if(competitionArr.length === championship.competitions.length){
							repsonseHandler(err, req, res, {status: 200, returnObj: {championship:championshipObj,competitions:competitionArr,referees:refereeArr}}, next);
						}
					})
				}
				for (var i = 0; i < championship.referees.length; i++) {
					Referee.findOne({_id : championship.referees[i]})
					.exec(function (err, referee) {
						refereeArr.push(referee);
						if(refereeArr.length === championship.referees.length){
							repsonseHandler(err, req, res, {status: 200, returnObj: {championship:championshipObj,competitions:competitionArr,referees:refereeArr}}, next);
						}
					})
				}
			}
			else{
				repsonseHandler(err, req, res, {status: 200, returnObj: {championship:championshipObj,competitions:competitionArr,referees:refereeArr}}, next);
			}
		})
	},

	addCompetitionToChampionship : function (req, res, next) {
		var championshipId = req.params.id;
		var competitionId = req.body.competitionId;

		Competition.findOneAndUpdate({_id: competitionId},{$pull : {competitions : competitionId}}).exec();
		Competition.findOneAndUpdate({_id: competitionId},{$push : {competitions : competitionId}}).exec();

		Championship.findOneAndUpdate({_id: championshipId}, {$pull : {competitions : competitionId}}).exec();
		Championship.findOneAndUpdate({_id: championshipId}, {$push : {competitions : competitionId}},{new : true})
		.exec(function (err, championship) {
			repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
		})

	},

	addNewRefereeToChampionship : function (req, res, next) {
		var championshipId = req.params.id;
		var refereeId = req.body.refereeId;
		var enterPoints = req.body.enterPoints;

		Referee.findOneAndUpdate({_id: refereeId},{$pull : {championships : championshipId}}).exec();
		Referee.findOneAndUpdate({_id: refereeId},{$push : {championships : championshipId}}).exec();
		Referee.findOneAndUpdate({_id: refereeId},{$inc : {points : enterPoints}}).exec();

		Championship.findOneAndUpdate({_id: championshipId}, {$pull : {referees : refereeId}}).exec();
		Championship.findOneAndUpdate({_id: championshipId}, {$push : {referees : refereeId}},{new : true})
		.exec(function (err, championship) {
			repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
		})
	}
}