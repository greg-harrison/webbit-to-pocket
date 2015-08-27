(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, redditService, moment) {
        var vm = $scope;

        // "Pull to Refresh"
        vm.message = {description: 'Pull to Refresh', time: ''};
        vm.tagsBar = {placeholder: 'Subreddit'};

        var remove = function(array, index){
            array.splice(index, 1);
        };

        vm.newPosts = function(entry) {

            var searchVal = [];

            if (typeof vm.things == 'undefined') {
                vm.things = [];
            } else {
                remove(vm.things, vm.things.length);
            }

            if (typeof entry !== 'undefined') {
                searchVal = entry.map(function(elem){
                    return elem.text;
                }).join("+");
            }

            vm.errorMessage = "";

            function finish () {
               return vm.$broadcast('scroll.refreshComplete')
            }

            return redditService.getPosts(searchVal)
                .then(function (items) {
                    if (typeof items == 'undefined') {
                        items.splice(5, Number.MAX_VALUE);
                        vm.errorMessage = 'Sorry about that!';
                        vm.message = {description: 'Last Attempt:', time: moment().format("h:mm a")};
                        finish();
                    } else {
                        items.splice(5, Number.MAX_VALUE);
                        vm.things = items;
                        vm.message = {description: 'Last Updated:', time: moment().format("h:mm a")};
                        finish();
                    }
                }, function() {
                    vm.errorMessage = 'Sorry about that!';
                    vm.message = {description: 'Last Attempt:', time: moment().format("h:mm a")};
                    finish();
                })
        };
    }
}());