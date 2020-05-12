import React from 'react'
import '../styles/ResultBox.css'

export class ResultBox extends React.Component {

	render() {
    return (
      <div className="box">
        <p className="text">{this.props.name} - {this.props.address}</p>
      </div>
		);
	}
}

export default ResultBox