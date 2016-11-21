var Player = require("./playerModel.js");
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
	}



}