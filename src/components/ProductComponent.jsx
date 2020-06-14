import React from 'react'

export class ProductComponent extends React.Component {

	render() {
    return (
      <div>
        <h1>Resultados de Búsqueda</h1>
        {this.props.products}
      </div>
		);
	}
}

export default ProductComponent