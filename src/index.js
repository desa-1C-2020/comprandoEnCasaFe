import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Container/>
    </Router>,
    document.getElementById('root')
);
