(function() {
    'use strict';

    var serviceName = 'machinesService';

    angular.module('app').factory(serviceName, ['$http', machinesService]);

        function machinesService($http) {

            var service = {
                findAll: findAll,
                getJson: getJson
            }

            return service;

            /**
			 * Busca todos los automatas registrados.
			 */
            function findAll() {
                return $http.get('api/machines').then(
                function success(response) {
                    return response.data;
                },
                function error(error) {
                    return error;
                });
            }

            /**
             * Solicita un JSON con los datos de un grafo a visualizar.
             * @return {Json} grafo en formato JSON.
             */
            function getJson() {
                return $http.get('api/json/draft').then(
                    function success(response) {
                        return response.data;
                    },
                    function error(error) {
                        return error;
                    });
            }

        } // fin servicio.
})();
