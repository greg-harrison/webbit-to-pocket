(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, redditService, moment) {
        var vm = $scope;

        vm.buttonCounter = 0;

        vm.master = {};

        // "Pull to Refresh"
        vm.message = {description: 'Pull to Refresh', time: ''};

        vm.numRolls = function () {
            if (vm.buttonCounter == 0) {
                return "Swipe down to pull posts from Reddit";
            } else {
                return "Pull number " + vm.buttonCounter;
            }
        };

        vm.newPosts = function(entry) {

            vm.buttonCounter++;
            vm.numRolls();

            if (typeof entry !== 'undefined' && entry.value !== null) {
                var newVal = entry.value.toString().replace(/\s/g, '+');
                vm.master = angular.copy(newVal);
                vm.errorMessage = "";

                vm.things = [];

                redditService.getPosts(vm.master)
                    .then(function (items) {
                        if (typeof items == 'undefined') {
                            vm.errorMessage = 'Sorry about that!';
                            vm.message = {description: 'Last Attempt:', time: moment().format("h:mm:ss")};
                        } else {
                            vm.things = items;

                            // "Last Updated: 8-25-2015, 3:25:50"
                            vm.message = {description: 'Last Updated:', time: moment().format("h:mm:ss")};
                        }
                    }, function() {
                        vm.errorMessage = 'Sorry about that!';
                        vm.message = {description: 'Last Attempt:', time: moment().format("h:mm:ss")};
                    });
                vm.$broadcast('scroll.refreshComplete');
            } else {
                vm.message = {description: 'Last Attempt:', time: moment().format("h:mm:ss")};

                vm.$broadcast('scroll.refreshComplete');
                vm.errorMessage = "There was an error!";
            }
        }
    }
}());