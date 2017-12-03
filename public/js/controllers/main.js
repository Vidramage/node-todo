// $scope is the application object (the owner of the application variables and functions) and $http is an XMLHttpRequest object for requesting external data. If success, the controller creates a property (todos) in the scope, with JSON data from the server:

// js/controllers/main.js
angular.module('todoController', [])

  // inject the Todo service factory into our controller
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // GET =======================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
      });

    // CREATE ===================================
    // when submitting the add form, send the text to the node api
    $scope.createTodo = function() {

      // validate the formData to make sure that something is there
      // if the form is empty, nothing will happen
      //people can't just hold enter to keep adding the same to-do anymore
      if(!$.isEmptyObject($scope.formData)) {

        // call the create function from our srevice (returns a promise object)
        Todos.create($scope.formData)

          //if successful creation, call our get function to get all the new todos
          .success(function(data) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.todos = data; // assign our new list of todos
          });
      }
    };

    // DELETE ==================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
              .success(function(data) {
                      $scope.todos = data;
              })
              .error(function(data) {
                      console.log('Error: ' + data);
              })
    }
  });
