angular.module('Wawan.home', [])
.controller('homeController', function($scope, $routeParams, Player, $location, Referee, Club, Coach) {
	$scope.data = {};
	$scope.data.bsize = '';
	$scope.data.type = '';
	$scope.limit = 10;


	$scope.types = ["Physic","Bodybuilding","Bodystyle"];
	$scope.sizes = ["Under 171 CM","Under 176 CM","Above 176 CM"];
	$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];

	$scope.sizeActive_1 = 'active';

	$scope.bFilter='';
	$scope.phFilter='';
	$scope.bsFilter='';

	$scope.bBySize = function(size){//filter bodybuilding players by size
		$scope.bFilter= size;
	}

	$scope.phBySize = function(size){//filter physique players by size
		$scope.phFilter= size;
	}
	$scope.bsBySize = function(size){//filter bodystyle players by size
		$scope.bsFilter= size;
	}
		//checkk for functionality
	$scope.typeChanged = function(id){
		$scope.selectSize('',-1);
		$scope.data.type = id;
		if(id === 'All'){
			$scope.sizeShow = false;
			$scope.data.type = '';
			$scope.allActive = "active";
			$scope.PhysicActive = ''
			$scope.BodybuildingActive = '';
		}
		else if(id === "Physic"){
			$scope.sizeShow = true;
			$scope.PhysicActive = 'active'
			$scope.BodybuildingActive = '';
			$scope.allActive = "";
			$scope.sizes = ["Under 171 CM","Under 176 CM","Above 176 CM"];
			$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
		}
		else if(id === "Bodystyle"){
			$scope.sizeShow = true;
			$scope.PhysicActive = 'active'
			$scope.BodybuildingActive = '';
			$scope.allActive = "";
			$scope.sizes = ["Under 171 CM","Under 176 CM","Above 176 CM"];
			$scope.sizeAr = ["تحت 171 سم","تحت 176 سم","فوق 176 سم"];
		}
		else{
			$scope.sizeShow = true;
			$scope.PhysicActive = ''
			$scope.BodybuildingActive = 'active';
			$scope.allActive = "";
			$scope.sizes = ["Under 75 KG","Under 85 KG","Above 85 KG"];
			$scope.sizeAr = ["تحت 75 كغ","تحت 85 كغ","فوق 85 كغ"];
		}
	};

	$scope.showThisTable = function($event){
		$scope.limit='';
		$('.table-responsive').addClass('hidden')
		$('.row').children().removeClass('col-md-4');
		$('.row').children().removeClass('col-md-6');
		$('.upper-bar').removeClass('hidden');
		$($event.srcElement).parents('.table-responsive').removeClass('hidden');
		$('thead td').removeAttr('title')
		$('small').html('(full ranking)')
		$('#backBtn').click(function(){
		/*$scope.limit=10;
			$('.table-responsive').removeClass('hidden');
			$('.row:nth-child(1)').children('div').addClass('col-md-6');
			$('.row:nth-child(2)').children('div').addClass('col-md-6');
			$('.upper-bar').addClass('hidden');
			$('thead td').attr('title','Go to full ranking');
			$('small').html('(top ten)');*/
		});
	}
	$scope.initialize = function () {
		$scope.allActive = "active";
		$scope.playerActive = 'active';

		$scope.playersTableShow = true;
		Player.getAllPlayer()
		.then(function (players) {
			$scope.data.players = players;
		});

		$scope.refereeActive = '';
		$scope.refereesTableShow = false;
		Referee.getAllReferee()
		.then(function (referees) {
			$scope.data.referees = referees;
		})

		$scope.culbActive = '';
		$scope.clubesTableShow = false;
		Club.getAllClub()
		.then(function (clubs) {
			$scope.data.clubs = clubs;
		})

		$scope.coachActive = '';
		$scope.coachesTableShow = false;
		Coach.getAllCoachs()
		.then(function (coachs) {
			console.log(coachs)
			$scope.data.coaches = coachs;
		});

		$('[data-toggle="tooltip"]').tooltip();
	}   									

	$scope.initialize();


	$scope.selectSize = function (size,index) {
		$scope.data.size = size;

		$scope.sizeActive_1 = '';
		$scope.sizeActive0 = '';
		$scope.sizeActive1 = '';
		$scope.sizeActive2 = '';
		switch (index){
			case -1 :
				$scope.sizeActive_1 = 'active';
				break;
			case 0 :
				$scope.sizeActive0 = 'active';
				break;
			case 1 :
				$scope.sizeActive1 = 'active';
				break;
			case 2 :
				$scope.sizeActive2 = 'active';
				break;
		}
	}


	$scope.showPlayers = function () {
		$scope.playerActive = 'active';
		$scope.playersTableShow = true;
		$scope.refereeActive = '';
		$scope.refereesTableShow = false;
		$scope.clubActive = '';
		$scope.clubsTableShow = !true;
		$scope.coachActive = '';
		$scope.coachesTableShow = false;
	}

	$scope.showReferees = function () {
		$scope.playerActive = '';
		$scope.playersTableShow = false;
		$scope.refereeActive = 'active';
		$scope.refereesTableShow = true;
		$scope.clubActive = '';
		$scope.clubsTableShow = !true;
		$scope.coachActive = '';
		$scope.coachesTableShow = false;
	}

	$scope.showClubs = function () {
		$scope.playerActive = '';
		$scope.playersTableShow = false;
		$scope.refereeActive = '';
		$scope.refereesTableShow = false;
		$scope.clubActive = 'active';
		$scope.clubsTableShow = true;
		$scope.coachActive = '';
		$scope.coachesTableShow = false;
	}

	$scope.showCoaches = function () {
		$scope.playerActive = '';
		$scope.playersTableShow = false;
		$scope.refereeActive = '';
		$scope.refereesTableShow = false;
		$scope.clubActive = '';
		$scope.clubsTableShow = false;
		$scope.coachActive = 'active';
		$scope.coachesTableShow = true;
	}

	$scope.showItem = function (type, obj) {
		$location.path("/"+type+"/"+obj._id);
	}
});

