import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectSubprimer } from '../selectors/subprimers';
import { loadSubprimer } from '../actions/subprimer';

import Spinner from '../components/Spinner';
import StatsBar from '../components/StatsBar';

class Subprimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: (props.subprimer == undefined),
    };

    [].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadSubprimer(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subprimer && this.state.loading) {
      this.setState({ loading: false });
    }
  }
  
  render() {
    const { loading } = this.state;
    const { subprimer } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div id="subprimers" className="page">
        <div className="container">
          <header className="row">
            <div className="col-md-12">
              <label>Subprimer</label>
              <h1>{subprimer.url}</h1>
            </div>
          </header>
          <div className="row">
            <div className="col-md-12">
              <hr className="orange" />
              <StatsBar stats={{ 
                "urls": subprimer.stats.urlCount,
                "content": subprimer.stats.contentUrlCount,
                "documented": subprimer.stats.contentMetadataCount,
                }}
              />
              <hr className="orange" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>{subprimer.url}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Subprimer.propTypes = {
  id : PropTypes.string.isRequired,
  subprimer: PropTypes.object,
  loadSubprimer: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    id : ownProps.params.id,
    subprimer: selectSubprimer(state, ownProps.params.id),
  };
}

export default connect(mapStateToProps, {
  loadSubprimer,
})(Subprimer);
