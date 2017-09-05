(function() {
    'use strict';

    var serviceName = 'graphService';

    angular.module('app').factory(serviceName, ['$http', graphService]);

        /**
         * Servicios asociados a grafos.
         */
        function graphService($http) {

            /**
             * Servicios disponibles
             * @type {Object}
             */
            var service = {
                getJson: getJson
            }

            return service;

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
