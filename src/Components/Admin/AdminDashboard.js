import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { t } = useTranslation(); // Integrating i18n translation hook
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);  // New state to track the switch
  
  const userName = localStorage.getItem('userName') || 'Admin';
  const userEmail = localStorage.getItem('userEmail') || 'admin@example.com';

  // Get the backend URL from the environment variable
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendUrl =  "https://tech-e-website-backend.vercel.app"

  const getButtonClassName = (path) => {
    return location.pathname === path ? 'btn btn-primary-AD active' : 'btn btn-primary-AD';
  };

  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/home');
    }

    const fetchUserProfileImage = async () => {
      try {
        const res = await axios.get(`${backendUrl}/user/profile-image`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        setProfileImage(res.data.profileImageUrl || 'path/to/default-placeholder.png');
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchUserProfileImage();
  }, [location.pathname, navigate, backendUrl]);

  const handleHomeNavigation = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToggleSwitch = () => {
    setIsDarkMode(!isDarkMode);  // Toggle the dark mode state
  };

  return (
    <div className="admin-dashboard">
      <div className="left-navbar">
        <h1
          style={{ cursor: 'pointer' }}
          onClick={handleHomeNavigation}
        >
          {t('Tech-E Admin')}
        </h1>

        <div className="profile-section-left">
          {/* Move the switch here, above the profile section */}
          <div className="dark-mode-switch">
            <input 
              id="checkbox-input-left" 
              type="checkbox" 
              checked={isDarkMode} // Bind the switch to the state
              onChange={handleToggleSwitch} // Update state when toggled
            />
            <label className="switch" htmlFor="checkbox-input-left">
              <svg
                style={{ enableBackground: "new 0 0 128 128" }}
                viewBox="0 0 128 128"
                height="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M77.547 113.65H49.591v-4.279h27.956v4.279zm0-11.711H49.591v4.279h27.956v-4.279zm38.587-32.576-12.209-3.271.92-3.434 12.209 3.271-.92 3.434zm-104.268 0-.92-3.434 12.209-3.271.92 3.434-12.209 3.271zm92.979-24.913-.92-3.434 12.209-3.272.92 3.434-12.209 3.272zm-81.69 0-12.209-3.272.92-3.434 12.209 3.272-.92 3.434zM94.82 25.247l-2.514-2.514 8.938-8.938 2.514 2.514-8.938 8.938zm-61.64 0-8.937-8.938 2.514-2.514 8.937 8.938-2.514 2.514zm43.358-11.618-3.434-.92L76.376.5l3.434.92-3.272 12.209zm-25.076 0L48.191 1.42 51.625.5l3.272 12.209-3.435.92z"
                  style={{ fill: "#a7a79b" }}
                ></path>
                <path
                  d="M59.802 64.141h7.535v34.934h-7.535V64.141zm3.767-44.754c-18.485-.53-33.631 14.817-33.631 33.824 0 9.781 4.016 18.581 10.431 24.753 5.637 5.423 9.222 13.147 9.222 21.111h7.84V64.141H51.75c-4.44 0-8.051-3.612-8.051-8.051s3.612-8.051 8.051-8.051 8.052 3.612 8.052 8.051v5.681h7.535V56.09c0-4.44 3.612-8.051 8.052-8.051 4.44 0 8.051 3.612 8.051 8.051s-3.612 8.051-8.051 8.051h-5.682v34.934h7.84c0-7.964 3.584-15.688 9.222-21.111C93.184 71.792 97.2 62.992 97.2 53.211c0-19.008-15.146-34.355-33.631-33.824zM51.75 50.408a5.687 5.687 0 0 0-5.681 5.681 5.687 5.687 0 0 0 5.681 5.681h5.682v-5.681a5.688 5.688 0 0 0-5.682-5.681zM75.389 61.77h-5.682v-5.681a5.688 5.688 0 0 1 5.682-5.681 5.687 5.687 0 0 1 5.681 5.681 5.687 5.687 0 0 1-5.681 5.681z"
                  style={{ fill: "#ffffff" }}
                ></path>
              </svg>
            </label>
          </div>

          <img
            src={profileImage}
            alt="User Profile"
            className="profile-image-left"
          />
          <h3 className="user-name">{userName}</h3>
          <p className="admin-email">{userEmail}</p>
        </div>

        <button className={getButtonClassName('/admin/home')} onClick={() => navigate('/admin/home')}>
          <i className="bi bi-house-door-fill"></i> {t('Dashboard')}
        </button>
        <button className={getButtonClassName('/admin/users')} onClick={() => navigate('/admin/users')}>
          <i className="bi bi-person-fill"></i> {t('Manage Users')}
        </button>
        <button className={getButtonClassName('/admin/messages')} onClick={() => navigate('/admin/messages')}>
          <i className="bi bi-envelope-fill"></i> {t('Manage Messages')}
        </button>
        <button className={getButtonClassName('/admin/packages')} onClick={() => navigate('/admin/packages')}>
          <i className="bi bi-box-fill"></i> {t('Manage Packages')}
        </button>
        <button className={getButtonClassName('/admin/paymentsDetails')} onClick={() => navigate('/admin/paymentsDetails')}>
          <i className="bi bi-credit-card-fill"></i> {t('Payment Details')}
        </button>
        <button className={getButtonClassName('/admin/avatermaintain')} onClick={() => navigate('/admin/avatermaintain')}>
          <i className="bi bi-puzzle-fill"></i> {t('Avatars Model')}
        </button>
        <button className={getButtonClassName('/admin/settings')} onClick={() => navigate('/admin/settings')}>
          <i className="bi bi-gear-fill"></i> {t('Settings')}
        </button>
      </div>

      <div className={`right-section ${isDarkMode ? 'dark' : ''}`}>
        <Outlet context={{ isDarkMode }} />
      </div>
    </div>
  );
}
