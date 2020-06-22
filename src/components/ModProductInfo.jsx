import React from 'react'
import { Dialog } from '@blueprintjs/core'

class ModProductInfo extends React.Component {

  render(){
    return(
      <div>
        <Dialog title="Modificar producto" 
                isOpen={this.props.isOpen}
                onClose={() => this.props.close()}>
        </Dialog>
      </div>
    )
  }

}

export default ModProductInfo