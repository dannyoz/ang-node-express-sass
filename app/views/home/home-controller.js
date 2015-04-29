app.controller('home',['$scope', 'api', function ($scope, api){
	
	api.getContent('data').success(function (data){
		console.log(data);
	});

}]);