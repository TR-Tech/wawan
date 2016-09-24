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
} )
