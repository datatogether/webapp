import React from 'react';
import { Link } from 'react-router';

const PrimerItem = ({ data }) => {
  const primer = data;

  return (
    <div className="search result item col-md-12">
      <Link to={`/primers/${primer.id}`} className="orange">
        <h3>{primer.title}</h3>
      </Link>
    </div>
  );
};

PrimerItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
};

PrimerItem.defaultProps = {
};

export default PrimerItem;
