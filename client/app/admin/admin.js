angular.module('Wawan.admin', [
    'ngMessages'])
.controller('adminController', function($scope, $routeParams, $window, $location, Country, Player, Competition, Championship, Translate, Imugur, Club, Coach, Referee, $mdDialog) {
	$scope.player = {};
	$scope.clubs = [];
	$scope.coaches = [];
	$scope.types = ["Physic","Bodybuilding","Bodystyle"];
	$scope.typesAr = ["فيزيك","كمال اجسام","بادي ستايل"];

	$scope.sizes = ["Under 171 cm","Under 176 cm","Above 176 cm","Under 75 kg","Under 85 kg","Above 85 kg", "Under 70 kg","Under 80 kg","Above 80 kg"];
	$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم","تحت 75 كغ","تحت 85 كغ","فوق 85 كغ","تحت 70 كغ","تحت 80 كغ","فوق 80 كغ"];

	$scope.disableLevel = true;
	$scope.player.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg"

	$scope.championship = {};
	$scope.flag = false;
	$scope.data = {};
	$scope.data.competitions = [];
	$scope.championship.pic = "http://www.clipartkid.com/images/523/prize-reward-sport-trophy-win-winner-icon-icon-search-engine-mmsWyq-clipart.png"
	$scope.typesChampion = ["Physic","Bodybuilding","Bodystyle"];
	$scope.typesArChampion = ["فيزيك","كمال اجسام","بادي ستايل"];
	$scope.positions = [1,2,3,4,5,6,7,8,9,10];
	$scope.championship.competitions = [];
	$scope.championship.positions=[];


	$scope.club = {};

	$scope.coach = {};

	$scope.referee = {};

	$scope.initialize = function () {
		if($window.localStorage.loggedIN=='false' || $window.localStorage.loggedIN==null){
			$location.path('/login');
		}
		$scope.club.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg";
		$scope.coach.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg";
		$scope.referee.pic = "https://amploprod.s3.amazonaws.com/assets/no-user-image-square-9f6a473a32ad639f619216331d10d61ce1b35c9271d5683920960e1a5ee45bb8.jpg";
		
		Country.getAllCountry()
		.then(function (countryes) {
			$scope.countryes = countryes;
		});
		Club.getAllClub()
		.then(function (clubs) {
			$scope.clubs = clubs;
		})
		Coach.getAllCoachs()
		.then(function (coaches) {
			$scope.coaches = coaches;
		})
		Referee.getAllReferee()
		.then(function (referees) {
			$scope.referees = referees;
		})
		Championship.getAllChampionship()
		.then(function (championships) {
			$scope.data.championships = championships
		})
		Player.getAllPlayer()
		.then(function (players) {
			$scope.players = players;
		})
		.catch(function (err) {
			console.log(err)
		})
	}
	$scope.initialize();

	$scope.logout = function () {
		if(typeof(Storage)!="undefined"){
			$window.localStorage.clear();
		    $window.localStorage.loggedIN=false;
		    $location.path('/login');
		}
	    else{
	    	setCookie('token','', 15);
        	setCookie('userId','', 15);
        	setCookie('loggedIN', false, 15);
        	$location.path('/login');
	    }
	}
	function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/login";
    }
	$scope.typeSelectChangedPlayer = function(){
		$scope.disableLevel = false;
		if($scope.player.type === "Physic"){
			$scope.player.typeAr = "فيزيك";
			$scope.sizes = ["Under 171 cm","Under 176 cm","Above 176 cm"];
			$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
		}
		else if($scope.player.type === "Bodystyle") {
			$scope.player.typeAr = "بادي ستايل";
			$scope.sizes = ["Under 70 kg","Under 80 kg","Above 80 kg"];
			$scope.sizeAr = ["تحت 70 كغ","تحت 80 كغ","فوق 80 كغ"];
		}
		else{
			$scope.player.typeAr = "كمال اجسام";
			$scope.sizes = ["Under 75 kg","Under 85 kg","Above 85 kg"];
			$scope.sizeAr = ["تحت 75 كغ","تحت 85 كغ","فوق 85 كغ"];
		}
	};

	$scope.typeSelectChangedChampions = function(){
		$scope.disableLevel = false;
		if($scope.competition.type === "Physic"){
			$scope.sizesChampion = ["Under 171 cm","Under 176 cm","Above 176 cm"];
			$scope.sizeArChampion = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
		}
		else if($scope.competition.type === "Bodystyle") {
			$scope.sizesChampion = ["Under 70 kg","Under 80 kg","Above 80 kg"];
			$scope.sizeArChampion = ["تحت 70 كغ","تحت 80 كغ","فوق 80 كغ"];
		}
		else{
			$scope.sizesChampion = ["Under 75 kg","Under 85 kg","Above 85 kg"];
			$scope.sizeArChampion = ["تحت 75 كغ","تحت 85 كغ","فوق 85 كغ"];
		}
	};

	$scope.sizeSelectChanged = function () {
		console.log($scope.player.size)
		if($scope.player.size === "Under 171 cm")
			$scope.player.sizeAr = "تحت 171 سم";
		else if($scope.player.size === "Under 176 cm")
			$scope.player.sizeAr = "تحت 176 سم";
		else if($scope.player.size === "Above 176 cm")
			$scope.player.sizeAr = "فوق 176 سم";
		else if($scope.player.size === "Under 75 kg")
			$scope.player.sizeAr = "تحت 75 كغ";
		else if($scope.player.size === "Under 85 kg")
			$scope.player.sizeAr = "تحت 85 كغ";
		else
			$scope.player.sizeAr = "فوق 85 كغ";	
	}


	$scope.createPlayer = function () {
		console.log($scope.player);
		if($scope.player.name && $scope.player.nameAr && $scope.player.dateOB && $scope.player.nationality && $scope.player.nationalityAr && $scope.player.countryOfResidence && $scope.player.countryOfResidenceAr && $scope.player.type && $scope.player.size && $scope.player.coach && $scope.player.club){
			var coachName = $scope.player.coach;
			for (var i = 0; i < $scope.coaches.length; i++) {
				if($scope.coaches[i].name === coachName){
					console.log($scope.coaches[i]._id);
					$scope.player.coach = $scope.coaches[i]._id
				}
			}
			var clubName = $scope.player.club;
			for (var i = 0; i < $scope.clubs.length; i++) {
				if($scope.clubs[i].name === clubName){
					console.log($scope.clubs[i]._id);
					$scope.player.club = $scope.clubs[i]._id
				}
			}
			Player.createNewPlayer($scope.player)
			.then(function (player) {
				console.log(player);
				$scope.player = {};
				alert("Done");
			})
			.catch(function (err) {
				alert("ther is same name")
			})
		}
		else
			console.log("fill all fields")
	}

	$scope.changeProfilePic = function(){
		$scope.isLoading = true;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', function() {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(){
				var imgData = (reader.result.split(','))[1];
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.isLoading = false;
					$scope.player.pic = result.link;
					console.log(result.link);
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

	$scope.championshipPic = function () {
		$scope.isLoading = true;
			var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
			var fileBt = $('<input>').attr('type','file');
			fileBt.on('change', function(){
				var file = fileBt[0].files[0];
				var reader = new FileReader();
				reader.addEventListener('load', function(){
					var imgData = (reader.result.split(','))[1];
					// sending the decoded image to IMGUR to get a link for that image
					Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
						$scope.isLoading = false;
						$scope.championship.pic = result.link;
						console.log(result.link);
					});
				})
				// using the reader to decode the image to base64
				reader.readAsDataURL(file);
			})
			fileBt.click();
	}

	$scope.addCompetition = function () {
		if($scope.competition){
			if($scope.competition.size && $scope.competition.type){
				$scope.data.competitions.push({type : $scope.competition.type, size : $scope.competition.size})
				//Competition.createCompetition({})
				$scope.competition.typeArr = Translate.getArr($scope.competition.type);
				$scope.competition.sizeArr = Translate.getArr($scope.competition.size);
				var competitionObj = {
					type : $scope.competition.type,
					typeAr : $scope.competition.typeAr,
					size : $scope.competition.size,
					sizeAr : $scope.competition.sizeAr
				}
				Competition.createCompetition(competitionObj)
				.then(function (competition) {
					console.log(competition);
					$scope.championship.competitions.push(competition._id);
				})
				.catch(function (err) {
					console.log(err);
				})
				$scope.competition.type = "";
				$scope.competition.size = "";
			}
		}
	}

	
	$scope.removeCopmetitiopn = function (OneCompetition) {
		console.log(OneCompetition);
	}


	$scope.createChampion = function () {
		Championship.createChampionship($scope.championship)
		.then(function (championship) {
			console.log(championship);
			alert("Done");
			$scope.championship = {};
			$scope.championship.competitions = [];
			$scope.data.competitions = [];
			$scope.championship.positions=[];
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.clubPic = function () {
		$scope.isLoading = true;
			var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
			var fileBt = $('<input>').attr('type','file');
			fileBt.on('change', function() {
				var file = fileBt[0].files[0];
				var reader = new FileReader();
				reader.addEventListener('load', function(){
					var imgData = (reader.result.split(','))[1];
					// sending the decoded image to IMGUR to get a link for that image
					Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
						$scope.isLoading = false;
						$scope.club.pic = result.link;
						console.log(result.link);
					});
				})
				// using the reader to decode the image to base64
				reader.readAsDataURL(file);
			})
			fileBt.click();
	}

	$scope.createClub = function () {
		Club.createNewClub($scope.club)
		.then(function (club) {
			console.log(club);
			alert("Done");
			$scope.club = {};
			$scope.initialize();
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.coachPic = function () {
		$scope.isLoading = true;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', function() {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(){
				var imgData = (reader.result.split(','))[1];
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.coach.pic = result.link;
					console.log(result.link);
					$scope.isLoading = false;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

	$scope.createCoach = function () {
		var clubName = $scope.coach.club;
		for (var i = 0; i < $scope.clubs.length; i++) {
			if($scope.clubs[i].name === clubName){
				console.log($scope.clubs[i]._id);
				$scope.coach.club = $scope.clubs[i]._id
			}
		}
		Coach.createNewCoach($scope.coach)
		.then(function (coach) {
			console.log(coach);
			alert("Done");
			$scope.coach = {};
			$scope.initialize();
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.refereePic = function () {
		$scope.isLoading = true;
		var IMGUR_CLIENT_ID = window.IMGUR_CLIENT_ID;
		var fileBt = $('<input>').attr('type','file');
		fileBt.on('change', function() {
			var file = fileBt[0].files[0];
			var reader = new FileReader();
			reader.addEventListener('load', function(){
				var imgData = (reader.result.split(','))[1];
				// sending the decoded image to IMGUR to get a link for that image
				Imugur.uploadToIMGUR(IMGUR_CLIENT_ID, imgData, function(result){
					$scope.referee.pic = result.link;
					console.log(result.link);
					$scope.isLoading = false;
				});
			})
			// using the reader to decode the image to base64
			reader.readAsDataURL(file);
		})
		fileBt.click();
	}

	$scope.createReferee = function () {
		Referee.createNewReferee($scope.referee)
		.then(function (referee) {
			console.log(referee);
			alert("Done");
			$scope.referee = {};
			$scope.initialize();
		})
		.catch(function (err) {
			console.log(err)
		})
	}

	$scope.editTab = function () {
		$scope.edit = {};
		Player.getAllPlayer()
		.then(function (players) {
			$scope.edit.players = players;
		})
		.catch(function (err) {
			console.log(err)
		})
	}

	$scope.selectPlayer = function () {
		console.log($scope.edit.player.name);
		var playerName = $scope.edit.player.name;
		for (var i = 0; i < $scope.edit.players.length; i++) {
			if($scope.edit.players[i].name === playerName){
				$scope.edit.player = $scope.edit.players[i];
				console.log($scope.edit.players[i]);
			}
		}

	}

	$scope.editPlayer = function () {
		var coachName = $scope.edit.player.coach;
		for (var i = 0; i < $scope.coaches.length; i++) {
			if($scope.coaches[i].name === coachName){
				console.log($scope.coaches[i]._id);
				$scope.edit.player.coach = $scope.coaches[i]._id
			}
		}
		var clubName = $scope.edit.player.club;
		for (var i = 0; i < $scope.clubs.length; i++) {
			if($scope.clubs[i].name === clubName){
				console.log($scope.clubs[i]._id);
				$scope.edit.player.club = $scope.clubs[i]._id
			}
		}
		Player.editePlayer($scope.edit.player._id, $scope.edit.player)
		.then(function (player) {
			console.log(player);
			$scope.player = {};
			alert("Done");
		})
		.catch(function (err) {
			alert("ther is same name")
		})
	}
	$scope.data.championship = {};
	$scope.data.championship.refereesID = [];
	$scope.data.championship.referees = [];
	$scope.data.championship.competitions = [];
	$scope.data.championship.competitionAndPlayer = [];

	$scope.addRefereeToChampion = function () {
		var refereeId ;
		var refereeName = $scope.data.championship.referee;
		$scope.data.championship.referee = "";
		for (var i = 0; i < $scope.referees.length; i++) {
			if($scope.referees[i].name === refereeName){
				refereeId = $scope.referees[i]._id;
				for (var j = 0; j < $scope.data.championship.referees.length; j++) {
					if($scope.data.championship.referees[j].name === refereeName){
						console.log("the referee alrady exist");
						return null;
					}
				}
				$scope.data.championship.referees.push($scope.referees[i]);
				Championship.addNewRefereeToChampionship($scope.data.championship._id,$scope.data.championship.referees[i]._id)
				.then(function (championship) {
					console.log(championship);
				})
				break;
			}
		}

	}
	$scope.championshipSelected = function () {
		$scope.flag = true;
		$scope.data.championship.Physique = '';
		$scope.data.championship.Bodybuilding = '';
		$scope.data.championship.Bodystyle = '';
		$scope.data.championship.refereesID = [];
		$scope.data.championship.referees = [];
		$scope.data.championship.competitions = [];

		var championshipName = $scope.data.championship.name.replace(" ",".");

		Championship.getAllAboutChampionshipByName(championshipName)
		.then(function (data) {
			console.log(data)
			$scope.data.championship._id = data.championship._id;
			$scope.data.championship.Physique = $scope.getPlayerName(data.championship.Physique);
			$scope.data.championship.Bodybuilding = $scope.getPlayerName(data.championship.Bodybuilding);
			$scope.data.championship.Bodystyle = $scope.getPlayerName(data.championship.Bodystyle);
			$scope.data.championship.refereesEnterPoint = data.championship.refereesEnterPoint;
			$scope.data.championship.referees = data.referees;
			for (var i = 0; i < data.competitions.length; i++) {
				Competition.getAllPlayerOfCopmetition(data.competitions[i]._id)
				.then(function (resData) {
					console.log(resData);
					$scope.data.championship.competitions.push(resData);
				})
			}
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	$scope.refereeSwitchChanged = function (championship,refereeId,flag) {
		console.log(championship)
		Championship.refereeJoinChampionship(championship._id, refereeId, flag, championship.refereesEnterPoint)
		.then(function (championship) {
			console.log(championship);
		})
	}

	$scope.addPlayerToChampion = function (competition,playerName,index) {
		console.log(index);
		var competitionId = competition._id;
		var playerId ;
		$scope.data.championship.player = "";
		for (var i = 0; i < $scope.players.length; i++) {
			if($scope.players[i].name === playerName){
				playerId = $scope.players[i]._id;
				for (var j = 0; j < $scope.data.championship.competitions[index].players.length; j++) {
					if($scope.data.championship.competitions[index].players[j]._id === playerId){
						console.log("the player alrady exist");
						return null;
					}
				}
				$scope.data.championship.competitions[index].players.push($scope.players[i]);
				Competition.addPlayerToCometition(competitionId, playerId, $scope.data.championship._id)
				.then(function (competitionObj) {
					console.log(competitionObj);
				})
			}
		}
	}
	$scope.playerSwitchChanged = function (competitionId, playerId, flag) {
		console.log(playerId,flag);
		Competition.playerJoinCompetition(competitionId, playerId, flag,5)
		.then(function (competition) {
			console.log(competition);
		})
	}

	$scope.getNumber = function(num) {
		console.log(num);
		return new Array(num);   
	}

	$scope.doNoThing = function () {
	}

	$scope.setPlayerPostion = function(competitionId,playerId,position) {
		
		console.log(competitionId,playerId,position,$scope.data.championship._id);
		position = parseInt(position);


		Competition.addNewWiner(competitionId, playerId, position, $scope.data.championship._id)
		.then(function (competition) {
			console.log(competition);
		})
		.catch(function (err) {
			console.log(err);
		})
		
	}

	$scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  }

  $scope.addOverAllWiner = function (championshipId, player, type) {
  	console.log(championshipId._id, $scope.getPlayerId(player), type);
  	Championship.addOverAllWiner(championshipId._id, $scope.getPlayerId(player), type)
  	.then(function (championship) {
		console.log(championship);
	})
	.catch(function (err) {
		console.log(err);
	})
  }

  $scope.getPlayerId = function (name) {
  	for (var i = 0; i < $scope.players.length; i++) {
  		if($scope.players[i].name === name)
  			return $scope.players[i]._id;
  	}
  	return null;
  }

  $scope.getPlayerName = function (id) {
  	console.log("AsdasD", id)
  	for (var i = 0; i < $scope.players.length; i++) {
  		if($scope.players[i]._id === id)
  			return $scope.players[i].name;
  	}
  	return null;
  }
});