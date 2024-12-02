import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { FaUserShield, FaUser, FaChevronDown } from 'react-icons/fa';
import './UserManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useOutletContext } from 'react-router-dom';

export default function UserManagement() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const { isDarkMode } = useOutletContext();

  // Get the backend URL from the environment variable
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendUrl =  "https://tech-e-website-backend.vercel.app"

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error(t('Unauthorized! Please log in.'));
      navigate('/login');
      return;
    }
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Ensure the response contains the 'createdAt' field and sort the users
        const sortedUsers = response.data.sort((a, b) => {
          // Assuming 'createdAt' is a date or a timestamp field
          return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order (newest first)
        });
  
        setUsers(sortedUsers);
      } catch (error) {
        toast.error(t('Failed to fetch users. Please try again later.'));
      }
    };
  
    fetchUsers();
  }, [navigate, t, backendUrl]);

  const handleSearch = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${backendUrl}/user/by-email/${searchEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setFilteredUsers([response.data]);
      } else {
        toast.error(t('User not found.'));
        setFilteredUsers([]);
      }
    } catch (error) {
      toast.error(t('User not found.'));
      setFilteredUsers([]);
    }
  };

  const handleBlockToggle = async (id, currentlyBlocked) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.patch(`${backendUrl}/user/${id}/block`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.map(user => (user._id === id ? { ...user, blocked: !currentlyBlocked } : user)));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(t('Failed to toggle user block status.'));
    }
  };

  const handleRoleToggle = async (id, newRole) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.patch(
        `${backendUrl}/user/edit-role/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(users.map(user => (user._id === id ? { ...user, role: newRole } : user)));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(t('Failed to change user role.'));
    }
  };

  return (
    <div className={`container mt-4 user-management-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2 className={`user-management-heading mb-4 ${isDarkMode ? 'text-white' : ''}`}>{t('Manage Users')}</h2>

      <div className="row mb-3">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className={`form-control search-input ${isDarkMode ? 'bg-dark text-white' : ''}`}
            placeholder={t('Search by email')}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <button onClick={handleSearch} className={`btn ${isDarkMode ? 'btn-light' : 'btn-primary'} w-100`}>
            {t('Search')}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className={`user-table table table-hover table-striped ${isDarkMode ? 'table-dark' : ''}`}>
          <thead>
            <tr>
              <th>{t('Name')}</th>
              <th>{t('Email')}</th>
              <th>{t('Role')}</th>
              <th>{t('Status')}</th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-basic"
                      className={`role-dropdown-toggle ${user.role === 'user' ? 'user-role' : 'admin-role'}`}
                    >
                      {user.role === 'admin' ? <FaUserShield /> : <FaUser />} <FaChevronDown />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleRoleToggle(user._id, 'user')}
                        className={user.role === 'user' ? 'user-role' : ''}
                      >
                        {t('User')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleRoleToggle(user._id, 'admin')}
                        className={user.role === 'admin' ? 'admin-role' : ''}
                      >
                        {t('Admin')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>{user.blocked ? t('Blocked') : t('Active')}</td>
                <td>
                  <button
                    onClick={() => handleBlockToggle(user._id, user.blocked)}
                    className={`btn ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                  >
                    {user.blocked ? t('Unblock') : t('Block')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
