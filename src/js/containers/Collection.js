import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import analytics from '../analytics';
import { selectCollection, selectLocalCollection } from '../selectors/collections';
import { selectAvailableUsers } from '../selectors/session';

import { 
  loadCollection,
  newCollection,
  editCollection,
  updateCollection,
  saveCollection,
  deleteCollection,
  cancelCollectionEdit,
} from '../actions/collections';
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
      "handleChange",
      "handleCancel",
      "handleSave",
      "handleEdit",
      "handleDelete",
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
    this.props.updateCollection(value);
  }
  handleCancel() {
    this.props.cancelCollectionEdit(this.props.local);
  }
  handleEdit() {
    this.props.editCollection(this.props.collection);
  }
  handleSave() {
    this.props.saveCollection(this.props.local, (collection) => {
      browserHistory.push(`/collections/${collection.id}`);
    });
  }
  handleDelete() {
    if (confirm("are you sure you want to delete this collection?")) {
      this.props.deleteCollection(this.props.collection, (collection) => {
        browserHistory.push(`/collections`);
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { collection, local, users, sessionKeyId } = this.props;

    if (loading) {
      return <Spinner />;
    } else if (!collection && !local) {
      return null;
    } else if (local) {
      return (
        <CollectionForm
          data={local}
          users={users}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
          onSubmit={this.handleSave}
        />
      );
    }

    return (
      <CollectionView data={collection} onEdit={this.handleEdit} onDelete={this.handleDelete} />
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
    users : selectAvailableUsers(state),
    local: selectLocalCollection(state, id),
    collection: selectCollection(state, id),
  };
}

export default connect(mapStateToProps, {
  loadCollection,
  newCollection,
  editCollection,
  updateCollection,
  saveCollection,
  deleteCollection,
  cancelCollectionEdit,
})(Collection);
