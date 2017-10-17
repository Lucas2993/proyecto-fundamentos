(function() {
    'use strict';

    var controllerName = 'homeCtrl';

    angular.module('app').controller(controllerName, ['$scope', homeCtrl]);

    /**
     * Controlador de la pantalla principal.
     */
    function homeCtrl($scope) {

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function() {
            var newWidth = 700 + slides.length + 1;
            slides.push({
              image: '//unsplash.it/' + newWidth + '/500',
              text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
              id: currIndex++
          });
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

    } // fin controlador.

})();
