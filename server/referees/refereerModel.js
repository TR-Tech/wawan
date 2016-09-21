var mongoose = require("mongoose");

var refereeSchema = new mongoose.Schema({
	name: String,
	nameAr: String,
	pic: String,
	summary: String,
	summaryAr: String,
	competitions : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Competition"
	}],
	points: Number
});

var Referee = mongoose.model("Referee",refereeSchema);
module.exports = Referee;