(function () {
  'use strict';

	var controllerName = 'machinesListController';

	angular.module('app').controller(controllerName, ['$scope', '$location', 'machinesService', machinesListController]);

	/**
	 * Controlador de la pantalla principal.
	 */
	function machinesListController($scope, $location, machinesSrv) {

		machinesSrv.findAll().then(function (results) {
			$scope.machines = results.response;
		});

		$scope.edit = function(machine) {
			$location.path('/machine/edit/' + machine._id);
		};

	} // fin controlador.

})();
