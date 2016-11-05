var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		unique : true
	},
	nameAr : String,
	dateOB : Date,
	pic : String,
	nationality : String,
	nationalityAr : String,
	countryOfResidence : String,
	countryOfResidenceAr : String,
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
	typeAr : String,
	size : String,
	sizeAr : String,
	points : Number,
	flag : Boolean,
	position : Number
});

var Player = mongoose.model("Player",playerSchema);

// var player = new Player({
// 	name : "Samera",
// 	dateOB : new Date(),
// 	pic : "sdfghjk",
// 	nationality : "Syrian",
// 	countryOfResidence : "Jordan",
// 	images : ["Image1","Image2","Image3"],
// 	club : "57d2a05e5b4d1b2f083389d5",
// 	points : 1
// }).save(function (err,newPlayer){
// if(err)
// 	console.log(err)
// else
// 	console.log(newPlayer);

// });



module.exports = Player;