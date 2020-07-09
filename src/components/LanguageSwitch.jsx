import React from 'react'
import '../styles/LanguageSwitch.css'
import { Switch } from '@blueprintjs/core'

export class LanguageSwitch extends React.Component {

render(){
  return(
    <div className='ls-main'>
      <div className='ls-main-container'>
        <p className='ls-text'>{this.props.language === 'es' ? 'Español' : 'English'}</p>
        <Switch className='ls-btn' large={true} onChange={() => this.props.switchLang()}/>
      </div>
      <div className="mobile">
        <p onClick={() => this.props.switchLang()}>
          {this.props.language === 'es' ? 'Change language to English' : 'Cambiar idioma a Español'}
        </p>
      </div>
    </div>
  )
}

}

export default LanguageSwitch;