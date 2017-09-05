(function() {
    'use strict';

    var controllerName = 'editGraph';

    angular.module('app').controller(controllerName, ['$scope', 'graphService', editGraph]);

    /**
     * Controlador de la pantalla de edicion de grafo.
     */
    function editGraph($scope, graphSrv) {

        /**
         * Obtiene un grafo en formato JSON y lo agrega como dato al network.
         */
        function getJson() {
            graphSrv.getJson().then(function(result) {
                $scope.networkData.nodes.add(result.nodes);
                $scope.networkData.edges.add(result.edges);
            });
        }

        getJson();

        /**
         * Datos a mostrar del grafo.
         * @type {Object}
         */
        $scope.networkData = {
           nodes: new vis.DataSet(),
           edges: new vis.DataSet()
        };

        /**
         * Opciones de visualizacion.
         * @type {Object}
         */
        $scope.networkOptions = {
            edges: {
                arrows: {
                    to: true,
                }
            },
            nodes: {
               physics: true
            },
            interaction: {
                navigationButtons: true,
                hover: true
            },
            manipulation: true
        };

    } // fin controlador.

})();
