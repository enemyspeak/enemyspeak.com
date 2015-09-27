var enemyspeak = angular.module('enemyspeak', [
  'ngRoute',
  'enemyServices',
  'enemyControllers'
]);

enemyspeak.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomePageCtrl'
      }).
      when('/portfolio',{
        templateUrl: 'partials/portfolio.html'
      }).
      when('/work',{
        templateUrl: 'partials/work.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);