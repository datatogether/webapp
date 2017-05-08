import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ProgressBar from './ProgressBar';

// TODO - remove this badness
import { archiveService } from '../selectors/archiveServices';
import { completionColor } from '../selectors/coverage';

export default class NodeDetails extends React.Component {
	render() {
		const { node, path } = this.props;
		if (!node) {
			return null;
		}

		return (
			<div className="node detail source">
				<br />
				<strong>{path || node.name}</strong>
				<p>{node.numDescendantsArchived || 0} / {node.numDescendants} | {Math.floor((node.numDescendantsArchived / node.numDescendants || 0.001)*100)}% complete</p>
				<ProgressBar backgroundColor={completionColor(node)} progress={node.numDescendantsArchived} total={node.numDescendants} />
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
	node: PropTypes.object,
}

NodeDetails.defaultProps = {

}