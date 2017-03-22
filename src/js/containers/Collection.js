import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { selectCollection, selectLocalCollection } from '../selectors/collections';
import { loadCollection, newCollection, editCollection } from '../actions/collections';
import { selectDefaultKeyId } from '../selectors/keys';

import Spinner from '../components/Spinner';
import List from '../components/List';
import ContentItem from '../components/item/ContentItem';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    [

    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadCollection(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collection && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  renderContents() {
    const { collection } = this.props;
    if (!collection.contents) {
      return undefined;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <hr className="green" />
            <h3 className="green">Contents:</h3>
            <br />
          </div>
        </div>
        <div className="row">
          <List data={collection.contents} component={ContentItem} />
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const { collection, sessionKeyId } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="collection" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <hr className="green" />
              <label className="label">Collection</label>
              <h1 className="green">{collection.title}</h1>
            </div>
          </header>
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <p>{collection.description}</p>
            </div>
            {sessionKeyId ? <Link to="/collections/new">New Collection</Link> : undefined}
          </div>
          {this.renderContents()}
        </div>
      </div>
    );
  }
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  sessionKeyId: PropTypes.string,

  collection: PropTypes.object,
  // local: PropTypes.object,
  loadCollection: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const sessionKeyId = selectDefaultKeyId(state);

  return {
    id: ownProps.params.id,
    sessionKeyId,
    local: selectLocalCollection(state, ownProps.params.id),
    collection: selectCollection(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, {
  loadCollection,
  newCollection,
  editCollection,
})(Collection);
