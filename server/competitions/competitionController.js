var Competition = require("./competitionModel.js");
var Championship = require("../championships/championshipModel.js");
var Player = require("../players/playerModel.js");
var Coach = require("../coaches/coachModel.js");
var Club = require("../clubs/clubModel.js");
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

	// addPlayerToCompetition : function (req, res, next) {
	// 	var competitionId = req.params.id;
	// 	//var competitionsEnterpoint = req.body.enterpoint;
	// 	var playerId = req.body.playerId;
	// 	// add competitions Id to player 
	// 	Player.findOneAndUpdate({_id: playerId}, {$pull : {competitions: competitionId}}).exec();
	// 	Player.findOneAndUpdate({_id: playerId}, {$push : {competitions: competitionId}}).exec(
	// 	// add points to player
	// 	//Player.findOneAndUpdate({_id: playerId}, { $inc: { points: competitionsEnterpoint }}).exec(
	// 	function (err, player) {
	// 		// add points for clube 
	// 		//Club.findOneAndUpdate({_id: player.club}, { $inc: { points: competitionsEnterpoint }}).exec();
	// 		// add copmetition Id in club
	// 		Club.findOneAndUpdate({_id: player.club}, {$pull : {competitions: competitionId}}).exec();
	// 		Club.findOneAndUpdate({_id: player.club}, {$push : {competitions: competitionId}}).exec();
			
	// 		// add points for Coach
	// 		//Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: competitionsEnterpoint }}).exec();
	// 		// add competition Id in Coach
	// 		Coach.findOneAndUpdate({_id: player.coach}, {$pull : {competitions: competitionId}}).exec();
	// 		Coach.findOneAndUpdate({_id: player.coach}, {$push : {competitions: competitionId}}).exec();
	// 	});
	// 	Competition.findOneAndUpdate({_id: competitionId}, {$pull : {players: playerId}}).exec();
	// 	Competition.findOneAndUpdate({_id: competitionId}, {$push : {players: playerId}},{new : true})
	// 	.exec(function (err, competition) {
	// 		repsonseHandler(err, req, res, {status: 200, returnObj: competition}, next);
	// 	})
	// },

	addPlayerToCompetition : function (req, res, next) {
		var competitionId = req.params.id;
		//var competitionsEnterpoint = req.body.enterpoint;
		var playerId = req.body.playerId;
		var championshipId = req.body.championshipId;
		// add competitions Id to player 
		Player.findOneAndUpdate({_id: playerId}, {$pull : {competitions: competitionId}}).exec();
		Player.findOneAndUpdate({_id: playerId}, {$push : {competitions: competitionId}}).exec(
		// add points to player
		//Player.findOneAndUpdate({_id: playerId}, { $inc: { points: competitionsEnterpoint }}).exec(
		function (err, player) {
			// add points for clube 
			//Club.findOneAndUpdate({_id: player.club}, { $inc: { points: competitionsEnterpoint }}).exec();
			// add copmetition Id in club
			Club.findOneAndUpdate({_id: player.club}, {$pull : {championships: championshipId}}).exec();
			Club.findOneAndUpdate({_id: player.club}, {$push : {championships: championshipId}}).exec();

			Club.findOneAndUpdate({_id: player.club}, {$pull : {players: playerId}}).exec();
			Club.findOneAndUpdate({_id: player.club}, {$push : {players: playerId}}).exec();
			
			// add points for Coach
			//Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: competitionsEnterpoint }}).exec();
			// add competition Id in Coach
			Coach.findOneAndUpdate({_id: player.coach}, {$pull : {championships: championshipId}}).exec();
			Coach.findOneAndUpdate({_id: player.coach}, {$push : {championships: championshipId}}).exec();

			Coach.findOneAndUpdate({_id: player.coach}, {$pull : {players: playerId}}).exec();
			Coach.findOneAndUpdate({_id: player.coach}, {$push : {players: playerId}}).exec();
		});
		Competition.findOneAndUpdate({_id: competitionId}, {$pull : {joinPlayers: {player : playerId, join : false, position : 0}}}).exec();
		Competition.findOneAndUpdate({_id: competitionId}, {$push : {joinPlayers: {player : playerId, join : false, position : 0}}},{ new : true})
		.exec(function (err, competition) {
			repsonseHandler(err, req, res, {status: 200, returnObj: competition}, next);
		})
	},

	playerJoinCompetition : function (req, res, next) {
		var competitionId = req.params.id;
		var playerId = req.body.playerId;
		var flag = req.body.flag;
		var competitionsEnterpoint = req.body.competitionsEnterpoint;
		if(flag) {
			Player.findOne({_id: playerId}).exec(
			function (err, player) {
				// add points for clube 
				// Club.findOneAndUpdate({_id: player.club}, { $inc: { points: competitionsEnterpoint }}).exec();
				// add points for Coach
				Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: 1 }}).exec();
			});
		}
		else {
			Player.findOne({_id: playerId}).exec(
			function (err, player) {
				// add points for clube 
				// Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -competitionsEnterpoint }}).exec();
				// add points for Coach
				Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -1 }}).exec();
			});
		} 

		Competition.findOneAndUpdate({_id: competitionId, "joinPlayers.player" : playerId}, {$set : {"joinPlayers.$.join" : flag}},{ new : true})
		.exec(function (err, competition) {
			repsonseHandler(err, req, res, {status: 200, returnObj: competition}, next);
		})
	},

	createCompetition : function (req, res, next) {
		var competition = req.body; 
		var newCompetition = new Competition({
			//name : competition.name,
			//nameAr : competition.nameAr,
			//championship : competition.championship,
			type : competition.type,
			typeAr : competition.typeAr,
			size : competition.size,
			sizeAr : competition.sizeAr
			//players : competition.players,
		})
		.save(function (err, newCompetition) {
			repsonseHandler(err, req, res, {status: 200, returnObj: newCompetition}, next);
		});
	},

	addNewWiner : function (req, res, next) {
		var competitionId = req.params.id;
		var playerId = req.body.playerId;
		var position = parseInt (req.body.winerPostion);
		var championshipId = req.body.championshipId;
		var positionPoints = [];

		var playerOldPoint = 0;
		var playerNewPoint = 0;

		var coachOldPoint = 0;
		var coachNewPoint = 0;




		Championship.findOne({_id : championshipId})
		.exec(function (err, championship) {
			// positionPoints = championship.winersPoints;
			// var newPoint = positionPoints[position-1];
			// console.log("newPoint is " , newPoint);
			Competition.findOne({_id: competitionId, "joinPlayers.player" : playerId})
			.exec(function (err, competition) {
				for (var i = 0; i < competition.joinPlayers.length; i++) {
					if((competition.joinPlayers[i].player).toString() === playerId){
						var oldPosition = competition.joinPlayers[i].position;
						console.log("oldPosition is ", oldPosition);
						break;
					}
				}
				if(oldPosition === 1){

					playerOldPoint = 10;
					coachOldPoint = 10;
				}
				else if(oldPosition === 2) {
					playerOldPoint = 7;
					coachOldPoint = 7;
				}
				else if(oldPosition === 3) {
					playerOldPoint = 5;
					coachOldPoint = 5;
				}
				else if( oldPosition <= 10) {
					coachOldPoint = 2;
				}
				// var oldPoint = (positionPoints[oldPosition-1]);
				// console.log("oldPoint is " , oldPoint);
				Player.findOneAndUpdate({_id: playerId}, { $inc: { points: -playerOldPoint }})
				.exec(function (err, player) {
					// Club.findOneAndUpdate({_id: player.club}, { $inc: { points: -oldPoint }}).exec();
					Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: -coachOldPoint }}).exec();
				});
				
			})
			
			Competition.findOneAndUpdate({_id: competitionId, "joinPlayers.player" : playerId}, {$set : {"joinPlayers.$.position" : position}},{ new : true})
			.exec(function (err, competition) {
				if(position === 1){
					playerNewPoint = 10;
					coachNewPoint = 10;
				}
				else if(position === 2) {
					playerNewPoint = 7;
					coachNewPoint = 7;
				}
				else if(position === 3) {
					playerNewPoint = 5;
					coachNewPoint = 5;
				}
				else if( position <= 10) {
					coachNewPoint = 2;
				}
				Player.findOneAndUpdate({_id: playerId}, { $inc: { points: playerNewPoint }})
				.exec(function (err, player) {
					// Club.findOneAndUpdate({_id: player.club}, { $inc: { points: newPoint }}).exec();
					Coach.findOneAndUpdate({_id: player.coach}, { $inc: { points: coachNewPoint }}).exec();
				});
				repsonseHandler(err, req, res, {status: 200, returnObj: competition}, next);
			})
		})

	},

	getAllAboutCompetition : function (req, res, next) {
		var competitionId = req.params.id;
		var competitionObj = {};
		var championshipObj = {};
		var playersArr = [];

		Competition.findOne({_id: competitionId})
		.exec(function (err, competition) {
			competitionObj = competition;
			Championship.findOne({_id: competition.championship})
			.exec(function (err, championship) {
				championshipObj = championship;
				if(competition.players.length > 0)
				{
					for (var i = 0; i < competition.players.length; i++) {
						Player.findOne({_id :competition.players[i]})
						.exec(function (err, player) {
							playersArr.push(player);
							if(playersArr.length === competition.players.length){
								repsonseHandler(err, req, res, {status: 200, returnObj: {competition : competitionObj, championship: championshipObj, players:playersArr }}, next);
							}
						})
					}
				}
				else
					repsonseHandler(err, req, res, {status: 200, returnObj: {competition : competitionObj, championship: championshipObj, players:playersArr }}, next);				
			})
		});
	},

	getAllPlayerOfCopmetition : function (req, res, next) {
		var competitionId = req.params.id;
		var playersArr = [];
		var playersObjArr = [];
		var flagArr = [];
		var positionArr = [];
		Competition.findOne({_id : competitionId})
		.exec(function (err, competition) {
			if(competition.joinPlayers.length > 0) {
				for (var i = 0; i < competition.joinPlayers.length; i++) {
					flagArr.push(competition.joinPlayers[i].join);
					positionArr.push(competition.joinPlayers[i].position);
					Player.findOne({_id :competition.joinPlayers[i].player})
					.exec(function (err, player) {
						playersArr.push(player);
						if(playersArr.length === competition.joinPlayers.length){
							for (var i = 0; i < playersArr.length; i++) {
								playersArr[i].flag = flagArr[i];
								playersArr[i].position = positionArr[i];
							}
							repsonseHandler(err, req, res, {status: 200, returnObj: {flags : flagArr,competition : competition, players:playersArr }}, next);
						}
					})
				}
			}
			else
				repsonseHandler(err, req, res, {status: 200, returnObj: {competition : competition, players:playersArr }}, next);				
		})

	}



}
