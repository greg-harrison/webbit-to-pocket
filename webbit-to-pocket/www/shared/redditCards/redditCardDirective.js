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
                thing = $scope.$parent.thing.data;
//                tagArray = thing.tags.split(', ');
                $scope.carddata = {
//                    tags: tagArray,
                    subreddit: 'r/' + thing.subreddit,
                    title: thing.title,
                    link: thing.url,
                    score: thing.score
                };
            },
            templateUrl: 'shared/redditCards/redditCardTemplate.html'
        };
    }
}());