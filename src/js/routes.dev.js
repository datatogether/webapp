/*
 *
 * Gooby pls. Don 4get to update the prod routes.js file
 */
import App from './containers/App';
import Archives from './containers/Archives';
import Collection from './containers/Collection';
import Collections from './containers/Collections';
import Content from './containers/Content';
import Home from './containers/Home';
import Login from './containers/Login';
import Primers from './containers/Primers';
import Primer from './containers/Primer';
import Subprimer from './containers/Subprimer';
import Signup from './containers/Signup';
import Stylesheet from './components/Stylesheet';
import Keys from './containers/Keys';
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
      path: "/archives",
      component: Archives,
    },
    {
      path: "/collections",
      component: Collections,
    },
    {
      path: "/collections/:id",
      component: Collection,
    },
    {
      path: "/content/:hash",
      component: Content,
    },
    {
      path: '/settings',
      component: UserSettings,
    },
    {
      path: '/settings/keys',
      component: Keys,
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
    {
      path: '/primers',
      component: Primers,
    },
    {
      path: '/primers/:id',
      component: Primer,
    },
    {
      path: '/subprimers/:id',
      component: Subprimer,
    },
  ],
};
