import React from 'react'
import '../styles/notfound.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="error-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="error-title pb-5">404</h1>
                    </div>
                    <div className="col-md-6">
                        <p className="error-message pt-5">Ooops, This Page Could Not Be Found!</p>
                        <Link to="/">
                            <button className="back-button">Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound