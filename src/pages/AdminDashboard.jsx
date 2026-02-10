import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, Edit, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [plumbers, setPlumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '', specialty: '', price: '', status: 'Available', location: '', image: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlumbers();
    }, []);

    const fetchPlumbers = async () => {
        try {
            const { data, error } = await supabase.from('plumbers').select('*').order('id', { ascending: true });
            if (error) throw error;
            setPlumbers(data);
        } catch (error) {
            console.error('Error fetching plumbers:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this plumber?')) {
            try {
                const { error } = await supabase.from('plumbers').delete().eq('id', id);
                if (error) throw error;
                fetchPlumbers();
            } catch (error) {
                alert('Error deleting plumber: ' + error.message);
            }
        }
    };

    const toggleStatus = async (plumber) => {
        const newStatus = plumber.status === 'Available' ? 'Busy' : 'Available';
        try {
            const { error } = await supabase.from('plumbers').update({ status: newStatus }).eq('id', plumber.id);
            if (error) throw error;
            fetchPlumbers();
        } catch (error) {
            alert('Error updating status: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const { error } = await supabase.from('plumbers').update(formData).eq('id', editId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('plumbers').insert([formData]);
                if (error) throw error;
            }
            setShowModal(false);
            setFormData({ name: '', specialty: '', price: '', status: 'Available', location: '', image: '' });
            setIsEditing(false);
            setEditId(null);
            fetchPlumbers();
        } catch (error) {
            alert('Error saving plumber: ' + error.message);
        }
    };

    const openEditModal = (plumber) => {
        setFormData({
            name: plumber.name,
            specialty: plumber.specialty,
            price: plumber.price,
            status: plumber.status,
            location: plumber.location,
            image: plumber.image
        });
        setIsEditing(true);
        setEditId(plumber.id);
        setShowModal(true);
    };

    if (loading) return <div className="p-4 text-center">Loading Dashboard...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: '#00baa3' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => {
                            setFormData({ name: '', specialty: '', price: '', status: 'Available', location: '', image: '' });
                            setIsEditing(false);
                            setShowModal(true);
                        }}
                        className="btn"
                        style={{ backgroundColor: '#2ecc71', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        <Plus size={18} /> Add Employee
                    </button>
                    <button onClick={handleLogout} className="btn" style={{ backgroundColor: '#e74c3c', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Specialty</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Location</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plumbers.map(plumber => (
                            <tr key={plumber.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '600' }}>{plumber.name}</div>
                                    <div style={{ fontSize: '0.86rem', color: '#666' }}>ID: {plumber.id}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{plumber.specialty}</td>
                                <td style={{ padding: '1rem' }}>{plumber.location}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => toggleStatus(plumber)}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            border: 'none',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            backgroundColor: plumber.status === 'Available' ? '#e8f5e9' : '#ffebee',
                                            color: plumber.status === 'Available' ? '#2ecc71' : '#e74c3c'
                                        }}
                                    >
                                        {plumber.status}
                                    </button>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                        <button onClick={() => openEditModal(plumber)} style={{ padding: '0.5rem', border: 'none', background: 'none', color: '#3498db', cursor: 'pointer' }}><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(plumber.id)} style={{ padding: '0.5rem', border: 'none', background: 'none', color: '#e74c3c', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={inputStyle} />
                            <input placeholder="Specialty" value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} required style={inputStyle} />
                            <input placeholder="Price (e.g. 199)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required style={inputStyle} />
                            <input placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required style={inputStyle} />
                            <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} style={inputStyle} />
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                                <option value="Available">Available</option>
                                <option value="Busy">Busy</option>
                            </select>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#00baa3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const inputStyle = {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem'
};

export default AdminDashboard;
