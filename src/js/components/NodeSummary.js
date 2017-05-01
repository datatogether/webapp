import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ProgressBar from './ProgressBar';

// TODO - remove this badness
import { archiveService } from '../selectors/archiveServices';

export default class NodeDetails extends React.Component {
	render() {
		const { node } = this.props;
		return (
			<div className="node detail source">
				<br />
				<h3>{node.name}</h3>
				<p>{node.numDescendantsArchived || 0} / {node.numDescendants} | {Math.floor((node.numDescendantsArchived / node.numDescendants || 0.001)*100)}% complete</p>
				<ProgressBar progress={node.numDescendantsArchived} total={node.numDescendants} />
				{node.coverage && <h4>Coverage:</h4>}
				<ul>
				{node.coverage && node.coverage.map((c, i) => {
					let s = archiveService(c.serviceId);
					console.log(s, c.serviceId);
					if (!s) { return null; }
					return (
						<div key={i}>
							<p>{i}. {s.name}</p>
						</div>
					);
				})}
				</ul>
			</div>
		);
	}
}

NodeDetails.propTypes = {
	node: PropTypes.object.isRequired,
}

NodeDetails.defaultProps = {

}