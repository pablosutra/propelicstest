var infoModal = function($scope, $modalInstance, headerText, message, cancelBtnText, confirmBtnText, showCancelBtn) {
    //Set the variables to scope for the template
    $scope.headerText = headerText;
    $scope.message = message;
    $scope.cancelBtnText = cancelBtnText;
    $scope.showCancelBtn = showCancelBtn;
    $scope.confirmBtnText = confirmBtnText;
    //Functions to cancel and accept the modal 
    $scope.cancelModal = function() {
        $modalInstance.dismiss('cancel');
    }
    $scope.accept = function() {
        $modalInstance.close();
    }
}

var promptModal = function($scope, $modalInstance, headerText, message, cancelBtnText, confirmBtnText) {

    //Setting template vars
    $scope.headerText = headerText;
    $scope.message = message;
    $scope.cancelBtnText = cancelBtnText;
    $scope.confirmBtnText = confirmBtnText;
    //Setting functions to accept/Cancel modal;

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }
    $scope.setVariable = function() {
        $modalInstance.close($scope.val);
    }
}

var itemModal = function($scope, $modalInstance, item) {
    $scope.item = _.clone(item);
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    }
    $scope.save = function() {
        $modalInstance.close($scope.item);
    }
}