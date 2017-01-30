angular.module('limerickApp').service('RequestService', function($http) {

  function getRhymes(word, callback) {
    $http({
      method: "GET",
      url: "http://api.datamuse.com/words?rel_nry="+word+"&md=p&max=10"
    }).then(callback, function errorCallback(response) {
      return response;
    });
  }

  return {
    getRhymes: getRhymes
  };
});
