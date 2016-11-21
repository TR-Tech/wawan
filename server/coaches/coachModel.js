var mongoose = require("mongoose");

var coachSchema = new mongoose.Schema({
	name: String,
	nameAr: String,
	pic: String,
	club: {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Club"
	},
	championships : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Championship"
	}],
	points: Number,
	age : Number,
	nationality : String,
	nationalityAr : String,
	countryOfResidence : String,
	countryOfResidenceAr : String,
	players : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	}]
});

var Coach = mongoose.model("Coach",coachSchema);
module.exports = Coach;