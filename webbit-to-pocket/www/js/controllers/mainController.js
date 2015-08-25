(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, redditService, moment) {
        var vm = $scope;

        vm.buttonCounter = 0;

        vm.master = {};

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
                        vm.things = items;

                        vm.message = {
                            description: 'Last Updated:',
                            time: moment().format("M-D-YYYY, h:mm:ss") // "Sunday, February 14th 2010, 3:25:50 pm"
                        };
                    }, function(reason) {
                        vm.errorMessage = 'Sorry about that!';
                    });
                vm.$broadcast('scroll.refreshComplete');
            } else {
                vm.$broadcast('scroll.refreshComplete');
                vm.errorMessage = "Woops!";
            }
        }
    }
}());