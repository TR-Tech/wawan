var mongoose = require("mongoose");

var championshipSchema = new mongoose.Schema({
	name : String,
	nameAr : String,
	pic : String,
	date : Date,
	awards : String,
	awardsAr : String,
	address : String,
	addressAr : String,
	competitions : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Competition"
	}],
	requiredPoints : Number,
	winersPoints : [ Number ],
	referees : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Referee"
	}],
	joinReferees : [{referee : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Referee"
	}, join : Boolean}],
	refereesEnterPoint: Number,
	playersLink : String,
	audiencelink : String,
	overAllPlayers : [{player : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	}, type : String}],
	Physique : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	},
	Bodybuilding : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	},
	Bodystyle : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	}

})

var Championship = mongoose.model("Championship",championshipSchema);

// var championship = new Championship({
// 	name : "Championship 1",
// 	Pic : "Championship Pic",
// 	date : new Date(),
// 	address : "Jorana, Amman",
// 	competitions : ["57d2a05e5b4d1b2f083389d5", "57d2a05e5b4d1b2f083389d1"],
// 	requiredPoints : 30
// }).save(function (err, newChampionship) {
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(newChampionship);
// });

module.exports = Championship;