'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'layoutDirectives'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/items', {
            templateUrl: 'views/listItems.html'
        }).
        otherwise({
            redirectTo: '/items'
        });
    }
]);