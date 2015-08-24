(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, redditService, moment) {
        var vm = $scope;

        vm.buttonCounter = 0;

        vm.numRolls = function () {
           return "Num Rolls: " + vm.buttonCounter;
        };


        vm.newPosts = function() {
            vm.buttonCounter++;

            vm.numRolls();

            vm.things = [];

            redditService.getPosts()
                .then(function (items) {
                    vm.things = items;

                    vm.message = {
                        description: 'Last Updated:',
                        time: moment().format("M-D-YYYY, h:mm:ss") // "Sunday, February 14th 2010, 3:25:50 pm"
                    };
                });
        };
    }
}());