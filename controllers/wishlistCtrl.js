"use strict";
var app = angular.module('WishlistCtrl', []);


//Star of wishList
app.controller('WishlistCtrl', ['$scope', '$modal', '$rootScope', 'ItemsService',
    function($scope, $modal, $rootScope, ItemsService) {
        if (_.isEmpty($rootScope.purchased)) {
            ItemsService.getItems()
                .success(function(response) {
                    $rootScope.wishlistItems = response;
                })
                .error(function() {
                    $modal.open({
                        templateUrl: 'views/modals/infoWindow.html',
                        resolve: {
                            headerText: function() {
                                return "Error";
                            },
                            message: function() {
                                return "Error trying to load wishlist please try again later";
                            },
                            cancelBtnText: function() {
                                return ""
                            },
                            showCancelBtn: function() {
                                return false
                            },
                            confirmBtnText: function() {
                                return "Ok";
                            }
                        },
                        controller: infoModal
                    });
                });
        }

        $scope.strToDate = function(date) {
            //check if is a date or not
            if (!angular.isDate(date)) {
                return new Date(date);
            } else {
                return date;
            }

        }
        $scope.editItem = function(item) {
            var modal = $modal.open({
                templateUrl: 'views/modals/itemForm.html',
                resolve: {
                    heading: function() {
                        return "Editing ";
                    },
                    item: function() {
                        return item;
                    }
                },
                controller: itemModal
            })
            modal.result.then(function(item) {
                _.map($rootScope.wishlistItems, function(wish) {
                    if (wish.id === item.id) {
                        wish.name = item.name;
                        wish.description = item.description;
                        wish.price = item.price;
                        wish.last_modified = new Date();

                    }
                });
            })
        }
        $scope.setBudgetLimit = function() {
            //Open modal to set Budget Limit
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/valueModal.html',
                resolve: {
                    headerText: function() {
                        return "Set Budget Limit";
                    },
                    message: function() {
                        return "Please add a value for your budget limit";
                    },
                    cancelBtnText: function() {
                        return "Cancel"
                    },
                    confirmBtnText: function() {
                        return "Set Limit";
                    }
                },
                controller: promptModal
            });
            //When setting budget Limit
            modalInstance.result.then(function(val) {
                if (!angular.isUndefined(val)) {
                    //Rest from the budget limit
                    $rootScope.budget = val;
                    $rootScope.available = val - $scope.spent;
                }
            })
        }
        $scope.addItem = function() {
            var modal = $modal.open({
                templateUrl: 'views/modals/itemForm.html',
                resolve: {
                    heading: function() {
                        return "new Product: ";
                    },
                    item: function() {
                        return {};
                    }
                },
                controller: itemModal
            })
            modal.result.then(function(item) {

                //Temporary ID

                item.id = $rootScope.wishlistItems.length+1;

                item.last_modified = new Date();
                $rootScope.wishlistItems.push(item);
            });
        }
        $scope.buyItem = function(item) {
            var temAvailable = $scope.available - item.price;
            //Check if has money available
            if ($scope.available === 0 || temAvailable < 0) {
                $modal.open({
                    templateUrl: 'views/modals/infoWindow.html',
                    resolve: {
                        headerText: function() {
                            return "No money available";
                        },
                        message: function() {
                            return "You cannot buy this item because you have no budget available for that amount";
                        },
                        cancelBtnText: function() {
                            return ""
                        },
                        showCancelBtn: function() {
                            return false
                        },
                        confirmBtnText: function() {
                            return "Ok";
                        }
                    },
                    controller: infoModal
                });
            } else {
                //Item bought we set proper available price
                $rootScope.available = temAvailable;
                //Removing the item from wishlist and passing to purchased items
                $rootScope.purchased.push(item);
                //Adding value to total money spent
                $rootScope.spent += item.price;
                _.remove($scope.wishlistItems, function(i) {
                    return i.id === item.id;
                })
            }

        }

    }
]);