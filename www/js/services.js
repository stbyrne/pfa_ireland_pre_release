angular.module('ListServices', [])
 
.service('listService', function($http) {
    

    this.getList = function() {
        return $http.get('http://pfai.fireflyweb.ie/mobile/transferliststream');
        
    }
 
});