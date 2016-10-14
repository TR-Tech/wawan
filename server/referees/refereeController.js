var Referee = require('./refereeModel.js');

module.exports = {
	createReferee: function(req, res){
		var referee = req.body;
		var newReferee = new Referee ({
			name: referee.name,
			nameAr: referee.nameAr,
			pic: referee.pic,
			summary: referee.summary,
			summaryAr: referee.summaryAr,
			//competitions: referee.competitions,
			points: referee.points || 0
		})
		newReferee.save(function(err, newReferee){
			if(err){
				res.status(500).send(err)
			}
			else{
				res.status(201).send(newReferee)
			}
		})
	},

	getAllReferees: function(req, res){
		Referee.find().exec(function(err, referees){
			if(err){
				res.status(500).send(err)
			}
			else{
				res.status(200).send(referees)
			}
		})
	}, 
	getReferee: function(req, res){
		Referee.findOne({_id: req.params.id}).exec(function(err, referee){
			if(err){
				res.status(500).send(err)
			}
			else{
				res.status(200).send(referee)
			}			
		})
	}, 
	editReferee: function(req, res){
		var referee = req.body;
		Referee.findOneAndUpdate({_id: req.params.id}, {$set:{
			name: referee.name,
			nameAr: referee.nameAr,
			pic: referee.pic,
			summary: referee.summary,
			summaryAr: referee.summaryAr,
			//competitions: referee.competitions,
			points: referee.points
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
	removeReferee: function(req, res){
		Referee.remove({_id: req.body.id}, function(err){
			if(!err){
				res.status(200).send("Referee successfully removed")
			}
			else{
				res.status(500).send(err)
			}
		})
	}
}