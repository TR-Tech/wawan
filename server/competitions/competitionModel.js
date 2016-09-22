var mongoose = require("mongoose");

var competitionSchema = new mongoose.Schema({
	name : String,
	nameAr : String,
	championship : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Championship"
	},
	type : String,
	typeAr : String,
	size : String,
	sizeAr : String,
	players : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	}],
	winersPoints : [ Number ],
	enterpoint : Number,
	winerPlayers : [{playerId :{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	},winerPostion : Number}]
});

var Competition = mongoose.model("Competition",competitionSchema);

// var competition = new Competition({
// 	championship : "57d2a05e5b4d1b2f083389d5",
// 	type : "phisics",
// 	size : "under 130 CM",
// 	players : ["57d2a05e5b4d1b2f080389d5","57d2a05e5b4d1b2f083389d9"],
// 	referees : ["57d2a05e5b4d1b2f080389d1","57d2a02e5b4d1b2f080389d5"]
// }).save(function (err, newas) {
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(newas);
// })



module.exports = Competition;