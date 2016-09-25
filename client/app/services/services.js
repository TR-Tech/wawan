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
				data : {player: player}
			})
			.then(function (res) {
				return res.data;
			})
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
				url : "/api/club/"+clubId+"/edit",
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
