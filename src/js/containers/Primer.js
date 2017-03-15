import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectPrimer } from '../selectors/primers';
import { loadPrimer } from '../actions/primers';

import Spinner from '../components/Spinner';

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
  
  render() {
    const { loading } = this.state;
    const { primer } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="primers" className="page">
        <header className="container">
          <h1>{primer.host}</h1>
        </header>
        <div className="container">
          {primer.host}
        </div>
      </div>
    );
  }
}

Primer.propTypes = {
  id : PropTypes.string.isRequired,
  primer: PropTypes.object,
  loadPrimer: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id : ownProps.params.id,
    primer: selectPrimer(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, {
  loadPrimer,
})(Primer);
