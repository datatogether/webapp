import React from 'react'
import App from './containers/App'
import Stylesheet from './containers/Stylesheet'

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => cb(null, module.default);
}

export default {
	path : "/",
	component: App,
	indexRoute : { component : Stylesheet },
	// getIndexRoute(partialState, cb) {
	// 	import('./containers/Stylesheet').then(loadRoute(cb)).catch(errorLoading)
	// },
	childRoutes: [
		{
			path: '/login',
			getComponent(location, cb) {
			 import('./containers/Login').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/settings',
			getComponent(location, cb) {
				import('./containers/UserSettings').then(loadRoute(cb)).catch(errorLoading);
			},
			childRoutes : [
				{
					path : "/keys",
					getComponent(location, cb) {
						import('./containers/SshKeys').then(loadRoute(cb)).catch(errorLoading);
					}
				}
			]
		},
		{
			path : '/users/:user',
			getComponent(location, cb) {
				import('./containers/User').then(loadRoute(cb)).catch(errorLoading);
			}
		}
 ]
};