angular.module('Wawan.player', [])
.controller('playerController', function($scope, $routeParams, $location, Player, $location, Club, Coach, Competition, Championship) {
	$scope.data={};
	$scope.competitions=[];
	$scope.coach;
	$scope.club;
	$scope.initialize = function () {
	}
	$scope.initialize();
	Player.getOnePlayer($routeParams.id)
	.then(function(player){
		$scope.data=player;
		$scope.age = new Date().getYear() - new Date($scope.data.dateOB).getYear();//calculate age
		$('.flag').addClass('flag-'+$scope.data.nationality.toLowerCase().substring(0,2));//add class to get flag
		$scope.nationality = player.nationality.substring(3);
	})
	.then(function(){
		Club.getOneClub($scope.data.club).then(function(club){
			$scope.club=club;
		});
		Coach.getOneCoach($scope.data.coach).then(function(coach){
			$scope.coach=coach
		});

		for (var i = 0; i < $scope.data.competitions.length; i++) {
			Competition.getOne($scope.data.competitions[i]).then(function(competition){
				Championship.getOne(competition.championship).then(function(championship){
					$scope.competitions.push(championship.name+' championship: '+competition.type+' '+competition.size)
				})
			})
		}
	});

	$scope.showItem = function (type, obj) {//link to item's page
		$location.path("/"+type+"/"+obj._id);
	}
});