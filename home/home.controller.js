angular
     .module('app')
     .controller('HomeController', HomeController);

 HomeController.$inject = ['UserService', '$rootScope',"$scope"];

 function HomeController(UserService, $rootScope, $scope) {
     var vm = this;
     
     vm.user = null;   
     vm.allUsers = [];  
     initController();

     function initController() {  
         loadCurrentUser();      
         loadAllUsers();     
     }

     function loadCurrentUser() {
         UserService.GetByUsername($rootScope.globals.currentUser.username)
             .then(function (user) {
                 vm.user = user;
             });
     }

     function loadAllUsers() {
         UserService.GetAll()
             .then(function (users) {
                 for (var i = 0; i < users.length; i++) {
                     if (users[i].username != vm.user.username) {
                         vm.allUsers.push(users[i]);
                     }

                 }
             });
     }
     
     
  
     vm.addInformation = function () {
         $('#myModal').modal('show');    
     }
     vm.addFriends = function () {
         $('#friendModal').modal('show');  
     }
     vm.addFriend = function (friend) {
         vm.user.friends.push(friend);        
         UserService.Update(vm.user);           
     }
     vm.update = function () {
         UserService.Update(vm.user);           
     }
     vm.removeFriend = function (index) {       
         vm.user.friends.splice(index, 1);
         vm.update();
     }
     
     vm.addPost=function(){
         var post={
             theme: vm.theme,
             message: vm.message,
             date: new Date()
         }
         vm.user.posts.unshift(post);
         vm.theme="";
         vm.message="";
         vm.update();
     }
     
     $scope.uploadFile=function() {
         vm.user.avatar = URL.createObjectURL(event.target.files[0]);
         vm.update();
		}

 }