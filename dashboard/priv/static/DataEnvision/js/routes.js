// routes.js
function config($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: "login.html",
			controller: DashboardCtrl,
			data: {
				requireLogin: false
			}
		})
		
		.state('register', {
			url: '/register',
			templateUrl: "register.html",
			controller: DashboardCtrl,
			data: {
				pageTitle: 'Register',
				requireLogin: false
			}
		})

		.state('dashboard',{
			abstract: true,
			url:'/dashboard',
			templateUrl:"dashboard.html",
			controller: DashboardCtrl,
			data:{
				requireLogin: true
			}
		});
	}
	angular
	.module('dashboard')
	.config(config)
	.run(function($rootScope, $state) {
	$rootScope.$state = $state;
});

