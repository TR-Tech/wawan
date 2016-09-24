var Club = require('./clubModel.js');

module.exports = {
	createClub: function(req, res){
		console.log("hi there")
		var club = req.body;
		var newClub = new club ({
			name: club.name,
			nameAr: club.nameAr,
			pic: club.pic,
			competitions: club.competitions, 
			points: club.points
		})
		newClub.save(function(err, newClub){
			if(err){
				res.status(500).send(err)
				console.log(err)
			}
			else{
				res.status(201).send(newClub)
			}
		})
	},

	getAllClubs: function(req, res){
		Club.find().exec(function(err, clubs){
			if(err){
				res.status(500).send(err)
			}
			else{
				res.status(200).send(clubs)
			}
		})
	}, 
	getClub: function(req, res){
		Club.findOne({_id: req.params.id}).exec(function(err, club){
			if(err){
				res.status(500).send(err)
			}
			else{
				res.status(200).send(club)
			}			
		})
	}, 
	editClub: function(req, res){
		var club = req.body;
		Club.findOneAndUpdate({_id: req.params.id}, {$set:{
			name: club.name,
			nameAr: club.nameAr,
			pic: club.pic,
			club: club.club,
			competitions: club.competitions, 
			points: club.points
		}})
		.exec(function(err, edited){
			if(err){
				res.status(500).send(err);
			}
			else{
				res.status(200).send(edited);
			}
		})
	}, 
	removeClub: function(req, res){
		Club.remove({_id: req.body.id}, function(err){
			if(!err){
				res.status(200).send("Club successfully removed")
			}
			else{
				res.status(500).send(err)
			}
		})
	}
}