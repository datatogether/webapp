import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import analytics from '../analytics';

import { archiveUrl } from '../actions/tasks';
import { selectDefaultKeyId } from '../selectors/keys';

import Spinner from '../components/Spinner';
import List from '../components/List';
import ValidInput from '../components/form/ValidInput';

class ArchiveUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      url: "",
    };

    [
      "handleChange",
      "handleArchiveUrl",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    analytics.page('archiveUrl');
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }
  handleArchiveUrl() {
    this.props.archiveUrl(this.state.url);
  }

  render() {
    const { loading, url } = this.state;

    return (
      <div className="page">
        <div className="container">
          <div className="col-md-6 offset-md-2">
            <hr />
            <h4>Archive a Url</h4>
            <ValidInput
              name="url"
              label="url to archive"
              value={url}
              onChange={this.handleChange}
              placeholder="http://dataseturl.gov"
            />
            <button className="btn btn-primary" onClick={this.handleArchiveUrl}>Archive</button>
          </div>
        </div>
      </div>
    );
  }
}

ArchiveUrl.propTypes = {
  id: PropTypes.string.isRequired,
  sessionKeyId: PropTypes.string,
  archiveUrl: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  const sessionKeyId = selectDefaultKeyId(state);

  return {
    sessionKeyId,
  };
}

export default connect(mapStateToProps, {
  archiveUrl,
})(ArchiveUrl);
