import React from 'react'
import App from './containers/App'
import Home from './containers/Home'

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => cb(null, module.default);
}

export default {
	path : "/",
	component: App,
	indexRoute : { component : Home },
	// getIndexRoute(partialState, cb) {
	// 	import('./containers/Home').then(loadRoute(cb)).catch(errorLoading)
	// },
	childRoutes: [
		{
			path: '/login',
			getComponent(location, cb) {
			 import('./containers/Login').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/url',
			getComponent(location, cb) {
			 import('./containers/Url').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/content/:hash',
			getComponent(location, cb) {
			 import('./containers/Content').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '/metadata/:hash',
			getComponent(location, cb) {
			 import('./containers/MetadataList').then(loadRoute(cb)).catch(errorLoading);
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
						import('./containers/Keys').then(loadRoute(cb)).catch(errorLoading);
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