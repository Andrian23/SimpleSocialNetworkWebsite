angular
    .module('app')
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['UserService', '$location', '$rootScope'];

function RegisterController(UserService, $location, $rootScope) {
    var vm = this;

    vm.register = function register() {
        vm.dataLoading = true;
        UserService.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                    $location.path('/login');
                } else {
                    vm.dataLoading = false;
                    vm.wrong = true;
                }
            });
    }
}