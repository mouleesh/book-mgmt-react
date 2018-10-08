import React from 'react';
import './footer.css';
import ustLogo from './ust-logo.png';

export const Footer = () => {
    return (
        <footer className="bg-light footer-shadow m-t-11">
            <img src={ustLogo} width="115" alt="footer brand logo" />
            <small className="footer-text">&copy; Designed and developed by: VCoderz. </small>
        </footer>
    );
}