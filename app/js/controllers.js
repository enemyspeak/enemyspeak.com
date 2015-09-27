'use strict';

var enemyControllers = angular.module('enemyControllers', []);

enemyControllers.controller('HomePageCtrl', ['$scope', '$routeParams', '$http','Project',
  function ($scope,$routeParams,$http,Project) {
 
    $http.get('json/header.json').success(function(data) {
      $scope.header = data;
    });
    $http.get('json/footer.json').success(function(data) {
      $scope.footer = data;
    });
    $http.get('json/home.json').success(function(data) {
      $scope.homeList = data;
    });

    $scope.imageIndex = "";
/* 
    $scope.imageChangeHandler = function(image) { // this needs jquery
        if (image == $scope.imageIndex) {
        } else {
          	$( "#static-background" ).css("background-image","url("+$scope.imageIndex+")");
          	$( "#background" ).css("opacity","0");
          	$( "#background" ).css("background-image","url("+image+")");
          	$( "#background" ).animate({opacity: 1},{
             	duration: 200,
          	}	            
          	$scope.imageIndex = image;
    	}
    }; 
*/
}]);

