'use strict';

var spotApp = angular.module('spotApp', [
	'ngRoute', 
	'ngSanitize']);

	spotApp.config(['$routeProvider', 
		function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl:'views/spot.html', 
				controller: 'spotCtrl'
			}).
			otherwise({
				redirectTo:'/'
			});
	}]);