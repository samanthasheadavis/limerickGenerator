angular.module('limerickApp', []).controller("limerickController", function($scope, $http, RequestService) {

    var self = this;
    self.show = false;

    self.slide = function(currentSlide, nextSlide) {
        var slide1 = document.getElementById("tile" + currentSlide);
        var slide2 = document.getElementById("tile" + nextSlide);
        slide1.className = "hide";
        slide2.className = "show";
    };

    this.buildLimerick = function(rhyme1, rhyme2) {
        RequestService.getRhymes(rhyme1, function(response) {
            if (response.data.length === 0) {
            } else {
                $scope.rhymes1 = response.data;
                self.getNoun1($scope.rhymes1);
            }
        });
        RequestService.getRhymes(rhyme2, function(response) {
            if (response.data.length === 0) {
            } else {
                $scope.rhymes2 = response.data;
                self.getNoun2($scope.rhymes2);
            }
        });
        self.show = true;
    };

    self.getNoun1 = function(wordsArray) {
        self.nouns = [];
        for (count = 0; count < wordsArray.length - 1; count++) {
            if (wordsArray[count].tags[0] === 'n') {
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
        for (count = 0; count < wordsArray.length - 1; count++) {
            if (wordsArray[count].tags[0] === 'n') {
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
