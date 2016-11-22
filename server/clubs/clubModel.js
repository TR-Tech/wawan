var mongoose = require("mongoose");

var clubSchema = new mongoose.Schema({
	name: String,
	nameAr: String,
	pic: String,
	points: Number,
	championships : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Championship"
	}],
	players : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Player"
	}],
	address : String,
	addressAr : String
});

var Club = mongoose.model("Club",clubSchema);
module.exports = Club;