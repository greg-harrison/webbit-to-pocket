(function () {
    angular
        .module('config', [])
        .run(run);

        function run($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

                ionic.Platform.isFullScreen = true;

                document.addEventListener('focusout', function(e) {window.scrollTo(0, 0)});
            });
        }
}());