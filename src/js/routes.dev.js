/*
 * 
 * Gooby pls. Don 4get to update the prod routes.js file 
 */
import React from 'react'
import App from './containers/App'
import Login from './containers/Login'
import User from './containers/User'
import UserSettings from './containers/UserSettings'
import Signup from './containers/Signup'
import Stylesheet from './containers/Stylesheet'
import SshKeys from './containers/SshKeys'

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => {
		return cb(null, module.default);
	}
}

export default {
	path : "/",
	component: App,
	indexRoute: { component : Stylesheet },
	// getIndexRoute(partialState, cb) {
	// 	import('./containers/Namespace').then(loadRoute(cb)).catch(errorLoading)
	// },
	childRoutes: [
		{
			path: '/login',
			component : Login
		},
		{
			path: '/settings',
			component : UserSettings
		},
		{
			path: '/settings/keys',
			component : SshKeys
		},
		{
			path: '/users/:user',
			component: User
		},
		{
			path: '/invites/:id',
			component : Signup
		},
		{
			path: '/stylesheet',
			component: Stylesheet
		},
 ]
};