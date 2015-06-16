"use strict";
var app = angular.module('ItemsService',[]);


//Star of wishList
app.service('ItemsService', ['$http', function($http){

	this.getItems = function(){
		return $http.get('data/products.json');
	}
}]);