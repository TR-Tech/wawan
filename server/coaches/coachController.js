var Coach = require('./coachModel.js');

module.exports = {
	createCoach: function(req, res){
		var coach = req.body;
		var newCoach =  new Coach ({
			name: coach.name,
			nameAr: coach.nameAr,
			pic: coach.pic,
			club: coach.club,
			competitions: coach.competitions, 
			points: coach.points || 0,
			nationality : coach.nationality,
			nationalityAr : coach.nationalityAr,
			countryOfResidence : coach.countryOfResidence,
			countryOfResidenceAr : coach.countryOfResidenceAr,
			age : coach.age
		})


		newCoach.save(function(err, newCoach){
			if(err){
				res.status(500).send(err)
			}
			else{
				res.status(201).send(newCoach)
			}
		})
	},
	getAllCoaches: function(req, res){
		Coach.find().exec(function(err, allCoaches){
			if(err){
				res.status(500).send(err);
			}
			else{
				res.status(200).send(allCoaches);
			}
		})
	},
	getCoach: function(req, res){
		Coach.findOne({_id: req.params.id}).exec(function(err, coach){
			if(err){
				res.status(500).send(err);
			}
			else{
				res.status(200).send(coach);
			}
		})
	},
	editCoach: function(req, res){
		var coach = req.body;
		Coach.findOneAndUpdate({_id: req.params.id}, {$set:{
			name: coach.name,
			nameAr: coach.nameAr,
			pic: coach.pic,
			club: coach.club,
			competitions: coach.competitions, 
			points: coach.points || 0,
			nationality : coach.nationality,
			nationalityAr : coach.nationalityAr,
			countryOfResidence : coach.countryOfResidence,
			countryOfResidenceAr : coach.countryOfResidenceAr
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
	removeCoach: function(req, res){
		Coach.remove({_id: req.body.id}, function(err){
			if(!err){
				res.status(200).send("Coach successfully removed")
			}
			else{
				res.status(500).send(err)
			}
		})
	}
}