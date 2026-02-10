import React, { useEffect, useState } from 'react';
import PlumberCard from './PlumberCard';
import { supabase } from '../lib/supabase';

const PlumberList = () => {
    const [plumbers, setPlumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlumbers();
    }, []);

    const fetchPlumbers = async () => {
        try {
            const { data, error } = await supabase
                .from('plumbers')
                .select(`
                    *,
                    reviews (
                        user_name,
                        rating,
                        comment,
                        created_at
                    )
                `)
                .order('id', { ascending: true });

            if (error) throw error;

            // Calculate average rating dynamically
            const plumbersWithStats = data.map(plumber => {
                const reviews = plumber.reviews || [];
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                // If new reviews exist, use average. If not, fallback to default 'rating' from DB (or kept as base).
                // Actually, let's prioritize the calculated average if there are reviews. 
                // If mixed with seed data, this might drop rating if seed reviews aren't in 'reviews' table.
                // Assuming 'reviews' table is the source of truth now.

                const avgRating = reviews.length > 0
                    ? (totalRating / reviews.length).toFixed(1)
                    : plumber.rating;

                return { ...plumber, rating: avgRating };
            });

            setPlumbers(plumbersWithStats);

        } catch (err) {
            console.error('Error fetching plumbers:', err);
            // Fallback to mock data if DB fails (graceful degradation)
            // or just set error
            setError('Could not load plumbers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="plumber-list-section" id="services">
                <div className="container">
                    <p style={{ textAlign: 'center' }}>Loading expert plumbers...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="plumber-list-section" id="services">
            <div className="container">
                <h2>Our Top Rated Plumbers</h2>
                {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

                <div className="plumber-grid">
                    {plumbers.length > 0 ? (
                        plumbers.map(plumber => (
                            <PlumberCard key={plumber.id} plumber={plumber} onReviewAdded={fetchPlumbers} />
                        ))
                    ) : (
                        !error && <p style={{ textAlign: 'center', width: '100%' }}>No plumbers found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PlumberList;
