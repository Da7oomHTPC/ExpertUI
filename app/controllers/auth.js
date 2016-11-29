/**
 * @overview This controller handles authentication process.
 * @author Martin Vach
 */
/**
 * Auth default controller
 * @class AuthController
 *
 */
appController.controller('AuthController', function($location) {
    $location.path('/home');

});

/**
 * Auth installer controller
 * @class AuthInstallerController
 *
 */
appController.controller('AuthInstallerController', function($scope, $location,cfg, $window,dataService,deviceService) {
    $scope.input = {
        login: '',
        password: ''
    };

    /**
     * Login proccess
     */
    $scope.login = function (input) {
        $scope.loading = {status: 'loading-spin', icon: 'fa-spinner fa-spin', message: $scope._t('loading')};
        dataService.logInApi(input).then(function (response) {
            var user = response.data.data;
            console.log(user)
            deviceService.setZWAYSession(user.sid);
            deviceService.setUser(user);
            //window.location = location;
            $location.path('/home');
            $window.location.reload();
        }, function (error) {
            $scope.loading = false;
            var message = $scope._t('error_load_data');
            if (error.status == 401) {
                message = $scope._t('error_load_user');
            }
            alertify.alertError(message);
        });
    };
    /**
     * Login proccess
     */
    $scope.login_ = function (input) {
        //$scope.loading = {status: 'loading-spin', icon: 'fa-spinner fa-spin', message: $scope._t('loading')};
        if (input.login !== cfg.auth.login || input.password !== cfg.auth.password) {
            alertify.alertError($scope._t('error_load_user'));
            $scope.input = {
                login: '',
                password: ''
            };
            return;
        }
        $location.path('/home');
    };

});