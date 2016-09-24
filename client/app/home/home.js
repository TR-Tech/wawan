angular.module('Wawan.home', [])
.controller('homeController', function($scope, $routeParams, Player) {
	$scope.data = {};
	$scope.data.players = [];

	$scope.initialize = function () {
		Player.getAllPlayer()
		.then(function (players) {
			//console.log(players);
			$scope.data.players = players;
		})
		Player.getOnePlayer("57e52cf29fd7f9cba746e764")
		.then(function (player) {
			//console.log(player);
		})
		var size = "Under 176 CM";
		var type = "physics";
		Player.getAllPlayerByTypeSize(type, size)
		.then(function (players) {
			//console.log(players)
		})
		Player.addImagesToPlayer("57e52cf29fd7f9cba746e764",["IMG 5","IMG 6"])
		.then(function (data) {
			console.log(data);
		})
	}
	$scope.initialize();
});