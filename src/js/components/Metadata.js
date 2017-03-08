import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// Metadata is a static metadata viewer
export default class Metadata extends Component {
	constructor(props) {
		super(props);
	}
	handleClickTitle() {

	}
	render() {
		const { metadata } = this.props;
		return (
			<div id="metadata" style={style}>
				<div className="container">
					
				</div>
			</div>
		)
	}
}

Metadata.propTypes = {
	metadata : React.PropTypes.object,
}

Metadata.defaultProps = {
}

const Key = ({ key }) => <div className="key">{key}</div>
Key.propTypes = { key : PropTypes.string.isRequired }

function renderValue(key, prop, i, className="col value") {
	const typeClass = typeClass(prop)
	if (Array.isArray(val)) {
		return <ArrayValue index={i} key={key} value={val} />
	} else if (Object.isObject(val)) {
		return <ObjectValue index={i} key={key} value={val} />
	} else if (val == null) {
		return <NullProp index={i} key={key} />
	} else {
		return (
			<div index={i}>
				<Key key={key} />
				<div className={`${typeClass} value`}>{val}</div>
			</div>
		);
	}
}

function typeClass(val) {
	switch (typeof val) {
		case 'number':
			return "number"
		case 'boolean':
			return "boolean"
		case 'string':
			return "string"
		default:
			return "unknown"
	}
}
