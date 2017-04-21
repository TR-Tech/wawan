angular.module('Wawan.coach', [])
.controller('coachController', function($scope, $routeParams, $location, Player, $location, Club, Coach, Competition, Championship) {
	$scope.data={};
	$scope.players=[];
	$scope.club={}
	$scope.initialize = function () {
	}
	$scope.initialize();
	Coach.getOneCoach($routeParams.id)
	.then(function(coach){
		$scope.data=coach;
		$('.flag').addClass('flag-'+$scope.data.nationality.toLowerCase().substring(0,2));//add class to get flag
		$scope.nationality = coach.nationality.substring(3);
	})
	.then(function(){
		Club.getOneClub($scope.data.club).then(function(club){
			$scope.club=club;
		});
		for (var i = 0; i < $scope.data.players.length; i++) {
			Player.getOnePlayer($scope.data.players[i]).then(function(player){
				$scope.players.push(player)	
			})
		}
	});

	$scope.showItem = function (type, obj) {//link to item's page
		$location.path("/"+type+"/"+obj._id);
	}
});