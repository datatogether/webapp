# webapp
<!-- Repo Badges for: Github Project, Slack, License-->

[![GitHub](https://img.shields.io/badge/project-Data_Together-487b57.svg?style=flat-square)](http://github.com/datatogether)
[![Slack](https://img.shields.io/badge/slack-Archivers-b44e88.svg?style=flat-square)](https://archivers-slack.herokuapp.com/)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE)

**Webapp** is the main public-facing web application from Data Together. Beta code runs on [archivers.co](https://archivers.co) and production code on [datatogether.org](https://datatogether.org).

Its main job is to get users to contribute metadata about content that has been crawled & archived.

## License & Copyright

Copyright (C) <year> Data Together
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free Software
Foundation, version 3.0.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

See the [`LICENSE`](./LICENSE) file for details.

## Getting Involved

We would love involvement from more people! If you notice any errors or would like to submit changes, please see our [Contributing Guidelines](./.github/CONTRIBUTING.md).

We use GitHub issues for [tracking bugs and feature requests](https://github.com/datatogether/webapp/issues) and Pull Requests (PRs) for [submitting changes](https://github.com/datatogether/webapp/pulls)


## Installation

To get started with dev, make sure you have [docker](https://store.docker.com/search?type=edition&offering=community) and [docker compose](https://docs.docker.com/compose/install/) And then run:

```shell
$ git clone git@github.com:datatogether/webapp.git
$ cd webapp
$ docker-compose up
```

This'll spin up a whole bunch of servers and make lots of noise. Once you see `webpack built` you can go to `http://localhost:3000` to see the app running locally.

## Development

Developing is as simple as editing files in source, if webpack can it'll automatically recompile & update your browser window. Def have the browser's console open to make sure nothing's exploding.

### Technologies

* [React.js](https://facebook.github.io/react/)
* [Redux Framework](https://redux.js.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Webpack 2](https://webpack.js.org)

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
