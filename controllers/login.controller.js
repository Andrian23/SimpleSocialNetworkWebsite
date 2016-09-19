angular
    .module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', 'AuthenticationService'];

function LoginController($location, AuthenticationService) {
    var vm = this;
    vm.login = function () {
        vm.dataLoading = true;
        AuthenticationService.Login(vm.user_login, vm.user_pass, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials(response.user);
                $location.path('/');
            } else {
                vm.wrong = true;
                vm.dataLoading = false;
            }
        });
    };


    (function initController() {
        AuthenticationService.ClearCredentials();
    })();
}