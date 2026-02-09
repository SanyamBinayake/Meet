import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <div className="logo">
                    <h2>PlumFix</h2>
                    <span className="slogan">Your pipe our responsibility</span>
                </div>

                <div className="desktop-nav">
                    <a href="#services">Services</a>
                    <a href="#workflow">How it Works</a>
                    <a href="#reviews">Reviews</a>
                    <a href="tel:7219304433" className="cta-button pulse-animation">
                        <Phone size={18} />
                        <span>Call Coordinator</span>
                    </a>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                    <a href="#workflow" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
                    <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
                    <a href="tel:7219304433" className="mobile-cta" onClick={() => setIsMobileMenuOpen(false)}>
                        <Phone size={18} /> Call Coordinator
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
