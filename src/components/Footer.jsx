import React from 'react';
import { Phone, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <>
            <footer className="footer-desktop">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>PlumFix</h3>
                            <p>Serving Jalna & Nearby Areas</p>
                        </div>
                        <div className="social-links">
                            <a href="#" className="social-link instagram"><Instagram size={24} /></a>
                            <a href="#" className="social-link whatsapp"><MessageCircle size={24} /></a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 PlumFix. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <div className="sticky-mobile-footer">
                <a href="tel:7219304433" className="sticky-btn">
                    <Phone size={20} /> Call Coordinator Now
                </a>
            </div>
        </>
    );
};

export default Footer;
