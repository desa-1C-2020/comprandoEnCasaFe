import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    Ops!
                </h1>
                <div className="desc">
                    No hay nada que ver por acá....
                </div>
                <Link to="/login"><button className="go-back-btn btn btn-primary" type="button">Vamos al login que funciona..</button></Link>
            </div>
        );
    }
}

export default NotFound;