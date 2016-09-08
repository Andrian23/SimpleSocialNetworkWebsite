
angular
    .module('app')
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

function RegisterController(UserService, $location, $rootScope, FlashService) {
    var vm = this;

    vm.register = function register() {
        vm.dataLoading = true;
        vm.user.friends = [];
        vm.user.posts = [];
        vm.user.avatar = "../img/avatar.jpeg";
        UserService.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }
}