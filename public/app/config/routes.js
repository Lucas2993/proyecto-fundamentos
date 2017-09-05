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

        $routeProvider.otherwise({ redirectTo: '/' });
    }

	//	Define las rutas disponibles de la aplicacion.
  	function getRoutes() {
		return [
			{
				url: '/',
				config: {
					title: 'Editar Grafo',
					templateUrl: 'app/graphs/edit.html'
				}
			}
	  	];
	}

})();
