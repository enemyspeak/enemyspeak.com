'use strict';

/* Services */

var enemyServices = angular.module('enemyServices', ['ngResource']);

enemyServices.factory('Project', ['$resource',
	function($resource){
    	return $resource('json/:projectId.json', {}, {
      	query: {method:'GET', params:{projectId:'project'}, isArray:true}
    });
}]);