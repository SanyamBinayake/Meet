import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AddReview = ({ plumberId, onClose, onReviewAdded }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const { error } = await supabase
                .from('reviews')
                .insert([
                    {
                        plumber_id: plumberId,
                        user_name: name,
                        rating: rating,
                        comment: comment
                    }
                ]);

            if (error) throw error;

            // Optionally update plumber's average rating here or rely on trigger/calculation
            onReviewAdded();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px',
                position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
                <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Write a Review</h3>

                {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Rating</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    <Star size={24} fill={star <= rating ? "#ffb703" : "none"} stroke="#ffb703" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows="4"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical' }}
                            placeholder="Share your experience..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            backgroundColor: '#00baa3', color: 'white', padding: '0.75rem', border: 'none',
                            borderRadius: '6px', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer',
                            marginTop: '0.5rem'
                        }}
                    >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;
