angular.module('limerickApp', []).controller("limerickController", function($http, RequestService) {

    var self = this;
    self.show = false;

    self.slide = function(currentSlide, nextSlide) {
      var slide1 = document.getElementById("tile" + currentSlide);
      var slide2 = document.getElementById("tile" + nextSlide);
      slide1.className ="hide tile";
      slide2.className ="show tile";
    };

    self.startOver = function(currentSlide, nextSlide) {
      var slide1 = document.getElementById("tile" + currentSlide);
      var slide2 = document.getElementById("tile" + nextSlide);
      slide1.className ="hide tile";
      slide2.className ="show tile";
      self.person = '';
      self.noun1 = '';
      self.verb1 = '';
      self.adjective = '';
      self.verb2 = '';
      self.noun2 = '';
    };

    self.findRhyme1 = function(rhyme1) {
      self.rhymes1 = '';
        RequestService.getRhymes(rhyme1, function(response) {
          self.rhymes1 = response.data;
          if (response.data.length < 3) {
            alert('nothing rhymes well with your location, move somewhere else.');
          } else {
            self.getNoun1(self.rhymes1);
          }
        });
      };

      self.findRhyme2 = function(rhyme2) {
        RequestService.getRhymes(rhyme2, function(response) {
          self.rhymes2 = response.data;
          if (response.data.length === 0) {
            alert("I don't like that noun, make it better");
          } else {
            self.getNoun2(self.rhymes2);
          }
        });
        self.show = true;
    };

    self.getNoun1 = function(wordsArray) {
      self.nouns = [];
        for (count = 0; count < wordsArray.length - 2; count++) {
            if (wordsArray[count].hasOwnProperty('tags') && wordsArray[count].tags[0] === 'n') {
                self.nouns.push(wordsArray[count].word);
            }
        }
        var rand1 = Math.floor(Math.random() * self.nouns.length);
        var rand2 = Math.floor(Math.random() * self.nouns.length);
        self.rhyme1 = self.nouns[rand1];
        self.rhyme3 = self.nouns[rand2];
    };

    self.getNoun2 = function(wordsArray) {
        self.nouns2 = [];
        for (count = 0; count < wordsArray.length - 2; count++) {
            if (wordsArray[count].hasOwnProperty('tags') && wordsArray[count].tags[0] === 'n') {
                self.nouns2.push(wordsArray[count].word);
            }
        }
        var rand = Math.floor(Math.random() * self.nouns2.length);
        self.rhyme2 = self.nouns2[rand];
    };

    self.getArticle = function(person) {
        if (person === 'man') {
          self.article = 'He';
        } else if (person === 'woman') {
          self.article = 'She';
        } else {
          self.article = 'It';
        }
    };
});
