import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wrench, Droplets } from 'lucide-react';

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Professional Plumbing Services Starting at ₹199/-',
            subtitle: 'Verified Experts. Transparent Pricing. One Call Solution.'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Emergency Leak Repairs & Drainage Solutions',
            subtitle: 'Fast Response in Jalna & Surrounding Areas.'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Complete Bathroom & Kitchen Fittings',
            subtitle: 'Expert Installation Guaranteed.'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    return (
        <section className="hero-container">
            <div className="hero-carousel">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 50, 70, 0.7), rgba(0, 50, 70, 0.7)), url('${slide.image}')`
                        }}
                    >
                        <div className="container hero-text-content">
                            <h1 className={index === currentSlide ? "slide-up" : ""}>{slide.title}</h1>
                            <p className={index === currentSlide ? "fade-in delay-200" : ""}>{slide.subtitle}</p>
                            <a href="tel:7219304433" className={`hero-cta ${index === currentSlide ? "bounce-in delay-400" : ""}`}>
                                Call Coordinator Now
                            </a>
                        </div>
                    </div>
                ))}
                <div className="carousel-indicators">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="trust-badges-bar">
                <div className="container trust-badges-container">
                    <div className="trust-item">
                        <ShieldCheck size={20} />
                        <span>Verified Pros</span>
                    </div>
                    <div className="trust-item">
                        <Wrench size={20} />
                        <span>Expert Service</span>
                    </div>
                    <div className="trust-item">
                        <Droplets size={20} />
                        <span>Leak Specialists</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
