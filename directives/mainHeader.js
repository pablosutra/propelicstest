'use strict';
var app = angular.module('layoutDirectives', []);

app.directive('mainHeader', [

    function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/directives/header.html'
        }
    }
])