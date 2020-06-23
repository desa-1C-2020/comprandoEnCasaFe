import React from 'react'
import '../styles/LanguageSwitch.css'
import { Switch } from '@blueprintjs/core'

export class LanguageSwitch extends React.Component {

render(){
  return(
    <div className='ls-main-container'>
      <p className='ls-text'>{this.props.language === 'es' ? 'Español' : 'English'}</p>
      <Switch className='ls-btn' large={true} onChange={() => this.props.switchLang()}/>
    </div>
  )
}

}

export default LanguageSwitch;