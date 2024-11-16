import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Settings.css';
import { useOutletContext } from 'react-router-dom';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [activeDropdown, setActiveDropdown] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const { isDarkMode } = useOutletContext();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) setEmail(storedEmail);

    const storedName = localStorage.getItem('userName');
    if (storedName) setName(storedName);

    const storedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);

    fetchUserProfileImage();
  }, [i18n]);

  const getToken = () => sessionStorage.getItem('token');

  // Get the backend URL from the environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchUserProfileImage = async () => {
    try {
      const res = await axios.get(`${backendUrl}/user/profile-image`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setProfileImage(res.data.profileImageUrl);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      toast.error(t('Error fetching profile image')); // Show toast error
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    toast.success(t('Profile name updated successfully!'));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    toast.success(t('Password updated successfully!'));
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    toast.success(t('Account deleted successfully!'));
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
    toast.info(t('Language changed to {{language}}', { language: selectedLanguage }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      await axios.post(`${backendUrl}/user/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUserProfileImage();
      toast.success(t('Profile image uploaded successfully!'));
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast.error(t('Error uploading profile image'));
    }
  };

  const handleUpdateProfileImage = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      await axios.patch(`${backendUrl}/user/update-profile-image`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUserProfileImage();
      toast.success(t('Profile image updated successfully!'));
      setSelectedImage(null);
    } catch (error) {
      console.error('Error updating profile image:', error);
      toast.error(t('Error updating profile image'));
    }
  };

  const handleRemoveImage = async () => {
    try {
      await axios.delete(`${backendUrl}/user/remove-profile-image`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setProfileImage('');
      toast.success(t('Profile image removed successfully!'));
    } catch (error) {
      console.error('Error removing profile image:', error);
      toast.error(t('Error removing profile image'));
    }
  };

  const toggleDropdown = (section) => {
    setActiveDropdown(activeDropdown === section ? '' : section);
  };

  return (
    <div className={`settings-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <div className="profile-setting-section">
        <div className="profile-image-wrapper">
          <img
            src={profileImage || 'path/to/default-placeholder.png'}
            alt="Profile"
            className="profile-setting-image"
          />
        </div>
        <div className="profile-name-edit">
          <h3 className="profile-setting-name">{name}</h3>
          <FontAwesomeIcon
            icon={faEdit}
            className={`edit-icon ${isDarkMode ? 'dark-mode-icon' : ''}`}
            onClick={() => toggleDropdown('editImage')}
          />
        </div>
        <p className="profile-setting-email">{email}</p>

        {profileImage ? (
          <div className="edit-image-options">
            <button onClick={handleUpdateProfileImage} className="submit-button">
              {t('Update Image')}
            </button>
            <button onClick={handleRemoveImage} className="submit-button delete-button">
              {t('Remove Image')}
            </button>
          </div>
        ) : (
          <div className="edit-image-options">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUploadImage} className="submit-button">
              {t('Upload New Image')}
            </button>
          </div>
        )}
      </div>

      <div className="settings-options">
        <ul className="options-list">
          <li>
            <button onClick={() => toggleDropdown('editName')} className="option-button">
              {t('Change Profile Name')}
            </button>
            {activeDropdown === 'editName' && (
              <form onSubmit={handleUpdateName} className="option-form">
                <input
                  type="text"
                  placeholder={t('New Name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  required
                />
                <button type="submit" className="submit-button">{t('Update')}</button>
              </form>
            )}
          </li>

          <li>
            <button onClick={() => toggleDropdown('updatePassword')} className="option-button">
              {t('Update Password')}
            </button>
            {activeDropdown === 'updatePassword' && (
              <form onSubmit={handleUpdatePassword} className="option-form">
                <input
                  type="password"
                  placeholder={t('Current Password')}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <input
                  type="password"
                  placeholder={t('New Password')}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <button type="submit" className="submit-button">{t('Update Password')}</button>
              </form>
            )}
          </li>

          <li>
            <button onClick={() => toggleDropdown('deleteAccount')} className="option-button">
              {t('Delete Account')}
            </button>
            {activeDropdown === 'deleteAccount' && (
              <form onSubmit={handleDeleteAccount} className="option-form">
                <input
                  type="password"
                  placeholder={t('Password')}
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="input-field"
                  required
                />
                <button type="submit" className="submit-button delete-button">
                  {t('Delete Account')}
                </button>
              </form>
            )}
          </li>

          <li>
            <label className="language-label">{t('Language')}</label>
            <select
              className="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">{t('English')}</option>
              <option value="ta">{t('Tamil')}</option>
              <option value="es">{t('Spanish')}</option>
              <option value="si">{t('Sinhala')}</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}
