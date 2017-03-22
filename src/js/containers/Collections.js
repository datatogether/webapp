import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectCollections } from '../selectors/collections';
import { loadCollections } from '../actions/collections';

import List from '../components/List';
import CollectionItem from '../components/item/CollectionItem';
import Spinner from '../components/Spinner';

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    [].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadCollections();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collections && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { collections } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="collections" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <hr className="green" />
              <h1 className="green">Collections:</h1>
              <p>Collections are groupings of content</p>
              <hr className="green" />
            </div>
          </header>
          <div className="row">
            <br />
            <List data={collections} component={CollectionItem} />
          </div>
        </div>
      </div>
    );
  }
}

Collections.propTypes = {
  // user: PropTypes.object,
  collections: PropTypes.array,
  loadCollections: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    collections: selectCollections(state),
  };
}

export default connect(mapStateToProps, {
  loadCollections,
})(Collections);
