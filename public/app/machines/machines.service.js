(function() {
    'use strict';

    var serviceName = 'machinesService';

    angular.module('app').factory(serviceName, ['$http', machinesService]);

        function machinesService($http) {

            var service = {
                findAll: findAll
            }

            return service;


            function findAll() {
                return $http.get('api/machines').then(
                function success(response) {
                    return response.data;
                },
                function error(error) {
                    return error;
                });
            }

        } // fin servicio.
})();
