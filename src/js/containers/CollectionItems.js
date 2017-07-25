import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import analytics from '../analytics';
import { selectSessionUser } from '../selectors/session';
import { selectCollectionItems } from '../selectors/collections';

import { 
  loadCollectionItems,
  saveCollectionItems,
  deleteCollectionItems,
} from '../actions/collections';

// import List from '../components/List';
// import CollectionItem from '../components/item/CollectionItem';
import Spinner from '../components/Spinner';

class CollectionItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selected : [],
    };

    [].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    analytics.page('collections');
    this.props.loadCollectionItems(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { items } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="collection items table">
              <thead>
                <tr>
                  <th>hash</th>
                  <th>url</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr key={i} className="">
                      {/*<td>{ hash && <Link to={`/content/${hash}`}><h5 className="title">{hash}</h5></Link>}</td>*/}
                      <td>{ item.hash && <a href={`https://ipfs.io/ipfs/${item.hash}`} target="_blank"><p className="title">{item.hash}</p></a>}</td>
                      <td><Link to={`/url?url=${item.url}`}>{item.url}</Link></td>
                      <td>{item.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

CollectionItems.propTypes = {
  id : PropTypes.string.isRequired,
  loadCollectionItems: PropTypes.func.isRequired,
  deleteCollectionItems: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id : ownProps.id,
    user: selectSessionUser(state),
    items: selectCollectionItems(state, ownProps.id),
  };
}

export default connect(mapStateToProps, {
  loadCollectionItems,
  deleteCollectionItems,
})(CollectionItems);
