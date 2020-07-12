import React from 'react'
import { FormattedNumber } from 'react-intl';

class FormattedCurrency extends React.Component {

  render(){
    return(
      // eslint-disable-next-line
      <FormattedNumber value={this.props.value} style={'currency'} currency={'ARS'}/>
    )
  }

}

export default FormattedCurrency;