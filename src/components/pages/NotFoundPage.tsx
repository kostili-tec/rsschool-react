import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import errorImage from '../../assets/error404.png';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="error-page">
        <div className="error-container">
          <img src={errorImage} alt="error-image" />
          <div className="error-description">
            <h1>404</h1>
            <p>Just slowly go home!</p>
            <h2>You saw nothing...</h2>
            <NavLink to={'/'} className="error-button">
              {'Home'}
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
