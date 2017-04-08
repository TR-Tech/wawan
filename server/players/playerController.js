var Player = require("./playerModel.js");
var Club = require('../clubs/clubModel.js');
var Coach = require("../coaches/coachModel.js");
var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {

	getOnePlayer : function (req, res, next) {
		Player.findOne({_id: req.params.id})
		.exec(function (err, player) {
			repsonseHandler(err, req, res, {status: 200, returnObj: player}, next);
		})
	},

	createNewPlayer : function (req, res, next) {
		var player = req.body;
		var newPlayer = new Player({
			name : player.name,
			nameAr : player.nameAr,
			dateOB : player.dateOB,
			pic : player.pic,
			nationality : player.nationality,
			nationalityAr : player.nationalityAr,
			countryOfResidence : player.countryOfResidence,
			countryOfResidenceAr : player.countryOfResidenceAr,
			images : player.images,
			club : player.club,
			coach : player.coach,
			type : player.type,
			typeAr : player.typeAr,
			size : player.size,
			sizeAr : player.sizeAr,
			points : 0
		}).save(function (err, player) {

			Coach.findOneAndUpdate({_id: player.coach}, {$push: {"players": player._id}}).exec();
			Club.findOneAndUpdate({_id: player.club}, {$push: {"players": player._id}}).exec();
			
			repsonseHandler(err, req, res, {status: 200, returnObj: player}, next);
		})
	},

	getAllPlayer : function (req, res, next) {
		Player.find()
		.exec(function (err, players) {
			repsonseHandler(err, req, res, {status : 200, returnObj :players}, next);
		})
	},

	getAllPlayerByTypeSize : function (req, res, next) {
		Player.find({type : req.body.type , size : req.body.size}).sort({points : "desc"})
		.exec(function (err, players) {
			repsonseHandler(err, req, res, {status : 200, returnObj :players}, next);
		});
	},

	addImagesToPlayer : function (req, res, next) {
		for (var i = 0; i < req.body.images.length; i++) {
			Player.findOneAndUpdate({_id: req.params.id}, {$push  : {images :req.body.images[i]}},{new : true}).exec();
		}
		repsonseHandler(null, req, res, {status : 200, returnObj :{}}, next);
	},

	editPlayer : function (req, res, next) {
		var player = req.body;
		Player.findOneAndUpdate({_id: req.params.id},{$set : {
			name : player.name,
			nameAr : player.nameAr,
			dateOB : player.dateOB,
			pic : player.pic,
			nationality : player.nationality,
			nationalityAr : player.nationalityAr,
			countryOfResidence : player.countryOfResidence,
			countryOfResidenceAr : player.countryOfResidenceAr,
			images : player.images,
			club : player.club,
			coach : player.coach,
			type : player.type,
			typeAr : player.typeAr,
			size : player.size,
			sizeAr : player.sizeAr,
			points : player.points
		}},{new : true})
		.exec(function (err, player) {
			repsonseHandler(err, req, res, {status : 200, returnObj :player}, next);
		})
	},
	removePlayer: function(req, res){
		Player.remove({_id: req.params.id}, function(err){
			if(!err){
				res.status(200).send("Player successfully removed")
			}
			else{
				res.status(500).send(err)
			}
		})
	},

	updateAllPlayers : function (req, res, next) {
		Player.find().exec(function (err, players) {
			for (var i = 0; i < players.length; i++) {
				let player = players[i];
				Coach.findOneAndUpdate({_id: player.coach}, {$pull: {"players": player._id}}).exec();
				Coach.findOneAndUpdate({_id: player.coach}, {$push: {"players": player._id}}).exec();
				
				Club.findOneAndUpdate({_id: player.club}, {$pull: {"players": player._id}}).exec();
				Club.findOneAndUpdate({_id: player.club}, {$push: {"players": player._id}}).exec();
				let obj = {};
				Coach.find().exec(function (err, coaches) {
					obj.coaches = coaches;
					Club.find().exec(function (err, clubs) {
						obj.clubs = clubs;
						res.send(obj)
						// repsonseHandler(err, req, res, {status : 200, returnObj :res}, next);
					})
				})
			
			}
		})
	}



}