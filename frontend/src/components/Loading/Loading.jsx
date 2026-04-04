import React from 'react';
import './Loading.css';

const Loading = ({ text = 'Loading...', fullScreen = false }) => (
  <div className={`loading-container ${fullScreen ? 'full-screen' : ''}`}>
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
    {text && <p className="loading-text">{text}</p>}
  </div>
);

export default Loading;