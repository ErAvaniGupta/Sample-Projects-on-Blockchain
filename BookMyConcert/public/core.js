
// public/core.js
var bookMyConcert = angular.module('bookMyConcert', []);

	bookMyConcert.controller('mainController',function($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all the viewers information who bought the tickets
    $http.get('/api/viewers')
        .success(function(data) {
            $scope.viewers = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the form, send the viewer details and number of tickets viewer wants to buy to the node API
    $scope.bookTickets = function() {
        $http.post('/api/viewers', $scope.formData)
		
		 .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.viewers = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
	
	});