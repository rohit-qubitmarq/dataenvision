// routes.js
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

	 // Configure Idle settings
	IdleProvider.idle(5); // in seconds
	IdleProvider.timeout(120); // in seconds

	$urlRouterProvider.otherwise("/login");

	$ocLazyLoadProvider.config({
		// Set to true if you want to see what and when is dynamically loaded
		debug: true
	});
	var authenticated = ['$q', 'AuthFactory', function ($q, AuthFactory) {
		var deferred = $q.defer();
		AuthFactory.isLoggedIn(false)
			.then(function (isLoggedIn) {
				if (isLoggedIn) {
					deferred.resolve();
				} else {
					deferred.reject('Not logged in');
				}
			});
		return deferred.promise;
	  }];
	  
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: "login.html",
			controller: DashboardCtrl,
			data: {
				pageTitle: 'Login',
				requireLogin: false
			},
		})
		
		.state('register', {
			url: '/register',
			templateUrl: "register.html",
			controller: DashboardCtrl,
			data: {
				pageTitle: 'Register',
				requireLogin: false
			},
			resolve: {
				authenticated: authenticated,
				loadPlugin: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						{
							files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
						}
					]);
				}
			}
		})
		.state('dashboard',{
			// abstract: true,
			url:'/dashboard',
			templateUrl:"dashboard.html",
			controller: DashboardCtrl,
			data: {
				pageTitle: 'Welcome'
			},
			// resolve:{
			// 	authenticated: authenticated
			// }
			// data:{
			// 	requireLogin: true
			// }
		});
	}
	angular
	.module('dashboard')
	.config(config)
	.run(function($rootScope, $state) {
	$rootScope.$state = $state;
  	$rootScope.$on('$stateChangeError', function (err, req) {
    	$state.go('login');
  	});
});
