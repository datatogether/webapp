/*
 *
 * Gooby pls. Don 4get to update the prod routes.js file
 */
import App from './containers/App';
import ArchiveUrl from './containers/ArchiveUrl';
import PublicRecord from './containers/PublicRecord';
import Coverage from './containers/Coverage';
import Collection from './containers/Collection';
import Collections from './containers/Collections';
import Communities from './containers/Communities';
import Content from './containers/Content';
import FileEditor from './containers/FileEditor';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './components/NotFound';
import Primers from './containers/Primers';
import Primer from './containers/Primer';
import Source from './containers/Source';
import Signup from './containers/Signup';
import Stylesheet from './containers/Stylesheet';
import Tasks from './containers/Tasks';
import Keys from './containers/Keys';
import Url from './containers/Url';
import User from './containers/User';
import UserSettings from './containers/UserSettings';
import Uncrawlables from './containers/Uncrawlables';
import Uncrawlable from './containers/Uncrawlable';

import Activities from './components/activities/Activities';
import Harvesting from './components/activities/Harvesting';
import Monitoring from './components/activities/Monitoring';
import Storing from './components/activities/Storing';
import Analyzing from './components/activities/Analyzing';

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
      path: '/coverage',
      component: Coverage,
    },
    {
      path: '/communities',
      component: Communities,
    },
    {
      path: "/url",
      component: Url,
    },
    {
      path: "/add-dataset",
      component: ArchiveUrl,
    },
    {
      path: "/public-record",
      component: PublicRecord,
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
      path: '/users/:user/settings',
      component: UserSettings,
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
      path: '/sources/:id',
      component: Source,
    },
    {
      path: '/tasks',
      component: Tasks,
    },
    {
      path: '/uncrawlables',
      component: Uncrawlables,
    },
    {
      path: '/uncrawlables/:id',
      component: Uncrawlable,
    },
    {
      path: '/edit',
      component: FileEditor,
    },
    {
      path: '/activities',
      component: Activities,
    },
    {
      path: '/activities/harvesting',
      component: Harvesting
    },
    {
      path: '/activities/monitoring',
      component: Monitoring
    },
    {
      path: '/activities/storing',
      component: Storing
    },
    {
      path: '/activities/analyzing',
      component: Analyzing,
    },
    {
      path: "/*",
      component: NotFound,
    },
  ],
};
