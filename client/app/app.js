angular.module('Wawan',[
	'ngRoute',
	'Wawan.home',
	'Wawan.admin',
	'Wawan.player',
    'Wawan.championship',
    'Wawan.referee',
    'Wawan.coach',
	'Wawan.club',
	'Wawan.services',
    'ngMaterial'])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/home/home.html',
      controller: 'homeController'
    })
    .when('/admin', {
			templateUrl: 'app/admin/admin.html',
			controller: 'adminController'
    })
    .when('/player/:id',{
    	templateUrl : 'app/players/player.html',
    	controller : 'playerController'
    })
    .when('/championship/:id', {
    	templateUrl : 'app/championships/championship.html',
    	controller : 'championshipController'
    })
    .when('/referee/:id', {
    	templateUrl : 'app/referees/referee.html',
    	controller : 'refereeController'
    })
    .when('/club/:id', {
    	templateUrl : 'app/clubs/club',
    	controller : 'clubController'
    })
    .when('/coach/:id', {
    	templateUrl : 'app/coaches/coach.html',
    	controller : 'coachController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});