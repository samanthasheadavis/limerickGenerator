angular.module('limerickApp', []).controller("limerickController", function($scope, $http, RequestService){
  var self = this;
  this.isNoun = function(noun) {
    return noun === "n";
  };

  this.getRhymes = function(word) {
    RequestService.getRhymes(word, function(response) {
      $scope.rhymes = response.data;
      self.getNouns($scope.rhymes);
    });
  };

  self.getNouns = function(wordsArray) {
    var nouns = [];
    var rand = Math.floor(Math.random()*wordsArray.length);
    for (count=0; count<wordsArray.length-1; count++) {
      if (wordsArray[count].tags[0] === 'n') {
        nouns.push(wordsArray[count].word);
      }
    }
    self.noun = nouns[rand];
    console.log(self.noun);
  };
});
