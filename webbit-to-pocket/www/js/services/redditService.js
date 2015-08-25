(function (){
    angular
        .module('redditService', [])
        .factory('redditService', reddit);

    function reddit($http) {

        return {
            getPosts: getPosts
        };

        function getPosts(searchVal) {
            console.log(searchVal);

            var subreddits = ['webdev', 'opensource', 'frontend', 'programming', 'javascript', 'dailyprogrammer'];
            var limit = subreddits.length || 5;
            var element = searchVal || subreddits.toString().replace(/,/g, '+');
            var url = "http://www.reddit.com/r/" + element + "/hot.json?limit=" + limit + "";

            function extract(response) {
                return response.data.data.children;
            }

            function getPostsFailed(error) {
                console.log('XHR Failed for getPosts.' + error.data);
            }


            //EACH
            //FOR each loop iterate over the return statement


            return $http.get(url)
                .then(extract)
                .catch(getPostsFailed);

        }
    }
}());