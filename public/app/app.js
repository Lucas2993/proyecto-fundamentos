// Modulo principal de Angular
(function () {
	'use strict';

	var app = angular.module('app', [
	   'ngAnimate',        // animaciones
	   'ngRoute',          // ruteo
	   'dialogs.main',
	   'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
   	]);

    app.run(['$rootScope', '$route',  function ($rootScope, $route) {
    	$rootScope.title = "Fundamentos Teoricos de la Informatica";
    }]);

	// configuracion del locationProvider
	app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

})();
