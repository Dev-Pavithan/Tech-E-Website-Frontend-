import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';
import logo from './Logo version04.png';
import ContactModal from '../Contact/contact.js'; // Import the ContactModal component

export default function Nav({ openLoginModal }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false); // State to show/hide the contact modal
  const [showPasswordChangePrompt, setShowPasswordChangePrompt] = useState(false); // New state for password change prompt
  const navigate = useNavigate();

  // Get the backend URL from environment variable
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendUrl =  "https://tech-e-website-backend.vercel.app"

  // Check if login modal should be shown after page reload
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    const showLoginModal = localStorage.getItem('showLoginModal') === 'true';
    const passwordChangeNeeded = localStorage.getItem('passwordChangeNeeded') === 'true'; // Detect if password change is needed

    if (passwordChangeNeeded) {
      setShowPasswordChangePrompt(true); // Show the password change prompt
      localStorage.removeItem('passwordChangeNeeded'); // Clear the flag after showing the prompt
    }

    if (showLoginModal) {
      openLoginModal();
      localStorage.removeItem('showLoginModal'); // Clear the flag after opening the modal
    }

    if (role === 'user') {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      try {
        const response = await fetch(`${backendUrl}/user/by-email/${email}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          fetchPackageDetails(userData.packages);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const fetchPackageDetails = async (packageIds) => {
    try {
      const packageDetails = await Promise.all(
        packageIds.map(async (packageId) => {
          const response = await fetch(`${backendUrl}/api/packages/${packageId}`);
          if (response.ok) {
            const packageData = await response.json();
            return packageData.name;
          } else {
            console.error('Error fetching package data:', response.statusText);
            return 'Unknown Package';
          }
        })
      );
      setPackages(packageDetails);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
    toast.success('Logout successful!');
    openLoginModal();
    localStorage.setItem('showLoginModal', 'true'); // Set the flag to show login modal after refresh
    window.location.reload(); // Refresh the page after logout
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Refresh the page instantly after login
    window.location.reload(); // This refreshes the page immediately after login
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleProfilePopover = () => {
    setShowProfilePopover((prev) => !prev);
  };

  const handleContactClick = () => {
    setShowContactModal(true); // Open the contact modal when Contact Us is clicked
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false); // Close the contact modal
  };

  const handlePasswordChange = () => {
    // Handle password change logic here (could link to a password change page or modal)
    setShowPasswordChangePrompt(false); // Hide prompt after password change
    window.location.reload(); // Refresh the page after password change
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand" onClick={handleLogoClick}>
          <img alt="Logo" src={logo} className="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/blog">Blog</Link>
            {/* Updated Contact Us link to open the modal */}
            <span className="nav-link" onClick={handleContactClick}>Contact Us</span>
          </div>
        </div>

        <div className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <div className="nav-link" onClick={toggleProfilePopover} title="Profile">
                <i className="fas fa-user-circle"></i>
              </div>

              {showProfilePopover && user && (
                <div className="profile-popover">
                  <div className="popover-content">
                    <h5>{user.name || 'User'}</h5>
                    <p>Email: {user.email}</p>
                    <h6>User Packages:</h6>
                    <ul>
                      {packages.length > 0 ? (
                        packages.map((pkgName, index) => (
                          <li key={index}>{pkgName}</li>
                        ))
                      ) : (
                        <li>No packages subscribed.</li>
                      )}
                    </ul>
                    <button onClick={handleLogout} className="btn btn-out">Logout</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="nav-link" onClick={openLoginModal}>
              <i className="fas fa-user"></i> Login
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal show={showContactModal} handleClose={handleCloseContactModal} />

      {/* Password Change Prompt */}
      {showPasswordChangePrompt && (
        <div className="password-change-prompt">
          <div className="prompt-content">
            <h5>Your previous password was found in a data breach. Please change your password now.</h5>
            <button onClick={handlePasswordChange} className="btn btn-primary">Change Password</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </nav>
  );
}
