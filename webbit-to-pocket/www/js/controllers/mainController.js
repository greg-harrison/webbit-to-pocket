(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, redditService) {
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
                });
        };
    }
}());