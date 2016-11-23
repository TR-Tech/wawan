angular.module('Wawan.services',[])

.factory('Player', function ($http) {
	return {
		getAllPlayer : function () {
			return $http({
				url : "/api/player/getAllPlayer",
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getOnePlayer : function (playerId) {
			return $http({
				url : "/api/player/getOne/"+playerId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllPlayerByTypeSize : function (type, size) {
			return $http({
				url : "/api/player/getAllPlayerByTypeSize",
				method : "POST",
				data : {type : type, size: size}
			})
			.then(function (res) {
				return res.data;
			})
		},
		createNewPlayer : function (player) {
			return $http({
				url : "/api/player/createNewPlayer",
				method : "POST",
				data : player
			})
			.then(function (res) {
				return res.data;
			})
		},
		addImagesToPlayer : function (playerId, images) {
			return $http({
				url : "/api/player/addImagesToPlayer/"+playerId,
				method : "POST",
				data : {images: images}
			})
			.then(function (res) {
				return res.data;
			})
		},
		editePlayer : function (playerId, player) {
			return $http({
				url : "/api/player/editPlayer/"+playerId,
				method : "POST",
				data : player
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
.factory('Competition', function ($http) {
	return {
		getOne : function (competitionId) {
			return $http({
				url : "/api/competition/"+competitionId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		createCompetition : function (competition) {
			return $http({
				url : "/api/competition/newcompetition",
				method : "POST",
				data : competition
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllByChampionshipId : function (competitionId) {
			return $http({
				url : "/api/competition/championship/"+competitionId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllPlayerOfCopmetition : function (competitionId) {
			return $http({
				url : "/api/competition/getAllPlayerOfCopmetition/"+competitionId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		addPlayerToCometition : function (competitionId,playerId, championshipId) {
			return $http({
				url : "/api/competition/addplayer/"+competitionId,
				method : "POST",
				data : {playerId : playerId, championshipId : championshipId}
			})
			.then(function (res) {
				return res.data;
			})
		},
		playerJoinCompetition : function (competitionId, playerId, flag,competitionsEnterpoint) {
			return $http({
				url : "/api/competition/playerJoinCompetition/"+competitionId,
				method : "POST",
				data : {playerId : playerId, flag : flag, competitionsEnterpoint: competitionsEnterpoint}
			})
			.then(function (res) {
				return res.data;
			})
		},
		addNewWiner : function (competitionId, playerId, position, championshipId) {
			return $http({
				url : "/api/competition/addNewWiner/"+competitionId,
				method : "POST",
				data : {playerId : playerId, winerPostion : position, championshipId : championshipId}
			})
			.then(function (res) {
				return res.data;
			})
		}

	}
})
.factory('Championship', function ($http) {
	return {
		getOne : function (championshipId) {
			return $http({
				url : "/api/championship/"+championshipId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllChampionship : function () {
			return $http({
				url : "/api/championships",
				method : "GET"
			})
			.then(function (res) {
				return res.data
			})
		},
		createChampionship : function (championship) {
			return $http({
				url : "/api/newchampionship",
				method : "POST",
				data : championship
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllAboutChampionship : function (championshipId) {
			return $http({
				url : "/api/championship/getAllAboutChampionship/"+championshipId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllAboutChampionshipByName : function (championshipName) {
			return $http({
				url : "/api/championship/getAllAboutChampionshipByName/"+championshipName,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		addCompetitionToChampionship : function (championshipId, competitionId) {
			return $http({
				url : "/api/addCompetitionToChampionship/"+championshipId,
				method : "POST",
				data : {competitionId : competitionId}
			})
			.then(function (res) {
				return res.data;
			})
		},
		addNewRefereeToChampionship : function (championshipId, refereeId) {
			return $http({
				url : "/api/addNewRefereeToChampionshipJoin/"+championshipId,
				method : "POST",
				data : {refereeId : refereeId}
			})
			.then(function (res) {
				return res.data;
			})
		},
		refereeJoinChampionship : function (championshipId, refereeId, flag, enterPoints) {
			return $http({
				url : "/api/refereeJoinChampionship/"+championshipId,
				method : "POST",
				data : {refereeId : refereeId, flag : flag, enterPoints : enterPoints}
			})
			.then(function (res) {
				return res.data;
			})
		},
		addOverAllWiner : function (championshipId, playerId, type) {
			return $http({
				url : "/api/addOverAllWiner/"+championshipId,
				method : "POST",
				data : {playerId : playerId, type : type}
			})
			.then(function (res) {
				return res.data;
			})
		},
		editChampionship : function (championship) {
			return $http({
				url : "/api/editChampionship/"+championship._id,
				method : "POST",
				data : championship
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
.factory('Translate',function () {
	return {
		getArr : function (word) {
			if(word === "Under 171 CM")
				return "تحت 171 سم";
			else if(word === "Under 176 CM")
				return "تحت 176 سم";
			else if(word === "Above 176 CM")
				return "فوق 176 سم";
			else if(word === "Under 75 KG")
				return "تحت 75 كغ";
			else if(word === "Under 85 KG")
				return "تحت 85 كغ";
			else if(word === "Above 85 KG")
				return "فوق 85 كغ";	
			else if(word === "Physic")
				return "فيزيك";
			else if(word === "Bodybuilding")
				return "كمال اجسام";
			else if(word === "BodyStyle")
				return "بدي ستايل";
			return "No Translate";
		}
	}
})
.factory('Club', function ($http) {
	return {
		getAllClub : function () {
			return $http({
				url : "/api/clubs",
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getOneClub : function (clubId) {
			return $http({
				url : "/api/club/"+clubId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		editClub : function (clubId, club) {
			return $http({
				url : "/api/editclub/"+ clubId,
				method : "POST",
				data : club
			})
			.then(function (res) {
				return res.data;
			})
		},
		removeClub : function (clubId) {
			//
			return $http({
				url : "/api/club/removeClub/"+clubId,
				method : "DELETE"
			})
			.then(function (res) {
				return res.data;
			})
		},
		createNewClub : function (club) {
			return $http({
				url : "/api/club",
				method : "POST",
				data : club
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
.factory('Coach', function ($http) {
	return {
		getAllCoachs : function () {
			return $http({
				url : "/api/coachs",
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getOneCoach : function (coachId) {
			return $http({
				url : "/api/coach/"+coachId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		editCoach : function (coachId, coach) {
			return $http({
				url : "/api/coach/"+coachId+"/edit",
				method : "POST",
				data : coach
			})
			.then(function (res) {
				return res.data;
			})
		},
		removeCoach : function (coachId) {
			//
			return $http({
				url : "/api/coach/removeClub/"+coachId,
				method : "DELETE"
			})
			.then(function (res) {
				return res.data;
			})
		},
		createNewCoach : function (coach) {
			return $http({
				url : "/api/coach",
				method : "POST",
				data : coach
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
.factory('Referee', function ($http) {
	return {
		getAllReferee : function () {
			return $http({
				url : "/api/referees",
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		getOneReferee : function (refereeId) {
			return $http({
				url : "/api/referee/"+refereeId,
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		},
		editReferee : function (refereeId, referee) {
			return $http({
				url : "/api/referee/"+refereeId+"/edit",
				method : "POST",
				data : referee
			})
			.then(function (res) {
				return res.data;
			})
		},
		removeReferee : function (refereeId) {
			//
			return $http({
				url : "/api/referee/removeReferee/"+refereeId,
				method : "DELETE"
			})
			.then(function (res) {
				return res.data;
			})
		},
		createNewReferee : function (referee) {
			return $http({
				url : "/api/referee",
				method : "POST",
				data : referee
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
.factory('Country', function ($http) {
	return {
		getAllCountry : function () {
			return $http({
				url : "https://restcountries.eu/rest/v1/all",
				method : "GET"
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
.factory('Imugur', function () {
	return {
		uploadToIMGUR : function(client_id, imgData, callback) {

		$.ajax({
			url: 'https://api.imgur.com/3/image',
			headers: {
				'Authorization': 'Client-ID ' + client_id,
				'Accept': 'application/json'
			},
			type: 'POST',
			data: {
				'image': imgData,
				'type': 'base64'
			},
			success: function success(res) {

				if (callback) {
					callback(res.data);
				}
			}
		});
	}
	}
})
