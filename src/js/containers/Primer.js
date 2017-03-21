import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectPrimer } from '../selectors/primers';
import { loadPrimer } from '../actions/primers';

import Spinner from '../components/Spinner';
import List from '../components/List';
import SubprimerItem from '../components/item/SubprimerItem';

class Primer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    [].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadPrimer(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.primer && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  renderSubprimers() {
    const { primer } = this.props;
    if (!primer.subprimers) {
      return undefined;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <hr className="orange" />
            <h3 className="orange">Subprimers:</h3>
            <br />
          </div>
        </div>
        <div className="row">
          <List data={primer.subprimers} component={SubprimerItem} />
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const { primer } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="primers" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <hr className="orange" />
              <label className="label">Primer</label>
              <h1 className="orange">{primer.title}</h1>
            </div>
          </header>
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <p>{primer.description}</p>
            </div>
          </div>
          {this.renderSubprimers()}
        </div>
      </div>
    );
  }
}

Primer.propTypes = {
  id: PropTypes.string.isRequired,
  primer: PropTypes.object,
  loadPrimer: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    primer: selectPrimer(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, {
  loadPrimer,
})(Primer);
