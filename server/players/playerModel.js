var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		unique : true
	},
	dateOB : Date,
	pic : String,
	nationality : String,
	countryOfResidence : String,
	images : [String],
	competitions : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Competition"
	}],
	club : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Club"
	},
	coach : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Coach"
	},
	type : String,
	size : String
});

var Player = mongoose.model("Player",playerSchema);

// var player = new Player({
// 	name : "tawfik kahwaje",
// 	dateOB : new Date(),
// 	pic : "sdfghjk",
// 	nationality : "Syrian",
// 	countryOfResidence : "Jordan",
// 	images : ["Image1","Image2","Image3"],
// 	club : "57d2a05e5b4d1b2f083389d5"
// }).save(function (err,newPlayer){
// if(err)
// 	console.log(err)
// else
// 	console.log(newPlayer);

// });



module.exports = Player;