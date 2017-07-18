# Context webapp
### An Archivers 2.0 joint

Context is a volunteer-facing webapp from the archivers 2.0 [proposed services](https://github.com/edgi-govdata-archiving/proposed-services). See it in action [here](https://alpha.archivers.space).

It's main job is to get users to contribute metadata about content that has been crawled & archived.

### Technologies

* [React.js](https://facebook.github.io/react/)
* [Redux Framework](https://redux.js.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Webpack 2](https://webpack.js.org)

### Getting Started

To get started with dev, make sure you have [docker](https://store.docker.com/search?type=edition&offering=community) and [docker compose](https://docs.docker.com/compose/install/) And then run:

```shell
$ git clone git@github.com:datatogether/context.git
$ cd context
$ docker-compose up
```

this'll spin up a whole bunch of servers and make lots of noise. Once you see `webpack built` you can go to `http://localhost:3000` to see the app running locally.

Developing is as simple as editing files in source, if webpack can it'll automatically recomplie & update your browser window. Def have the browser's console open to make sure nothing's exploding.

### Project Organization

* `src/js/actions/` - everything the app can "do"
* `src/js/components/` - react.js components
* `src/js/containers/` - "smart" react.js components that read data from the redux state object
* `src/js/middleware/` - middleware intercepts fired-off actions, performing tasks like API calls & logging
* `src/js/propTypes/` - react.js propType definitions for reuse around the app
* `src/js/reducers/` - redux reducers that map actions to 
* `src/js/selectors/` - functions that pull computed logic out of state
* `src/js/store/` - redux store configuration
* `src/js/validators/` - validation logic that checks models, returning error message validation objects