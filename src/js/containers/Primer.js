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

  renderCrawlUrls() {
    const { primer } = this.props;
    if (!primer.crawlUrls) {
      return undefined;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3>SubPrimers:</h3>
          </div>
        </div>
        {primer.crawlUrls.map((crawlUrl, i) => {
          return (
            <div key={i} className="row">
              <div className="col-md-12">
                <p>{crawlUrl.url}</p>
              </div>
            </div>
          );
        })}
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
              <h1>{primer.title}</h1>
            </div>
          </header>
          <div className="row">
            <div className="col-md-6">
              <p>{primer.description}</p>
            </div>
          </div>
          {this.renderCrawlUrls()}
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
