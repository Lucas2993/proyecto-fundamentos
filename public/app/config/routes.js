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
				url: '/machine/edit/:id',
				config: {
					title: 'Editar maquina',
					templateUrl: 'app/graphs/graph.edit.view.html',
					controller: 'editGraph'
				}
			},
			{
				url: '/machine/simulate/:id',
				config: {
					title: 'Simular maquina',
					templateUrl: 'app/graphs/edit.html',
					controller: 'simulateGraph'
				}
			},
			{
				url: '/home',
				config: {
					title: 'Inicio',
					templateUrl: 'app/home/home.view.html',
					controller: 'homeController'
				}
			},
			{
				url: '/machines',
				config: {
					title: 'Maquinas de estados',
					templateUrl: 'app/machines/machines.list.view.html',
					controller: 'machinesListController'
				}
			}
	  	];
	}

})();
