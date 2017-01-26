angular.module('limerickApp', []).controller("limerickController", function($scope, $http, RequestService){
var rhyme = 'home';
  this.getRhymes = function() {
    RequestService.getRhymes(rhyme, function(response) {
      console.log(response.data);
    });
  };

  this.getRhymes();
});
