import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Google from './google.png';
import './RegisterModal.css';

const loadGoogleScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => resolve();
        document.body.appendChild(script);
    });
};

export default function RegisterModal({ show, handleClose, openLoginModal }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadGoogleScript().then(() => {
            window.google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID',
                callback: handleGoogleResponse,
            });
        });
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        setFormErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
    };
    
    const validateForm = () => {
        const errors = {};
    
        // Check for missing fields
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    
        // Validate email format
        const emailRegex = /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format. Email should not start with an uppercase letter.';
        }
    
        // Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (formData.password && !passwordRegex.test(formData.password)) {
            errors.password =
                'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a special character.';
        }
    
        // Check if passwords match
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            toast.error('Please correct the errors in the form.');
            return;
        }
    
        // Proceed with API call if the form is valid
        try {
            const response = await axios.post('http://localhost:7100/user/register', formData);
            toast.success('Registration successful! You can now log in.', {
                position: 'top-right',
                autoClose: 3000,
            });
    
            setTimeout(() => {
                handleClose();
                openLoginModal();
            }, 3000);
        } catch (error) {
            console.error('Registration failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to register. Please try again.';
            toast.error(errorMessage);
        }
    };
    
    
    

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleGoogleResponse = async (response) => {
        if (response.credential) {
            const userData = {
                name: response.profileObj.name,
                email: response.profileObj.email,
                id: response.profileObj.sub,
            };

            try {
                const res = await axios.post('http://localhost:7100/user/register', userData);
                console.log('Google Registration successful:', res.data);
                toast.success('Registration successful! You can now log in.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                setTimeout(() => {
                    navigate('/'); // Redirect to homepage after registration
                }, 5000);
            } catch (error) {
                console.error('Google registration failed:', error);
                const errorMessage = error.response?.data?.message || 'Failed to register with Google. Please try again.';
                toast.error(errorMessage);
            }
        } else {
            toast.error('Google registration failed. Please check your browser settings.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="register-modal">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <form onSubmit={handleSubmit} className="register-form">
                    <h2 className="login-head">Register</h2>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label-register">Name</label>
                        <input
                            type="text"
                            className="form-control name-input "
                            id="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label-register">Email</label>
                        <input
                            type="email"
                            className="form-control email-input"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password" className="form-label-register">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control password-input"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                        </div>
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="confirmPassword" className="form-label-register">Confirm Password</label>
                        <div className="password-container">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="form-control password-input"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="password-toggle"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary btn-rgister">Register</button>

                    <div className="register-prompt">
                        <p>
                            Already have an account? 
                            <span onClick={() => { handleClose(); openLoginModal(); }} className="login-link">
                                Login
                            </span>
                        </p>
                    </div>

                    <div className="register-divider">
                        <span>or</span>
                    </div>

                    <button type="button" className="google-button" onClick={() => window.google.accounts.id.prompt()}>
                        <img className="GoogleImageIcon" src={Google} alt="Google" /> Sign up with Google
                    </button>
                </form>
            </Modal.Body>
            <ToastContainer />
        </Modal>
    );
}
