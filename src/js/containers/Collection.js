import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import analytics from '../analytics';
import { selectCollection, selectLocalCollection } from '../selectors/collections';
import { loadCollection, newCollection, editCollection } from '../actions/collections';
import { selectDefaultKeyId } from '../selectors/keys';

import Spinner from '../components/Spinner';
import List from '../components/List';
import ContentItem from '../components/item/ContentItem';
import CollectionForm from '../components/form/CollectionForm';
import CollectionView from '../components/Collection';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !(props.id == "new"),
    };

    [

    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    analytics.page('collection');
    (this.props.id == "new") ?
      this.props.newCollection(this.props.sessionKeyId):
      this.props.loadCollection(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collection && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  handleChange(name, value) {

  }
  handleCancel() {
    
  }
  handleSave() {
    
  }

  render() {
    const { loading } = this.state;
    const { collection, local, sessionKeyId } = this.props;

    if (loading) {
      return <Spinner />;
    } else if (!collection && !local) {
      return null;
    } else if (local) {
      return (
        <CollectionForm
          data={local}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
          onSubmit={this.handleSave}
        />
      );
    }

    return (
      <CollectionView data={collection} />
    );
  }
}

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  sessionKeyId: PropTypes.string,

  collection: PropTypes.object,
  local: PropTypes.object,
  loadCollection: PropTypes.func.isRequired,
  // editCollection: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.params;
  const sessionKeyId = selectDefaultKeyId(state);

  return {
    id,
    sessionKeyId,
    local: selectLocalCollection(state, id),
    collection: selectCollection(state, id),
  };
}

export default connect(mapStateToProps, {
  loadCollection,
  newCollection,
  editCollection,
})(Collection);
