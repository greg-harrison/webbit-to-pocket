(function () {
    angular
        .module('directives.redditCard', [])
        .directive('redditCard', redditCard);

    function redditCard(moment) {
        return {
            restrict: 'E', //Can only be instantiated by an Element <search-box>
            replace: true,
            scope: {
                collection: '='
            },
            controller: function($scope) {

                var vm = $scope;

                var thing = vm.$parent.thing.data;

                var subredditData = thing.subreddit,
                    dateMonth = moment().format('MMMM'),
                    dateYear = moment().format('YYYY');

                var tagData = "r/"+subredditData + ", " + dateYear + " " + dateMonth;

                var tagArray = tagData.split(', ');

                vm.carddata = {
                    tags: tagArray,
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