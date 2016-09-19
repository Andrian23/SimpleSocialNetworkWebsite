angular
     .module('app')
     .controller('HomeController', HomeController);

 HomeController.$inject = ['UserService', '$rootScope',"$scope"];

 function HomeController(UserService, $rootScope, $scope) {
     var vm = this;
     
     vm.user = null;   
     vm.compani = {};  
     vm.child = {};
     initController();

     function initController() {  
         loadCurrentUser();     
     }

     function loadCurrentUser() {
         UserService.GetByUsername($rootScope.globals.currentUser.user.user_login)
             .then(function (user) {
                vm.user = user;
//                vm.compani = user.companies;
                if(!vm.user.companies){
                    vm.user.companies=[];
                }
                 
             });
     }
     vm.addCompanies = function () {
         $('.modal').modal('hide')
         $('#addCompani input').val("");
         $('#addCompani').modal('show');  
     }
     vm.addChildren = function () {
         $('.modal').modal('hide')
         $('#addChild input').val("");
         $('#addChild').modal('show');  
     }
     vm.addMainCompani = function () {
         if(UserService.addCompani(vm.compani, vm.user.idUser)){
             loadCurrentUser();
         };              
     }
     vm.addChildCompani = function () {
         if(UserService.addChild(vm.child, vm.compani.id)){
             loadCurrentUser();
         };              
     }
     vm.removeCompani = function (id) {   
         UserService.deleteCompani(id);
        loadCurrentUser();
         
     }
     vm.removeChild = function (id) {   
         UserService.deleteChild(id);
        loadCurrentUser();
         $('.modal').modal('hide')
     }
     vm.editCompani = function (compani) {  
         $('.modal').modal('hide')
         vm.compani.id=compani.id;
         vm.expanded=false;
         $('#editCompani input[type="text"]').val(compani.compani_name);
         $('#editCompani input[type="number"]').val(compani.compani_earnings);
     }
     vm.editChild = function (compani) {   
         $('.modal').modal('hide')
         vm.child.id=compani.id;
         vm.expanded=false;
         $('#editChild input[type="text"]').val(compani.compani_name);
         $('#editChild input[type="number"]').val(compani.compani_earnings);
         $('#editChild').modal('show');  
     }
     vm.editCompaniInDB = function () { 
         UserService.updateCompani(vm.compani); 
         loadCurrentUser();
     }
      vm.editChildInDB = function () {  
         UserService.updateChild(vm.child); 
         loadCurrentUser();
     }
     vm.showChildren=function(compani){
         vm.compani=compani;
         $('#childrenCompani').modal('show');  
     }
 }