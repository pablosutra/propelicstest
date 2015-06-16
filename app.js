'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'layoutDirectives',
    'ItemsService',
    'WishlistCtrl',
    'PurchasedCtrl'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/wishlist', {
            templateUrl: 'views/listItems.html',
            controller: 'WishlistCtrl'
        }).
        when('/purchases', {
            templateUrl: 'views/purchasedItems.html',
            controller: 'PurchasedCtrl'
        }).
        when('/404', {
            templateUrl: 'views/404.html'
        }).
        otherwise({
            redirectTo: '/404'
        });
    }
]).run(['$rootScope',
    function($rootScope) {
        //Set initial budget to 0$
        $rootScope.budget = $rootScope.budget || 0;
        //Set spend total
        $rootScope.spent = $rootScope.spent || 0;

        //set total money available
        $rootScope.available = $rootScope.available || 0;

        //Set purchased Items
        $rootScope.purchased = $rootScope.purchased || [];
        //Call for getting items
        $rootScope.wishlistItems = $rootScope.wishlistItems || [];
    }
])