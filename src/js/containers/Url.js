import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectUrl, selectOutboundLinks } from '../selectors/url';
import { loadUrl, loadOutboundLinks, archiveUrl } from '../actions/url';

// import ValidInput from '../components/ValidInput';
// import ValidTextarea from '../components/ValidTextarea';
// import validateUser from '../validators/user';

import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';

class Url extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: !!props.url,
    };

    [
      // 'handleChange',
      // 'handleSave',
      // 'handleDelete'
      'handleArchive',
    ].forEach(m => this[m] = this[m].bind(this));
  }

  componentWillMount() {
    this.props.loadUrl(this.props.urlParam);
    this.props.loadOutboundLinks(this.props.urlParam);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.urlParam != this.props.urlParam) {
      this.props.loadUrl(nextProps.urlParam);
      this.props.loadOutboundLinks(this.props.urlParam);
      this.setState({ loading: true });
    } if (nextProps.url && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  // handleDelete(key) {
  //   this.props.deleteSshKey(key.name, key.sha256);
  // }
  // handleChange(name, value, e) {
  //   let key = Object.assign({}, this.state.key)
  //   key[name] = value;
  //   this.setState({ key });
  // }
  // handleSave(e) {
  //   const { user, validation, createSshKey } = this.props;
  //   e.preventDefault();

  //   // if (!validation.isValid) {
  //   //  if (!this.state.showErrors) {
  //   //    this.setState({ showErrors : true });
  //   //  }
  //   // } else {
  //     this.setState({ saving : true });
  //     createSshKey(this.state.key.name, this.state.key.key);
  //   // }
  // }

  handleArchive(e) {
    this.props.archiveUrl(this.props.url.url);
  }

  render() {
    const { loading } = this.state;
    const { user, url, outboundLinks } = this.props;
    
    if (loading) {
      return <Spinner />
    }

    if (!url) {
      return <NotFound />
    }

    return (
      <div className="container">
        <h3>{url.url}</h3>
        <p>{url.hash}</p>
        <div className="clear"></div>
        {url.hash ? undefined : <button className="btn btn-primary" onClick={this.handleArchive}>Archive Url</button>}
        <h3>Outbound Links</h3>
        {outboundLinks.map((url, i) => {
          return <p key={i}>{url.url}</p>
        })}
      </div>
    );
  }
}

Url.propTypes = {
  user: PropTypes.object,
  url: PropTypes.object,
  loadUrl: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const urlParam = ownProps.location.query.url;

  return Object.assign({
    // user : selectLocalSessionUser(state),
    urlParam,
    url: selectUrl(state, urlParam),
    outboundLinks : selectOutboundLinks(state, urlParam),
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadUrl,
  loadOutboundLinks,
  archiveUrl,
})(Url);