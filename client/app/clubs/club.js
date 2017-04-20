angular.module('Wawan.club', [])
.controller('clubController', function($scope, $routeParams, $location, Club, Player, Championship) {
	$scope.data={};
	$scope.players=[];
	$scope.championships=[];
	
	$scope.initialize = function () {
	}
	$scope.initialize();

	Club.getOneClub($routeParams.id)
	.then(function(club){
		$scope.data=club;
	})

	.then(function(){
		for (var i = 0; i < $scope.data.players.length; i++) {
			Player.getOnePlayer($scope.data.players[i]).then(function(player){
				$scope.players.push(player)	
			})
		}
		for (var i = 0; i < $scope.data.championships.length; i++) {
			Championship.getOne($scope.data.championships[i]).then(function(champ){
				$scope.championships.push(champ)
			})
		}

	})


	$scope.showItem = function (type, obj) {//link to item's page
	$location.path("/"+type+"/"+obj._id);
}

});