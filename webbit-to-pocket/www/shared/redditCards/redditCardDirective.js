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
                var vm = $scope,

                    thing = vm.$parent.thing.data,

                    domain = null,

                    subredditData = thing.subreddit,
                    dateMonth = moment().format('MMMM'),
                    dateYear = moment().format('YYYY'),

                    tagData = "r/"+ subredditData + ", " + dateYear + " " + dateMonth,
                    tagArray = tagData.split(', ');

                console.log(vm.$parent.$id);

                if (!thing.domain.indexOf('self.')) {
                    domain = 'reddit';
                    tagArray.push(domain);
                } else {
                    domain = thing.domain;
                    tagArray.push(domain);
                }

                vm.titleShow = true;

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