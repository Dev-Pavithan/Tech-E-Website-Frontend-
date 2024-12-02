import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserManagement.css';
import { useTranslation } from 'react-i18next'; 
import { useOutletContext } from 'react-router-dom';

export default function ManageMessages() {
  const { t, i18n } = useTranslation(); // Use translation hook
  const [messages, setMessages] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [replyEmail, setReplyEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext();

  // Retrieve user email from localStorage
  const userEmail = localStorage.getItem('userEmail');

  // Get the backend URL from the environment variable
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendUrl =  "https://tech-e-website-backend.vercel.app"

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error(t('Unauthorized! Please log in.')); // Use translation
      navigate('/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${backendUrl}/contact/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        toast.error(error.response?.data?.error || t('Failed to fetch messages. Please try again later.')); // Use translation
      }
    };

    fetchMessages();
  }, [navigate, t, backendUrl]); // Add backendUrl as a dependency

  const handleSearch = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${backendUrl}/contact/by-email/${searchEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilteredMessages(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || t('No messages found for this email.')); // Use translation
      setFilteredMessages([]); // Clear filtered messages if search fails
    }
  };

  const handleReplyClick = (email) => {
    setReplyEmail(email);
    setShowModal(true);
  };

  const handleSendReply = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error(t('Unauthorized! Please log in.')); // Use translation
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${backendUrl}/contact/reply`,
        {
          from: userEmail,
          to: replyEmail,
          subject,
          message: replyMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(t('Reply sent successfully.')); // Use translation
      setShowModal(false);
      setSubject('');
      setReplyMessage('');
    } catch (error) {
      toast.error(error.response?.data?.error || t('Failed to send reply. Please try again later.')); // Use translation
    }
  };

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change language using i18next
  };

  return (
    <div className={`container mt-4 user-management-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2 className={`user-management-heading mb-4 ${isDarkMode ? 'text-white' : ''}`}>{t('Manage Messages')}</h2>

      <div className="row mb-3">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className={`form-control search-input ${isDarkMode ? 'bg-dark text-white' : ''}`}
            placeholder={t('Search by email')} // Use translation
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <button onClick={handleSearch} className={`btn ${isDarkMode ? 'btn-light' : 'btn-primary'} w-100`}>
            {t('Search')}
          </button> {/* Use translation */}
        </div>
      </div>

      <div className="table-responsive">
        <table className={`user-table table table-hover table-striped ${isDarkMode ? 'table-dark' : ''}`}>
          <thead>
            <tr>
              <th>{t('Name')}</th>
              <th>{t('Email')}</th>
              <th>{t('Phone')}</th>
              <th>{t('Message')}</th>
              <th>{t('Action')}</th>
            </tr>
          </thead>
          <tbody>
            {(filteredMessages.length > 0 ? filteredMessages : messages).length > 0 ? (
              (filteredMessages.length > 0 ? filteredMessages : messages).map((message) => (
                <tr key={message._id}>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.phone}</td>
                  <td>{message.message}</td>
                  <td>
                    <button
                      className={`btn ${isDarkMode ? 'btn-light1' : 'btn-secondary'}`}
                      onClick={() => handleReplyClick(message.email)}
                    >
                      {t('Reply')}
                    </button> {/* Use translation */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">{t('No messages found.')}</td> {/* Use translation */}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Reply */}
      {showModal && (
        <div className="reply-modal-overlay">
          <div className={`reply-modal-container ${isDarkMode ? 'bg-dark' : ''}`}>
            <div className="reply-modal-header">
              <h5 className={`reply-modal-title ${isDarkMode ? 'text-white' : ''}`}>
                {t('Reply to')} {replyEmail}
              </h5> {/* Use translation */}
              <button
                type="button"
                className="reply-modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className={`reply-modal-body ${isDarkMode ? 'bg-dark' : ''}`}>
              <div className="reply-modal-field">
                <label className={`reply-modal-label ${isDarkMode ? 'text-white' : ''}`}>
                  {t('Subject')}
                </label> {/* Use translation */}
                <input
                  type="text"
                  className="reply-modal-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="reply-modal-field">
                <label className={`reply-modal-label ${isDarkMode ? 'text-white' : ''}`}>
                  {t('Message')}
                </label> {/* Use translation */}
                <textarea
                  className="reply-modal-textarea"
                  rows="4"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="reply-modal-footer">
              <button type="button" className="reply-modal-cancel-btn" onClick={() => setShowModal(false)}>
                {t('Cancel')} {/* Use translation */}
              </button>
              <button type="button" className="reply-modal-send-btn" onClick={handleSendReply}>
                {t('Send Reply')} {/* Use translation */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
