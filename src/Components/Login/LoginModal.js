import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Google from './google.png';
import './LoginModal.css';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrl =  "https://tech-e-website-backend.vercel.app"


const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    return [formData, handleChange, setFormData];
};

const storeUserDetails = ({ name, email, blocked, role, packages, userId, token }) => {
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userBlocked', blocked);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userPackages', JSON.stringify(packages));
};

const handleRedirect = (role, navigate) => {
    const paymentAmount = sessionStorage.getItem('tempPaymentAmount');
    if (paymentAmount && role !== 'admin') {
        sessionStorage.removeItem('tempPaymentAmount');
        navigate('/payment');
    } else if (role === 'admin') {
        navigate('/admin');
    } else {
        navigate('/');
    }
};

export default function LoginModal({ show, handleClose, openRegisterModal }) {
    const [formData, handleChange, setFormData] = useForm({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGoogleAPI = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => {
                window.google.accounts.id.initialize({
                    client_id: 'YOUR_GOOGLE_CLIENT_ID',
                    callback: handleGoogleResponse,
                });
            };
            script.onerror = () => {
                console.error('Failed to load Google API script');
                toast.error('Failed to load Google API. Please try again later.');
            };
            document.body.appendChild(script);
        };

        loadGoogleAPI();
    }, []);

    const handleGoogleResponse = async (response) => {
        if (response.credential) {
            try {
                const decodedData = JSON.parse(atob(response.credential.split('.')[1]));
                const userData = {
                    email: decodedData.email,
                    name: decodedData.name,
                    id: decodedData.sub,
                };
                const loginResponse = await axios.post(`${backendUrl}/user/login`, userData);
                storeUserDetails(loginResponse.data);
                toast.success('Login successful! Redirecting...', { position: 'top-right', autoClose: 5000 });

                handleCloseModal();

                setTimeout(() => {
                    handleRedirect(loginResponse.data.role, navigate);
                    window.location.reload();
                }, 5000);
            } catch (error) {
                console.error('Google login failed:', error);
                toast.error('Google login failed. Please try again.');
            }
        } else {
            console.error('Google login failed. No credential received.');
            toast.error('Google login failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const loginResponse = await axios.post(`${backendUrl}/user/login`, formData);
            storeUserDetails(loginResponse.data);
            toast.success('Login successful! Redirecting...', { position: 'top-right', autoClose: 5000 });

            handleCloseModal();

            setTimeout(() => {
                handleRedirect(loginResponse.data.role, navigate);
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response && error.response.status === 401) {
                toast.error('Invalid email or password. Please try again.');
            } else {
                toast.error('Login failed. Please try again later.');
            }
        }
    };

    const handleCloseModal = () => {
        handleClose();
        setFormData({ email: '', password: '' });
        setErrors({});
    };

    return (
        <Modal show={show} onHide={handleCloseModal} className="login-modal">
            <Modal.Header closeButton />
            <Modal.Body className="modal-body">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-head">Login</h2>
                    <div className="form-group email-group">
                        <label htmlFor="email" className="form-label-login">Email</label>
                        <input
                            type="email"
                            className={`form-control email-input ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password" className="form-label-login">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className="toggle-password-login"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                        </div>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="form-group forgot-password-group">
                        <a href="#!" className="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn-primary login-button">Login</button>
                    <div className="register-prompt">
                        <p className="register-text">
                            Don't have an account?{' '}
                            <span onClick={openRegisterModal} className="register-link">
                                Register
                            </span>
                        </p>
                    </div>
                    <div className="register-divider">
                        <span className="divider-line"></span>
                        <span className="divider-text">OR</span>
                        <span className="divider-line"></span>
                    </div>
                    <button
                        type="button"
                        className="google-button"
                        onClick={() => window.google.accounts.id.prompt()}
                    >
                        <img className="GoogleImageIcon" src={Google} alt="Google" /> Sign in with Google
                    </button>
                </form>
            </Modal.Body>
            <ToastContainer />
        </Modal>
    );
}
