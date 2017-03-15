import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectPrimers } from '../selectors/primers';
import { loadPrimers } from '../actions/primers';

import List from '../components/List';
import PrimerItem from '../components/item/PrimerItem';
import Spinner from '../components/Spinner';

class Primers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    [].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadPrimers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.primers && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { primers } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="primers" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <h1>Primers:</h1>
            </div>
          </header>
          <div className="row">
            <List data={primers} component={PrimerItem} />
          </div>
        </div>
      </div>
    );
  }
}

Primers.propTypes = {
  // user: PropTypes.object,
  primers: PropTypes.array,
  loadPrimers: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    primers: selectPrimers(state),
  };
}

export default connect(mapStateToProps, {
  loadPrimers,
})(Primers);
