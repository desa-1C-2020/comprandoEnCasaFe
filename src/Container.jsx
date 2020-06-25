import React from 'react'
import { IntlProvider } from 'react-intl';
import { LanguageSwitch } from './components/LanguageSwitch'
import App from './App'
import messages_es from "./translations/es.json";
import messages_en from "./translations/en.json";

class Container extends React.Component {
  
  constructor(){
    super();
    this.state = {
      locale: 'es',
      messages: {
        'es': messages_es,
        'en': messages_en
      }
    }
    this.changeLocale = this.changeLocale.bind(this)
  }

  changeLocale = () => this.state.locale === 'es' ? this.setState({locale: 'en'}) : this.setState({locale: 'es'})

  render() {
    return (
      <IntlProvider locale={this.state.locale} messages={this.state.messages[this.state.locale]} >
        <App/>
        <LanguageSwitch language={this.state.locale} switchLang={this.changeLocale}/>
      </IntlProvider>
    )
  }
}

export default Container