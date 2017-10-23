// Modulo de rutas.
(function () {
	'use strict';

	var app = angular.module('app');

  	// Obtiene las rutas definidas.
  	app.constant('routes', getRoutes());

	// Configura las rutas y quien las resuelve.
    app.config(['$routeProvider', 'routes', routeConfigurator]);

	// Registra cada ruta en el provider, con su correspondiente configuracion.
	function routeConfigurator($routeProvider, routes) {
		
        routes.forEach(function(r) {
            $routeProvider.when(r.url, r.config);
        });

        $routeProvider.otherwise({ redirectTo: '/home' });
    }

	//	Define las rutas disponibles de la aplicacion.
  	function getRoutes() {
		return [
			{
				url: '/home',
				config: {
					title: 'Inicio',
					templateUrl: 'app/home/home.view.html',
					controller: 'homeCtrl'
				}
			},
			{
				url: '/machines',
				config: {
					title: 'Maquinas de estados',
					templateUrl: 'app/machines/machines.list.view.html',
					controller: 'machinesListCtrl'
				}
			},
			{
				url: '/machine/edit/:id',
				config: {
					title: 'Editar maquina',
					templateUrl: 'app/machines/machines.edit.view.html',
					controller: 'machinesEditCtrl'
				}
			},
			{
				url: '/machine/simulate/:id',
				config: {
					title: 'Simular maquina',
					templateUrl: 'app/machines/machine.simulate.html',
					controller: 'machineSimulateCtrl'
				}
			}
	  	];
	}

})();
