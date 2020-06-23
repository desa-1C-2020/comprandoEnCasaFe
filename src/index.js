import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { IntlProvider } from 'react-intl';
import messages_es from "./translations/es.json";
import messages_en from "./translations/en.json";

const messages = {
  'es': messages_es,
  'en': messages_en
};

//TODO - cambiar el lenguaje desde el front de alguna forma
const language = 'en'//navigator.language.split(/[-_]/)[0];

ReactDOM.render(
<IntlProvider
  locale={language}
  defaultLocale={'es'}
  messages={messages[language]}
>
  <App />
</IntlProvider>, 
document.getElementById('root'))
