(function () {
    'use strict';

    var controllerId = 'nodeDlgCtrl';

    angular.module('app').controller(controllerId, ['$scope','$uibModalInstance','data', nodeDlgCtrl]);

    function nodeDlgCtrl($scope, $modalInstance, data) {

        // Cierra la ventana del modal.
        $scope.close = function() {
            $modalInstance.dismiss('Canceled');
        };

        $scope.save = function() {
            data.label = "Cambiado desde el modal";
            $modalInstance.close(data);
        }

    } // end viewPostCtrl

})();