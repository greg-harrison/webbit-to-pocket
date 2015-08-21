(function (){
    angular
        .module('redditService', [])
        .factory('redditService', reddit);

    function reddit($http) {

        return {
            getPosts: getPosts
        };

        function getPosts() {

            var subreddits = ['webdev', 'opensource', 'frontend', 'programming', 'javascript', 'dailyprogrammer'];
            var element = subreddits.toString().replace(/,/g, '+');
            var limit = 5;
            var url = "http://www.reddit.com/r/" + element + "/hot.json?limit=" + limit + "";

            function extract(response) {
                return response.data.data.children;
            }

            function getPostsFailed(error) {
                console.log('XHR Failed for getPosts.' + error.data);
            }

            return $http.get(url)
                .then(extract)
                .catch(getPostsFailed);

        }
    }
}());