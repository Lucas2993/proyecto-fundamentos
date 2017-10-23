(function () {
    'use strict';

    var controllerName = 'machineSimulateCtrl';

    angular.module('app').controller(controllerName, ['$scope', '$routeParams', '$location', 'machinesSrv', 'toastr', 'utils', machineSimulateCtrl]);

	/**
	 * Controlador de la pantalla de ejecutar automatas.
	 */
    function machineSimulateCtrl($scope, $routeParams, $location, machineSrv, logger, utils) {

        // bandera que indica si el automata es nuevo.
        $scope.machine = { _id: false, name: "", description: "", nodes: [], edges: [] };

        // estado actual, al iniciar es el estado de partida previo a transicionar.
        $scope.currentState = { id: "", label: "" };

        // entradas posibles del automata.
        $scope.inputs = [];

        // habilita/deshabilita el boton de elegir estado actual.
        $scope.disabled = false;

        /**
         * Busca un automata mediante su id.
         * @param {Number} id 
         */
        function findById(id) {

            machineSrv.findById(id).then(function (result) {
                if (result.error) {
                    logger.error('No existe el automata con el id recibido', 'ID no encontrado');
                    return $location.path('machines');
                }

                $scope.machine = result.response;

                // obtengo todas las posibles entradas en las transiciones.
                $scope.machine.edges.map(function (edge) { $scope.inputs.push(edge.label) });

                // elimino las entradas duplicadas.
                $scope.inputs = $scope.inputs.filter(function (item, pos) {
                    return $scope.inputs.indexOf(item) == pos;
                });

                $scope.networkData.nodes.add($scope.machine.nodes);
                $scope.networkData.edges.add($scope.machine.edges);
            });
        }

        findById($routeParams.id);

        logger.success('Simulador Activado');

        /**
         * Setea un nodo como estado actual/inicial pintandolo de color verde.
         */
        $scope.selectCurrent = function () {

            // valido que el estado actual exista y posea una etiqueta.
            if ($scope.currentState.label == undefined || $scope.currentState.label === "")
                return logger.error('Escriba el nombre de un estado valido');

            // convierto el objeto que contiene los nodos para iterar facilmente.
            var allNodes = utils.objectToArray($scope.networkData.nodes._data);

            for (var i = 0; i < allNodes.length; i++) {
                if (allNodes[i].label == $scope.currentState.label) {
                    allNodes[i].color = utils.getColor('start');
                    $scope.currentState = allNodes[i];
                } else {
                    allNodes[i].color = null;
                }
            }

            $scope.disabled = true;
            $scope.networkData.nodes.update(allNodes);
            logger.info($scope.currentState.label, 'Estado inicial');
        };

        // ejecuta una transicion en el automata desde el estado actual.
        $scope.execute = function (input) {

            // convierto el objeto que contiene los nodos para iterar facilmente.
            var allNodes = utils.objectToArray($scope.networkData.nodes._data);
            var allEdges = utils.objectToArray($scope.networkData.edges._data);

            // busco las relaciones salientes que contengan el label igual al de la entrada.
            for (var i = 0; i < allEdges.length; i++) {
                if ($scope.currentState.id == allEdges[i].from && input == allEdges[i].label) {
                    $scope.currentState = getNode(allEdges[i].to);
                    return;
                }
            }

            logger.info('El estado no transiciona con la entrada: ' + input);
        };

        /**
         * Retorna un nodo buscado por su ID.
         * @param {Number} id 
         */
        function getNode(id) {
            // convierto el objeto que contiene los nodos para iterar facilmente.
            var allNodes = utils.objectToArray($scope.networkData.nodes._data);
            var newState = {};

            for (var i = 0; i < allNodes.length; i++) {
                if (allNodes[i].id == id) {
                    allNodes[i].color = utils.getColor('start');
                    newState = allNodes[i];
                } else {
                    allNodes[i].color = null;
                }
            }

            $scope.networkData.nodes.update(allNodes);
            return newState;
        }

        /**
         * Resetea el estado actual para que pueda elegirse otro diferente.
         */
        $scope.resetCurrent = function() {
            $scope.disabled = false;
            $scope.currentState = {id: "", label: ""};
        };

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

        };

        /**
         * Opciones de visualizacion.
         * @type {Object}
         */
        $scope.networkOptions = {
            edges: {
                arrows: {
                    to: true
                }
            },
            nodes: {
                physics: true
            },
            locale: 'es',
            interaction: {
                navigationButtons: true,
                hoverConnectedEdges: false
            }
        };


    } // fin controlador.

})();