angular.module('passApp', ['ngRoute']);

angular.module('passApp').config(function($routeProvider, $locationProvider){
  $routeProvider.when('/success', {
    templateUrl: '/views/success.html'
  }).when('/failure', {
    templateUrl: '/views/failure.html'
  }).when('/', {
    templateUrl: '/views/login.html'
  });

  $locationProvider.html5Mode(true);
});

angular.module('passApp').controller('MainController', ['$http', '$location', function($http, $location){
  var vm = this;
  var data = {};

  vm.login = function(){
    console.log('attempt');
    data.username = vm.username;
    data.password = vm.password;
    console.log(data);
    $http.post('/login', data).then(function(response){
      $location.path('/success');
      console.log('Success');
    }, function(err){
      $location.path('/failure');
      console.log(err);
    });

    // $http.get('/login').then(function(response){
    //   console.log('success, sorta');
    // }, function(err){
    //   console.log(err);
    // });
};

vm.register = function(){
  // var user = data.body;
  data.username = vm.username;
  data.password = vm.password;
  console.log(data);
  $http.post('/register', data).then(function(response){
    console.log('Great Success');
  }, function(err){
    console.log(err);
  });
};
}]);
