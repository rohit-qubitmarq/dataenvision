'use strict';

(function () {
	angular.module('dashboard', [
		'ui.router',					// Routing
		'dashboard.services',			// AuthFactory service
		'oc.lazyLoad',					// ocLazyLoad
		'ui.bootstrap',					// Ui Bootstrap
		'pascalprecht.translate',		// Angular Translate
		'ngIdle'						// Idle timer
		])
})();