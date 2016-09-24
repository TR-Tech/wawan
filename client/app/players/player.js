angular.module('Wawan.player', [])
.controller('playerController', function($scope, $routeParams) {
	$scope.initialize = function () {
		console.log("here is player")
	}
	$scope.initialize();
});