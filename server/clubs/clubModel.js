var mongoose = require("mongoose");

var clubSchema = new mongoose.Schema({
	name: String,
	nameAr: String,
	pic: String,
	competitions : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Competition"
	}],
	points: Number
});

var Club = mongoose.model("Club",clubSchema);
module.exports = Club;