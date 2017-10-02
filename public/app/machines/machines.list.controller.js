(function() {
    'use strict';

    var controllerName = 'machinesListController';

    angular.module('app').controller(controllerName, ['$scope', 'machinesService', machinesListController]);

    /**
     * Controlador de la pantalla principal.
     */
    function machinesListController($scope, machinesSrv) {

      machinesSrv.findAll().then(function(results){
        $scope.machines = results.response;
      });

      // $scope.machines = [
      //   {
      //     id: 1,
      //     name: 'Maquina 1',
      //     description : 'Descripcion de la maquina 1'
      //   },
      //   {
      //     id: 2,
      //     name: 'Maquina 2',
      //     description : 'Descripcion de la maquina 2'
      //   }
      // ];

    } // fin controlador.

})();
