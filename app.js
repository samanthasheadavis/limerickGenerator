angular.module('limerickApp', []).controller("limerickController", function($scope, $http, RequestService) {

    var self = this;
    self.show = false;

    self.animateLeft = function(num) {
      self.percent = -12.5*(parseInt(num)) + '%';
      self.container = document.getElementById("main-container");
      self.container.setAttribute("style", "transform: translateX(" +self.percent+ ")");
    };

    self.animateRight = function(num) {
      self.container = document.getElementById("main-container");
      self.container.setAttribute("style", "transform: translateX(0%)");
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
