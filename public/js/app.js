// declare a module
(function () {
	'use strict';
	angular.module('app', [
		'ngRoute',
		'ngAnimate',
		'MyRoutes'
		]).run(['$rootScope',
		function($rootScope) {
			$rootScope.title = "Fundamentos"
		}
	]).config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
})();
