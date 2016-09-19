(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    
    
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.addCompani = addCompani;
        service.deleteCompani = deleteCompani;
        service.updateCompani = updateCompani; 
        service.addChild = addChild;
        service.deleteChild = deleteChild;
        service.updateChild = updateChild;
        
        
        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(user_login) {
            var date={
                name: user_login
            }
            return $http.post('/log', date).then(function(user){
                    return user.data;
               }).catch(handleError);
        }

        function Create(user) {
            return $http.post('/reg', user).then(function(success){
                return {success: true}
            }).catch(handleError);
        }
      

        function addCompani(compani, user_id) {
            var date={
                id: user_id,
                compani: compani
            }
            return $http.post('/add', date).then(function(data){
                return {success: true};
                
            }).catch(handleError);
        }

        function deleteCompani(id) {
            var date = {
                id:id
            }
            return $http.post('/delcom' , date).then(handleSuccess, handleError('Error deleting user'));
        }
        
        function updateCompani(compani) {
            return $http.post('/update', compani).then(function(data){
                console.log(data);
                return {success: true};
                
            }).catch(handleError);
        }
        
        
        //Children
        
        
        

        function addChild(compani, id) {
            var date={
                id: id,
                compani: compani
            }
            return $http.post('/add-child', date).then(function(data){
                return {success: true};
                
            }).catch(handleError);
        }

        function deleteChild(id) {
            var date = {
                id:id
            }
            return $http.post('/delcom-child' , date).then(handleSuccess, handleError('Error deleting user'));
        }
        
        function updateChild(compani) {
            return $http.post('/update-child', compani).then(function(data){
                console.log(data);
                return {success: true};
                
            }).catch(handleError);
        }

        // private function

        

        function handleError(error) {
            console.log(error)
            return function () {
                return { success: false, message: error };
            };
        }
    
     
    }

})();