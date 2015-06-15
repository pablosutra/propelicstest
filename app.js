'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'layoutDirectives',
    'ItemsService',
    'WishlistCtrl'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/wishlist', {
            templateUrl: 'views/listItems.html',
            controller: 'WishlistCtrl'
        }).
        otherwise({
            redirectTo: '/wishlist'
        });
    }
]);