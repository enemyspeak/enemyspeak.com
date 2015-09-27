'use strict';

/* Services */

var enemyServices = angular.module('enemyServices', ['ngResource']);

enemyServices.factory('Project', ['$resource',
	function($resource){
    	return $resource('projects/:projectId.json', {}, {
      	query: {method:'GET', params:{projectId:'projects'}, isArray:true}
    });
}]);
