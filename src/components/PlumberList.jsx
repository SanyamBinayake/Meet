import React from 'react';
import PlumberCard from './PlumberCard';
import plumbers from '../data/plumbers.json';

const PlumberList = () => {
    return (
        <section id="services" className="plumber-list-section">
            <div className="container">
                <h2>Our Top Rated Plumbers</h2>
                <div className="plumber-grid">
                    {plumbers.map(plumber => (
                        <PlumberCard key={plumber.id} plumber={plumber} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlumberList;
