(function (){
    angular
        .module('mainController', ['redditService'])
        .controller('mainController', mainController);

    function mainController($scope, reddit) {
        var vm = $scope;

        vm.test = [];
        vm.test.push(reddit.getLinks().$$state.status);

        console.log(vm.test);

        vm.things = [
            { action: 'add',
                tags: 'r/Frontend, 2015 August',
                time: '1439573427',
                title: 'Compilation of best Frontend talks [video]',
                url: 'http://talks.ui-patterns.com',
                score: 100},
            { action: 'add',
                tags: 'r/programming, 2015 August',
                time: '1439573427',
                title: 'All Android operating systems infringe Java API packages, Oracle says',
                url: 'http://arstechnica.com/tech-policy/2015/08/all-android-operating-systems-infringe-java-api-packages-oracle-says/',
                score: 322},
            { action: 'add',
                tags: 'r/webdev, 2015 August',
                time: '1439573427',
                title: 'Recent "Technical" Phone Interview for a full stack position. Here were my questions.',
                url: 'http://www.reddit.com/r/webdev/comments/3gxd2f/recent_technical_phone_interview_for_a_full_stack/',
                score: 20},
            { action: 'add',
                tags: 'r/javascript, 2015 August',
                time: '1439573427',
                title: 'Learning JS? Feedback or questions about the sub? Subreddit stats? See inside!',
                url: 'http://www.reddit.com/r/javascript/comments/2upyol/learning_js_feedback_or_questions_about_the_sub/',
                score: 512},
            { action: 'add',
                tags: 'r/dailyprogrammer, 2015 August',
                time: '1439573427',
                title: 'r/DailyProgrammer is the subreddit of the day!',
                url: 'http://redd.it/3gumni',
                score: 230},
            { action: 'add',
                tags: 'r/opensource, 2015 August',
                time: '1439573427',
                title: 'A beautiful, super-thin laptop that makes Fedora shine',
                url: 'http://opensource.com/life/15/8/beautiful-super-thin-laptop-makes-fedora-shine',
                score: 623}
        ]
    }
}());