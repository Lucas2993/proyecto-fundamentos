(function() {
    'use strict';

    var controllerName = 'simulateGraph';

    angular.module('app').controller(controllerName, ['$scope', 'dialogs', 'toastr', 'graphService', 'utils', '$routeParams', simulateGraph]);

    /**
     * Controlador de la pantalla de edicion de grafo.
     */
    function simulateGraph($scope, dialogs, logger, graphSrv, utils, params) {

        /**
         * Obtiene un grafo en formato JSON y lo agrega como dato al network.
         */
        function getJson() {
            graphSrv.getJson().then(function(result) {
                $scope.networkData.nodes.add(result.response.nodes);
                $scope.networkData.edges.add(result.response.edges);
            });
        }

        $scope.new = false;
        $scope.edit = false;

        console.log("El id obtenido es: "+params.id);
        if(params.id === 'new'){
            $scope.new = true;
        }
        $scope.edit = true;

        getJson();
        logger.success('Activado', 'Editor');
        
        /**
         * Datos a mostrar del grafo.
         * @type {Object}
         */
        $scope.networkData = {
           nodes: new vis.DataSet(),
           edges: new vis.DataSet()
        };

        /**
         * Eventos declarados en vis js.
         * @type {Object}
         */
        $scope.networkEvents = {
            click: function(properties) {
                if (properties.nodes.length > 0) {
                    var node = $scope.networkData.nodes._data[properties.nodes[0]];
                    console.log('node: ', JSON.stringify(node));                    
                } 
                else if (properties.edges.length > 0) {
                    var edge = $scope.networkData.edges._data[properties.edges[0]];
                    console.log('edge: ', JSON.stringify(edge));   
                }
            }
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
            locale: 'es',            
            interaction: {
                navigationButtons: true,
                hoverConnectedEdges: false
            },
            manipulation: {}
        };

        /**
         * Muestra el modal de edicion de nodo.
         * @param {Object} node nodo a editar
         * @param {Function} callback 
         */
        function showNodeModal(node, callback) {
            var dlg = dialogs.create('/app/dialogs/nodeDlg.html','nodeDlgCtrl', node, {size: 'md'});
            
            dlg.result.then(
                function(newNode) {
                    delete newNode.x;
                    delete newNode.y;
                    logger.success('Guardado');
                    callback(newNode);
                }, function() {
                    callback(null);
                }
            );
        }

        /**
         * Muestra el modal de edicion de relacion.
         * @param {Object} edge 
         * @param {Function} callback 
         */
        function showEdgeModal(edge, callback) {
            var inputs = getEdgeInputs();
            var data = {edge: edge, inputs: inputs};

            var dlg = dialogs.create('/app/dialogs/edgeDlg.html','edgeDlgCtrl', data, {size: 'md'});
            
            dlg.result.then(
                function(newEdge) {
                    newEdge.from = newEdge.from.id || newEdge.from;
                    newEdge.to = newEdge.to.id || newEdge.to;
                    logger.success('Guardado');                    
                    callback(newEdge);
                }, function() {
                    callback(null);
                }
            );
        }

        /**
         * Obtiene las entradas definidas en las relaciones.
         * @return {Array} todas las entradas posibles.
         */
        function getEdgeInputs() {
            var inputs = [];
            var edges = Object.values($scope.networkData.edges._data);
            
            for (var i = 0; i < edges.length; i++) {
                if ((inputs.indexOf(edges[i].label) < 0) && (edges[i].label != "")) {
                    inputs.push(edges[i].label);
                }
            }

            return inputs;
        }

    } // fin controlador.

})();
