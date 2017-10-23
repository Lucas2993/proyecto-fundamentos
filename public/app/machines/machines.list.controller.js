(function () {
	'use strict';

	var controllerName = 'machinesListCtrl';

	angular.module('app').controller(controllerName, ['$scope', '$location', 'dialogs', 'machinesSrv', 'toastr', machinesListCtrl]);

	/**
	 * Controlador de la pantalla de listar automatas.
	 */
	function machinesListCtrl($scope, $location, dialogs, machinesSrv, logger) {

		// busca todos los automatas disponibles.
		machinesSrv.findAll().then(function (results) {
			$scope.machines = results.response;
		});

		// redirecciona a editar un automata.
		$scope.edit = function (machine) {
			$location.path('/machine/edit/' + machine._id);
		};

		// redirecciona a simular automata.
		$scope.simulate = function(machine) {
			$location.path('/machine/simulate/' + machine._id);
		};

		// redirecciona a crear un nuevo automata.
		$scope.create = function () {
			$location.path('/machine/edit/new');
		};

		// elimina un automata.
		$scope.remove = function (machine) {
			var dlg = dialogs.confirm('¿Eliminar automata: ' + machine.name + '?', 'Una vez eliminado no podrá recuperarlo');

			dlg.result.then(function () {
				machinesSrv.destroy(machine._id).then(function (result) {
					if (result.error)
						return logger.error('No se pudo eliminar el automata');

					$scope.machines = $scope.machines.filter(function (elem) {
						return (elem._id != machine._id)
					});

					logger.info('Eliminado con exito');
				});
			}, function () {
				// void
			});
		};

	} // fin controlador.

})();
