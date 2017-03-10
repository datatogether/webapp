/*
 *
 * Gooby pls. Don 4get to update the prod routes.js file
 */
import App from './containers/App';
import Content from './containers/Content';
import Home from './containers/Home';
import Login from './containers/Login';
import MetadataList from './containers/MetadataList';
import Signup from './containers/Signup';
import Stylesheet from './containers/Stylesheet';
import SshKeys from './containers/SshKeys';
import Url from './containers/Url';
import User from './containers/User';
import UserSettings from './containers/UserSettings';

export default {
  path: "/",
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: "/url",
      component: Url,
    },
    {
      path: "/content/:hash",
      component: Content,
    },
    {
      path: "/metadata/:hash",
      component: MetadataList,
    },
    {
      path: '/settings',
      component: UserSettings,
    },
    {
      path: '/settings/keys',
      component: SshKeys,
    },
    {
      path: '/users/:user',
      component: User,
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/stylesheet',
      component: Stylesheet,
    },
  ],
};
