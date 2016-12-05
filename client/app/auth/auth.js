angular.module('Wawan.auth', [])
  .controller('AuthController', function ($scope, $window, $location, UserAuth, $route) {
 //===============================================================================================
 /*                                         AuthController                                       */
 //===============================================================================================
    $scope.signin = function (user) {
      UserAuth.login(user)
      .then(function (data) {
        $window.localStorage['token'] = data.token;
        $window.localStorage['userId'] = data.userId;
        $window.localStorage['loggedIN'] = true;
        $location.path('/admin');
      })
      .then(function () {
        $location.path('/admin');
        })
      .catch(function (err) {
        $scope.username="";
        $scope.password="";
      })
    };
})


