angular.module('Wawan.admin', [])
.controller('adminController', function($scope, $routeParams, Country, Player, Imugur) {
	$scope.player = {};
	$scope.types = ["Physic","Bodybuilding"];
	$scope.typesAr = ["فيزيك","كمال اجسام"];
	$scope.disableLevel = true;
	$scope.player.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg"

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
  	if($scope.player.name && $scope.player.nameAr && $scope.player.dateOB && $scope.player.nationality && $scope.player.nationalityAr && $scope.player.countryOfResidence && $scope.player.countryOfResidenceAr && $scope.player.type && $scope.player.size && $scope.player.coach && $scope.player.club){
	  	Player.createNewPlayer($scope.player)
	  	.then(function (player) {
	  		console.log(player);
	  	})
  	}
  	else
  		console.log("fill all fields")
  }
  


  $scope.changeProfilePic = function(){

		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', () => {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', ()=>{
				var imgData = reader.result.slice(23);
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.player.pic = result.link;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

});