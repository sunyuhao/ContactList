//angularjs file with controllers to call RESTful API from routes.js
var contactList = angular.module('ContactList', []);

function mainController($scope, $http) {
	//$scope.contact = {};

	// when landing on the page, get all contacts and show them

var refresh = function() { 
	$http.get('/api/contacts')
		.success(function(data) {
			$scope.contacts = data;
			$scope.contact = {};
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
refresh();
	// when submitting the add form, send the text to the node API
	$scope.createContact = function() {
		$http.post('/api/contacts', $scope.contact)
			.success(function(data) {
				//console.log(data);
				refresh();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.changeContact = function() {
		$http.put('/api/contacts/'+$scope.contact._id, $scope.contact)
			.success(function(data) {
				refresh();
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	$scope.editContact = function(id) {
		console.log(id);
		$http.get('/api/contacts/' + id)
			.success(function(data) {
				$scope.contact = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a contact after checking it
	$scope.deleteContact = function(id) {
		$http.delete('/api/contacts/' + id)
			.success(function(data) {
				refresh();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
