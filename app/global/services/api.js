app.factory('api', ['$http', function ($http){
	return{
		getContent : function(file){
			return $http.get('/api/'+file+'.json');
		}
	}
}]);