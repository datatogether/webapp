import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
// import { debounce } from 'lodash';

import analytics from '../analytics';
import { search } from '../actions/search';
import { loadUserByUsername } from '../actions/user';
import { archiveUrl } from '../actions/url';
import { selectSessionUser } from '../selectors/session';
import { selectSearchQuery, selectSearchResults } from '../selectors/search';

import Footer from '../components/Footer';
import RotatingText from '../components/RotatingText';

class Home extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleSearchChange",
      "handleArchiveUrl",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    analytics.page("home");
  }

  handleSearchChange(e) {
    this.props.search(e.target.value);
  }

  handleArchiveUrl(url) {
    this.props.archiveUrl(url).then(() => {
      browserHistory.push(`/url?url=${url}`);
    });
  }

  render() {
    const { session } = this.props;

    return (
      <div id="home" className="page">
        <div className="masthead">
          <img className="left-lines" src="https://s3.amazonaws.com/datatogether/svg/lines_left.svg" />
          <h1 className="tagline"> <RotatingText color="#3bb563" text={["Storing","Replicating","Rescuing","Annotating","Analyzing","Monitoring"]} displayTime={2500} transitionTime={1000} /> Data <br/> Together</h1>
          <img className="right-lines" src="https://s3.amazonaws.com/datatogether/svg/lines_right.svg" />
          <div className="clear"></div>
        </div>
        <div className="signup container">
          <div className="row">
            <div className="text col-md-6">
              <p className="sub-emphasis">
                Data Together is a new model for distributed, community-driven stewardship of data. This model shows how groups of people, companies, institutions, NGOs, and governments can use decentralized and peer-to-peer web infrastructure to access, discover, verify, and preserve data they care about. We hope to build a future in which networks of collaborators make their data accessible to their peers, immediately discoverable, easily verifiable, and robustly preserved.
              </p>
              <Link to={session ? "/primers" : "/signup"} className="btn btn-large bg-red white">Get Started</Link>
            </div>
            <div className="image col-md-4 offset-md-2">
              <img src="https://s3.us-east-2.amazonaws.com/static.archivers.space/add-metadata.png" />
            </div>
          </div>
        </div>
        <div className="left" style={{ height: 200, width: "20%", maxWidth: 200, marginRight: 25, marginTop: 100 }}>
          <img className="left-lines" src="https://s3.amazonaws.com/datatogether/svg/lines_left.svg" />
        </div>
        <div className="signup dweb-view container">
          <div className="row">
            <div className="image col-md-4">
              {/*<img src="https://s3.us-east-2.amazonaws.com/static.archivers.space/add-metadata.png" />*/}
            </div>
            <div className="text col-md-6">
              <p className="emphasis">
                This site is not a centralized data hosting service. It’s a view onto the decentralized network of individuals, organizations, projects and communities who are using the Data Together model.
              </p>
            </div>
          </div>
        </div>
        <div className="right" style={{ height: 200, width: "20%", maxWidth: 300, marginLeft: 25, marginTop: 100 }}>
          <img className="right-lines" src="https://s3.amazonaws.com/datatogether/svg/lines_right.svg" />
        </div>
        <div className="signup community container">
          <div className="row">
            <div className="text col-md-6 sub-emphasis">
              <p>
                Data Together is an ongoing, inclusive conversation, an open source community, a collaboration, a model, and a collection of tools, all of which are evolving quickly. To achieve our aims, we are
                <ul>
                  <li>Developing conceptual and technical models for communities, using decentralized and peer-to-peer infrastructure</li>
                  <li>Articulating the patterns of actors and technologies involved, and value propositions for those actors</li>
                  <li>Creating proof-of-concept tools that communities can use to collectively steward data</li>
                </ul>
              </p>
              <p>
              There are many ways to get involved and to contribute, the most important of which  is to test the Data Together model with your community and then share back where things work, where the approach opens new possibilities, and where there’s room for improvement.
              </p>
            </div>
            <div className="image col-md-4 offset-md-2">
              {/*<img src="https://s3.us-east-2.amazonaws.com/static.archivers.space/add-metadata.png" />*/}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  // pages: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const session = selectSessionUser(state);
  return Object.assign({
    session,
    query: selectSearchQuery(state),
    results: selectSearchResults(state),
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadUserByUsername,
  archiveUrl,
  search,
})(Home);
