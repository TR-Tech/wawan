var Championship = require("./championshipModel.js");
var Competition = require("../competitions/competitionModel.js");
var Referee = require("../referees/refereeModel.js");
var Player = require("../players/playerModel.js");
var Coach = require("../coaches/coachModel.js");
var Club = require("../clubs/clubModel.js");
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
			awardsAr : championship.awardsAr,
			address : championship.address,
			addressAr : championship.addressAr,
			requiredPoints : championship.requiredPoints,
			winersPoints : championship.positions,
			playersLink : championship.playersLink,
			audiencelink : championship.audiencelink,
			refereesEnterPoint : championship.refereesEnterPoint,
			competitions : championship.competitions,
			//referees : championship.referees
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

	getAllAboutChampionshipByName : function (req, res, next) {
		var championshipObj = {};
		var competitionArr = [];
		var refereeArr = [];
		var flagArr = [];
		var championshipName = req.params.id.replace("."," ");
		Championship.findOne({name: championshipName})
		.exec(function (err, championship) {
			championshipObj = championship;
			if(championship.competitions.length > 0 || championship.joinReferees.length > 0){
				for (var i = 0; i < championship.competitions.length; i++) {
					Competition.findOne({_id: championship.competitions[i]})
					.exec(function (err, competition) {
						competitionArr.push(competition);
						if(competitionArr.length === championship.competitions.length && refereeArr.length === championship.joinReferees.length){
							repsonseHandler(err, req, res, {status: 200, returnObj: {championship:championshipObj,competitions:competitionArr,referees:refereeArr}}, next);
						}
					})
				}
				for (var i = 0; i < championship.joinReferees.length; i++) {
					flagArr.push(championship.joinReferees[i].join);
					Referee.findOne({_id : championship.joinReferees[i].referee})
					.exec(function (err, referee) {
						refereeArr.push(referee);
						if(refereeArr.length === championship.joinReferees.length && competitionArr.length === championship.competitions.length){
							for (var i = 0; i < refereeArr.length; i++) {
								refereeArr[i].flag = flagArr[i];
							}
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
	},

	addNewRefereeToChampionshipJoin : function (req, res, next) {
		var championshipId = req.params.id;
		var refereeId = req.body.refereeId;
		var enterPoints = req.body.enterPoints;
		console.log(typeof(refereeId));

		Referee.findOneAndUpdate({_id: refereeId},{$pull : {championships : championshipId}}).exec();
		Referee.findOneAndUpdate({_id: refereeId},{$push : {championships : championshipId}}).exec();
		//Referee.findOneAndUpdate({_id: refereeId},{$inc : {points : enterPoints}}).exec();

		Championship.findOneAndUpdate({_id: championshipId}, {$pull : {joinReferees: {referee : refereeId, join : false}}}).exec();
		Championship.findOneAndUpdate({_id: championshipId}, {$push : {joinReferees: {referee : refereeId, join : false}}},{ new : true})
		.exec(function (err, championship) {
			repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
		})
	},

	refereeJoinChampionship : function (req, res, next) {
		var championshipId = req.params.id;
		var refereeId = req.body.refereeId;
		var flag = req.body.flag;
		var enterPoints = req.body.enterPoints;
		console.log(enterPoints);
		if(flag)
			Referee.findOneAndUpdate({_id: refereeId},{$inc : {points : enterPoints}}).exec();
		else
			Referee.findOneAndUpdate({_id: refereeId},{$inc : {points : -enterPoints}}).exec();

		Championship.findOneAndUpdate({_id: championshipId, "joinReferees.referee" : refereeId}, {$set : {"joinReferees.$.join" : flag}},{ new : true})
		.exec(function (err, championship) {
			repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
		})	
	},

	addOverAllWiner : function (req, res, next) {
		var championshipId = req.params.id;
		var playerId = req.body.playerId;
		var type = req.body.type;
		console.log(typeof(playerId));
		console.log(typeof(type));
		 var overAllPoints = 10;
		console.log(championshipId, playerId, type);

		// Championship.findOneAndUpdate({_id: championshipId}, {$pull : {overAllPlayers: {player : playerId, type : type}}}).exec();
		// Championship.findOneAndUpdate({_id: championshipId}, {$push : {overAllPlayers: {player : playerId, type : type}}},{ new : true})
		// .exec(function (err, championship) {
		// 	repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
		// })


		
		//CastError: Cast to [string] failed for value "[{"type":"Physic","player":"57e52cf29fd7f9cba746e764"}]" at path "overAllPlayers"

		if(type === "Physique") {
			Championship.findOne({_id : championshipId})
			.exec(function (error, championshipObj) {
				if(championshipObj.Physique){
					Player.findOneAndUpdate({_id : championshipObj.Physique}, { $inc: { points: -overAllPoints }})
						.exec(function (err, player) {
							Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -overAllPoints }}).exec();
							Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -overAllPoints }}).exec();
						});
				}
			})
			Championship.findOneAndUpdate({_id: championshipId}, {$set : { Physique : playerId} },{ new : true})
			.exec(function (err, championship) {
				console.log("asdasd")
						// Player.findOneAndUpdate({_id: championship.overAllPlayers[i].player}, { $inc: { points: -overAllPoints }})
						// .exec(function (err, player) {
						// 	Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -overAllPoints }}).exec();
						// 	Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -overAllPoints }}).exec();
						// });
						Player.findOneAndUpdate({_id : playerId}, { $inc: { points: overAllPoints }})
						.exec(function (err, player) {
							Club.findOneAndUpdate({_id: player.club}, { $inc: { points: overAllPoints }}).exec();
							Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: overAllPoints }}).exec();
						});
				repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
			})
		}
		else if(type === "Bodybuilding"){
			Championship.findOne({_id : championshipId})
			.exec(function (error, championshipObj) {
				if(championshipObj.Bodybuilding){
					Player.findOneAndUpdate({_id : championshipObj.Bodybuilding}, { $inc: { points: -overAllPoints }})
						.exec(function (err, player) {
							Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -overAllPoints }}).exec();
							Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -overAllPoints }}).exec();
						});
				}
			})

			Championship.findOneAndUpdate({_id: championshipId}, {$set : { Bodybuilding : playerId} },{ new : true})
			.exec(function (err, championship) {
						// Player.findOneAndUpdate({_id: championship.overAllPlayers[i].player}, { $inc: { points: -overAllPoints }})
						// .exec(function (err, player) {
						// 	Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -overAllPoints }}).exec();
						// 	Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -overAllPoints }}).exec();
						// });
						Player.findOneAndUpdate({_id : playerId}, { $inc: { points: overAllPoints }})
						.exec(function (err, player) {
							Club.findOneAndUpdate({_id: player.club}, { $inc: { points: overAllPoints }}).exec();
							Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: overAllPoints }}).exec();
						});
				repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
			})
		}
		else {
			Championship.findOne({_id : championshipId})
			.exec(function (error, championshipObj) {
				if(championshipObj.Bodystyle){
					Player.findOneAndUpdate({_id : championshipObj.Bodystyle}, { $inc: { points: -overAllPoints }})
						.exec(function (err, player) {
							Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -overAllPoints }}).exec();
							Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -overAllPoints }}).exec();
						});
				}
			})
			Championship.findOneAndUpdate({_id: championshipId}, {$set : { Bodystyle : playerId} },{ new : true})
			.exec(function (err, championship) {
						// Player.findOneAndUpdate({_id: championship.overAllPlayers[i].player}, { $inc: { points: -overAllPoints }})
						// .exec(function (err, player) {
						// 	Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -overAllPoints }}).exec();
						// 	Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -overAllPoints }}).exec();
						// });
						Player.findOneAndUpdate({_id : playerId}, { $inc: { points: overAllPoints }})
						.exec(function (err, player) {
							Club.findOneAndUpdate({_id: player.club}, { $inc: { points: overAllPoints }}).exec();
							Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: overAllPoints }}).exec();
						});
				repsonseHandler(err, req, res, {status: 200, returnObj: championship}, next);
			})
		}

	}

}