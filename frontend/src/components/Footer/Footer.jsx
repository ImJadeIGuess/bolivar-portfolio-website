import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Divider line */}
        <div className="footer-divider"></div>

        {/* bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Jaderick Bordones. All rights reserved.
          </p>
          <p className="made-with">
            Made with <span className="heart">MERN STACK</span> Using <span className="VSC"> VSC</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;