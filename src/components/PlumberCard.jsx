import React, { useState } from 'react';
import { Star, MessageCircle, Phone, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';
import AddReview from './AddReview';

const PlumberCard = ({ plumber, onReviewAdded }) => {
    const [showReviews, setShowReviews] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);

    const handleReviewAdded = () => {
        alert('Review submitted successfully!');
        // Refresh the list to show new review and updated rating
        if (onReviewAdded) onReviewAdded();
    };

    return (
        <div className="plumber-card">
            <div className="card-header">
                <div className={`status-indicator ${plumber.status.toLowerCase()}`}>
                    <span className="dot"></span>
                    <span className="status-text">{plumber.status}</span>
                </div>
                <img src={plumber.image} alt={plumber.name} className="profile-img" />
            </div>
            <div className="card-body">
                <div className="name-badge">
                    <h3>{plumber.name}</h3>
                    <div className="verified-badge">
                        <CheckCircle size={14} /> Verified Expert
                    </div>
                </div>

                <div className="rating-row">
                    <div className="stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < Math.floor(plumber.rating) ? "#ffb703" : "none"} stroke="#ffb703" />
                        ))}
                    </div>
                    <span className="rating-text">{plumber.rating}</span>
                    <span className="review-count">({plumber.reviews ? plumber.reviews.length : 0} reviews)</span>
                </div>

                <div className="specialty-chips">
                    <span className="chip specialty">{plumber.specialty}</span>
                    <span className="chip location">{plumber.location}</span>
                    <span className="chip price">From ₹{plumber.price}</span>
                </div>

                <div className="reviews-section">
                    <button
                        className="toggle-reviews-btn"
                        onClick={() => setShowReviews(!showReviews)}
                    >
                        {showReviews ? 'Hide Reviews' : 'Show Recent Reviews'}
                        {showReviews ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showReviews && (
                        <div className="reviews-list">
                            {plumber.reviews && plumber.reviews.length > 0 ? (
                                plumber.reviews.slice(0, 2).map((review, idx) => (
                                    <div key={idx} className="review-item">
                                        <div className="review-header">
                                            <span className="review-user">{review.user_name || review.user}</span>
                                            <span className="review-rating"><Star size={10} fill="#ffb703" stroke="none" /> {review.rating}</span>
                                        </div>
                                        <p className="review-comment">"{review.comment}"</p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>No reviews yet.</p>
                            )}
                        </div>
                    )}
                    <button className="add-review-btn" onClick={() => setShowAddReview(true)}>Write a Review</button>
                </div>

                <div className="action-buttons">
                    <a href="tel:7219304433" className="btn btn-primary">
                        <Phone size={18} /> Book Now
                    </a>
                    <a
                        href={`https://wa.me/917219304433?text=Hi, I want to book ${plumber.name} for a service starting at ₹199.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                    >
                        <MessageCircle size={18} /> WhatsApp
                    </a>
                </div>
            </div>

            {showAddReview && (
                <AddReview
                    plumberId={plumber.id}
                    onClose={() => setShowAddReview(false)}
                    onReviewAdded={handleReviewAdded}
                />
            )}
        </div>
    );
};

PlumberCard.propTypes = {
    plumber: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        specialty: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        reviews: PropTypes.arrayOf(PropTypes.shape({
            user_name: PropTypes.string,
            user: PropTypes.string,
            comment: PropTypes.string,
            rating: PropTypes.number
        }))
    }).isRequired
};

export default PlumberCard;
