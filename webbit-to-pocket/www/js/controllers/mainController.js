(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, redditService, moment) {
        var vm = $scope;

        // "Pull to Refresh"
        vm.message = {description: 'Pull to Refresh', time: ''};

        var remove = function(array, index){
            array.splice(index, 1);
        };

        vm.newPosts = function(entry) {

            if (typeof vm.things == 'undefined') {
                vm.things = [];
            } else {
                remove(vm.things, vm.things.length);
            }

            vm.things = [];

                if (typeof entry !== 'undefined') {

                    var search = entry.map(function(elem){
                        return elem.text;
                    }).join("+");

                    console.log(entry.length);

                    vm.errorMessage = "";

                    redditService.getPosts(search)
                        .then(function (items) {
                            if (typeof items == 'undefined') {
                                vm.errorMessage = 'Sorry about that!';
                                vm.message = {description: 'Last Attempt:', time: moment().format("h:mm a")};
                            } else if (entry.length == 1) {
                                items.splice(5, Number.MAX_VALUE);
                                vm.things = items;
                            } else {
                                vm.things = items;

                                // "Last Updated: 3:25 pm"
                                vm.message = {description: 'Last Updated:', time: moment().format("h:mm a")};
                            }
                        }, function() {
                            vm.errorMessage = 'Sorry about that!';
                            vm.message = {description: 'Last Attempt:', time: moment().format("h:mm a")};
                        });
                    vm.$broadcast('scroll.refreshComplete');
                } else {
                    vm.message = {description: 'Last Attempt:', time: moment().format("h:mm a")};

                    vm.$broadcast('scroll.refreshComplete');
                    vm.errorMessage = "There was an error!";
                }
        };
    }
}());