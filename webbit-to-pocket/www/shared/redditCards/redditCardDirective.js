(function () {
    angular
        .module('directives.redditCard', [])
        .directive('redditCard', redditCard);

    function redditCard() {
        return {
            restrict: 'E', //Can only be instantiated by an Element <search-box>
            replace: true,
            scope: {
                collection: '='
            },
            controller: function($scope) {
                thing = $scope.$parent.thing;
                tagArray = thing.tags.split(', ');
                $scope.carddata = {
                    tags: tagArray,
                    subreddit: tagArray[0],
                    title: thing.title,
                    link: thing.link,
                    score: thing.score
                };
            },
            templateUrl: 'shared/redditCards/redditCardTemplate.html'
        };
    }
}());