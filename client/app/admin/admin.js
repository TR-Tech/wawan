angular.module('Wawan.admin', [])
.controller('adminController', function($scope, $routeParams, Country, Player) {
	$scope.player = {};
	$scope.types = ["Physic","Bodybuilding"];
	$scope.typesAr = ["فيزيك","كمال اجسام"];
	$scope.disableLevel = true;

	$scope.initialize = function () {
		Country.getAllCountry()
		.then(function (countryes) {
			$scope.countryes = countryes;
		})
	}
	$scope.initialize();

	$scope.typeSelectChanged = function(){
		$scope.disableLevel = false;
    if($scope.player.type === "Physic"){
    	$scope.player.typeAr = "فيزيك";
    	$scope.sizes = ["Under 171 CM","Under 176 CM","Above 176 CM"];
			$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
    }
    else{
    	$scope.player.typeAr = "كمال اجسام";
    	$scope.sizes = ["Under 75 KG","Under 85 KG","Above 85 KG"];
			$scope.sizeAr = ["تحت 75 كغ","تحت 85 كغ","فوق 85 كغ"];
   	}
  };

  $scope.sizeSelectChanged = function () {
  	console.log($scope.player.size)
  	if($scope.player.size === "Under 171 CM")
  		$scope.player.sizeAr = "تحت 171 سم";
  	else if($scope.player.size === "Under 176 CM")
  		$scope.player.sizeAr = "تحت 176 سم";
  	else if($scope.player.size === "Above 176 CM")
  		$scope.player.sizeAr = "فوق 176 سم";
  	else if($scope.player.size === "Under 75 KG")
  		$scope.player.sizeAr = "تحت 75 كغ";
  	else if($scope.player.size === "Under 85 KG")
  		$scope.player.sizeAr = "تحت 85 كغ";
  	else
  		$scope.player.sizeAr = "فوق 85 كغ";	
  }

  $scope.createPlayer = function () {
  	console.log($scope.player);
  	Player.createNewPlayer($scope.player)
  	.then(function (player) {
  		console.log(player);
  	})
  }

});