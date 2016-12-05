var User = require('./userModel.js');
var jwt = require('jwt-simple');

module.exports = {	
	login: function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;
		User.findOne({username: username})
  		.exec(function (error, user) {
   			if (!user) {
 		 	    res.status(500).send(new Error('User does not exist'));
		    } else {
   			    User.comparePassword(password,user.password, res, function(found){
    		        if(!found){
   				       res.status(500).send('Wrong Password');
  			        } else {
 			            var token = jwt.encode(user, 'secret');
			            res.setHeader('x-access-token',token);
			            res.json({token: token, userId : user._id});
                    }
                });
            }
        });
	}
}