(function (){
    angular
        .module('redditService', [])
        .factory('reddit', reddit);

    function reddit($http) {

        var subreddits = ['webdev', 'opensource', 'frontend', 'programming', 'javascript', 'dailyprogrammer'];
        var element = subreddits.toString().replace(/,/g, '+');
        var limit = 5;
        var url = "http://www.reddit.com/r/" + element + "/hot.json?limit=" + limit + "";

        var getLinks = function(){
            return $http.get(url)
                .then(function(body){
                    return body.data.data;
                });
        };

        return {
            getLinks: getLinks
        };
    }
}());