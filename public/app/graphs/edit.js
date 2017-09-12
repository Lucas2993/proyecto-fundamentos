(function() {
    'use strict';

    var controllerName = 'editGraph';

    angular.module('app').controller(controllerName, ['$scope', 'dialogs', 'graphService', editGraph]);

    /**
     * Controlador de la pantalla de edicion de grafo.
     */
    function editGraph($scope, dialogs, graphSrv) {

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
         * Eventos declarados en vis js.
         * @type {Object}
         */
        $scope.networkEvents = {
            click: function(properties) {
                if (properties.nodes.length > 0) {
                    var node = $scope.networkData.nodes._data[properties.nodes[0]];
                    console.log(JSON.stringify(node));                    
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
            interaction: {
                navigationButtons: true,
                hover: true
            },
            manipulation: {
                addNode: function(node, callback) {
                    node.label = "";
                    showNodeModal(node, callback);
                },
                editNode: function(node, callback) {
                    showNodeModal(node, callback);                    
                },
                addEdge: function(edge, callback) {
                    showEdgeModal(edge, callback);
                },
                editEdge: {
                    editWithoutDrag: function(edge, callback) {
                        showEdgeModal(edge, callback);
                    }
                }
            }
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
                    callback(newNode);
                }, function() {
                    // void again
                }
            );
        }

        /**
         * Muestra el modal de edicion de relacion.
         * @param {Object} edge 
         * @param {Function} callback 
         */
        function showEdgeModal(edge, callback) {
            var dlg = dialogs.create('/app/dialogs/edgeDlg.html','edgeDlgCtrl', edge, {size: 'md'});
            
            dlg.result.then(
                function(newEdge) {
                    callback(newEdge);
                }, function() {
                    // void again
                }
            );
        }

    } // fin controlador.

})();
