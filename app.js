angular.module('limerickApp', []).controller("limerickController", function($scope, $http, RequestService) {

    var self = this;
    self.show = false;

    self.animateLeft = function(num) {
      self.id = 'tile' + num;
      self.container = document.getElementById(self.id);
      self.container.className = 'focus';
    };

    self.animateRight = function(num) {
      self.container.id = self.id;
      self.container.className = "tile";
    };

    this.buildLimerick = function(word, person) {
        RequestService.getRhymes(word, function(response) {
            $scope.rhymes = response.data;
            self.getNouns($scope.rhymes, person);
        });
    };

    self.getNouns = function(wordsArray, person) {
        var nouns = [];
        for (count = 0; count < wordsArray.length - 1; count++) {
            if (wordsArray[count].tags[0] === 'n') {
                nouns.push(wordsArray[count].word);
            }
        }
        var rand = Math.floor(Math.random() * nouns.length);
        self.noun = nouns[rand];
        self.getArticle(person);
    };

    self.getArticle = function(person) {
        if (person === 'man') {
          self.article = 'He';
        } else if (person === 'woman') {
          self.article = 'She';
        } else {
          self.article = 'It';
        }
        self.show = true;
    };

    self.getNounRhyme = function() {

    };

});
