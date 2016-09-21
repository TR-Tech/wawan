var mongoose = require("mongoose");

var coachSchema = new mongoose.Schema({
	name: String,
	nameAr: String,
	pic: String,
	club: [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Club"
	}],
	competitions : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Competition"
	}],
	points: Number
});

var Coach = mongoose.model("Coach",coachSchema);
module.exports = Coach;