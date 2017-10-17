(function() {
    'use strict';

    var app = angular.module('app');

    /**
     * Directiva de manipulacion de grafos 2D.
     * Uso: <vis-network data="data" options="options" events="events"></vis-network>
     */
    app.directive('visNetwork', [function() {

        return {
            restrict: 'E',
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function($scope, $element, $attrs, ngModel) {

                var network = null;
                var events = ['click', 'doubleClick'];

                $scope.$watch('data', function() {

                    // Creo el objeto que contiene los datos y opciones de manipulacion de grafos.
                    network = new vis.Network($element[0], $scope.data, $scope.options);
                    network.redraw();
                    network.editEdgeMode();
                    
                    // Registro los posibles eventos en el network para su ejecucion.
                    angular.forEach($scope.events, function(callback, event) {
                        if (events.indexOf(event) >= 0) {
                            network.on(event, callback);
                        }
                    });
                });

                // Seteo las opciones de visualizacion en el network.
                $scope.$watchCollection('options', function(options) {
                    if (network != null) {
                        network.setOptions(options);
                        network.redraw();
                    }
                });

            } // fin link
        }; // fin return
    }]); // fin directiva

    /**
     * Directiva para realizar una accion al presionar Enter.
     */
    app.directive('onEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    $(attrs.onEnter).focus();
                }
                
            });
        };
    });

    app.directive('rdWidget', rdWidget);

    function rdWidget() {
        var directive = {
            transclude: true,
            template: '<div class="widget" ng-transclude></div>',
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            /* */
        }
    };

    app.directive('rdWidgetFooter', rdWidgetFooter);

    function rdWidgetFooter() {
        var directive = {
            requires: '^rdWidget',
            transclude: true,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: 'E'
        };
        return directive;
    };

    app.directive('rdWidgetHeader', rdWidgetTitle);

    function rdWidgetTitle() {
        var directive = {
            requires: '^rdWidget',
            scope: {
                title: '@',
                icon: '@'
            },
            transclude: true,
            template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
            restrict: 'E'
        };
        return directive;
    };

    app.directive('rdWidgetBody', rdWidgetBody);

    function rdWidgetBody() {
        var directive = {
            requires: '^rdWidget',
            scope: {
                loading: '=?',
                classes: '@?'
            },
            transclude: true,
            template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
            restrict: 'E'
        };
        return directive;
    };

    app.directive('rdLoading', rdLoading);

    function rdLoading() {
        var directive = {
            restrict: 'AE',
            template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
        };
        return directive;
    };

})();
