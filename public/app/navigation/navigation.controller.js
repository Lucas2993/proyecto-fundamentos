(function () {
    'use strict';

    var controllerName = 'navigationCtrl';

    angular.module('app').controller(controllerName, ['$scope', '$cookieStore', '$location', navigationCtrl]);

	/**
	 * Controlador de la interfaz de navegacion.
	 */
    function navigationCtrl($scope, $cookieStore, $location) {

        // contempla dispositivos moviles.
        var mobileView = 992;

        $scope.getWidth = function () {
            return window.innerWidth;
        };

        // segun el tamaño de la pantalla, oculta o no la barra de navegacion.
        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        // oculta la barra lateral de navegacion.
        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };

        // redirecciona a la pantalla principal.
        $scope.toHome = function() {
            $location.path('/home');
        };

        $scope.toMachines = function() {
            $location.path('/machines');
        };

    } // fin controlador.

})();