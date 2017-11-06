'use strict';

var enemyControllers = angular.module('enemyControllers', []);

enemyControllers.controller('ListPageCtrl', ['$scope','$log', '$location', '$http',
  function ($scope,$log,$location,$http) {
    $scope.list = '';
    $scope.path = $location.path()
    $scope.breadcrumb = $scope.path.substring(1);
    $scope.back = "";
    $scope.imageIndex = "";

    if ($scope.path == '/') {
      $http.get('json/home.json').success(function(data) {
        $scope.list = data.list;
        for (var i = $scope.list.length - 1; i >= 0; i--) {
          $http.get($scope.list[i].imageURL);
        };
        $(document).attr("title", data.title);
      });
    } else {
      $http.get('json'+$scope.path+'.json').then(function(response) {
        $scope.list = response.data.list;
        $(document).attr("title", response.data.title);
        $('.breadcrumb').css({
          color: response.data.headerColor
        });
        $('.header h1').css({
          color: response.data.headerColor
        });
        $( '.logoColor' ).removeAttr('style');
        $( '.logoColor' ).css({
          "fill": response.data.keyColor
        });
      });
      $scope.path += '/';
      $scope.back = '/';
      // $log.debug($scope.back);
    }
}]);

enemyControllers.controller('ImageListPageCtrl', ['$rootScope','$scope','$routeParams','$log', '$location', '$http',
  function ($rootScope,$scope,$routeParams,$log,$location,$http) {
    $scope.list = '';
    $scope.path = $location.path()
    $scope.breadcrumb = $scope.path.substring(1);
    $scope.back = '';
    $scope.imageIndex = "";

    $http.get('json'+$scope.path+'.json').then(function(response) {
      $scope.list = response.data.list;
      $( "#static-background" ).removeAttr('style');
      $( "#background" ).animate({opacity: 0},{
        duration: 200,
      }).queue(function (next) {
        $(this).removeAttr('style');
        next();
      });
      $rootScope.imageIndex = '';
      // $('head title').val(response.data.title);
      $(document).attr("title", response.data.title);
      $( '.logoColor' ).removeAttr('style');
      $( '.logoColor' ).css({
        "fill": response.data.keyColor
      });
      $('.breadcrumb').css({
        color: response.data.headerColor
      });
      $('.header h1').css({
        color: response.data.headerColor
      });
    });
    $scope.path += '/';
    $scope.back = '/';
    // $log.debug($scope.back);
}]);

enemyControllers.controller('DetailPageCtrl', ['$scope','$routeParams','$log', '$location', '$http',
  function ($scope,$routeParams,$log,$location,$http) {
    $scope.path = $location.path().substring(1);
    $scope.back = $scope.path.split('/')[0];
    var projectID = $scope.path.split('/')[1];
    $scope.breadcrumb = '';

    $http.get('json/'+projectID+'.json').success(function(data) {
      $scope.project = data;
      $scope.breadcrumb = data.name;
      $( "#static-background" ).removeAttr('style');
      $http.get($scope.project.imageURL).success(function(data) {
        $( "#static-background" ).css("opacity","0");
        $( "#static-background" ).css("background-image","url("+$scope.project.imageURL+")");
        $( "#static-background" ).animate({opacity: 1},{
            duration: 200,
        });
      });
      $(document).attr("title", 'Enemyspeak - '+data.name);//data.title);

      $( '.logoColor' ).removeAttr('style');
      $( '.logoColor' ).css({
        "fill": data.keyColor
      });
      $('.header h1').css({
        color: data.headerColor
      });
      setTimeout(function() {
        $('.breadcrumb').css({
          color: data.headerColor
        });
      },100);
    });
}]);