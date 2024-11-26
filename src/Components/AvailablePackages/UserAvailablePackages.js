import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import './AvailablePackages.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function UserAvailablePackages({ show, handleClose }) {
  const [packageDetails, setPackageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userPackages = JSON.parse(localStorage.getItem('userPackages'));

    if (userPackages && userPackages.length) {
      const fetchPackageDetails = async () => {
        try {
          const packagePromises = userPackages.map((packageId) =>
            fetch(`${backendUrl}/api/packages/${packageId}`).then((res) => res.json())
          );
          const packageData = await Promise.all(packagePromises);
          setPackageDetails(packageData);
          setLoading(false);
        } catch (err) {
          setError('Failed to load package details');
          setLoading(false);
        }
      };

      fetchPackageDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGoClick = (pkg) => {
    const price = parseFloat(pkg.price);
    const redirectMap = {
      10: 'https://tech-e-voice-frontend-1srb.vercel.app/',
      49.99: 'https://tech-e-voice-frontend.vercel.app/',
      100: 'http://localhost:5173',
    };

    const redirectUrl = redirectMap[price];
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      console.error("No URL mapped for this package price.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="package-modal1">
      <Modal.Header closeButton>
        <h2 className="modal-header-title">Your Packages</h2>
      </Modal.Header>
      <Modal.Body className="modal-body-packages">
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="pricing-container">
            <ul className="package-cards">
              {packageDetails.length > 0 ? (
                packageDetails.map((pkg) => (
                  <li key={pkg._id} className="package-item">
                    <a
                      href="#"
                      className="package-card"
                      onClick={(e) => {
                        e.preventDefault();
                        // Save selected package details in sessionStorage
                        sessionStorage.setItem('selectedPackage', JSON.stringify(pkg));
                        sessionStorage.setItem('showModal', 'true');
                      }}
                    >
                      <img src={pkg.images[0]} className="package-card__image" alt="" />
                      <div className="package-card__overlay">
                        <div className="package-card__header">
                          <svg className="package-card__arc" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                            <path fill="var(--surface-color)" d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" />
                          </svg>
                          <img className="package-card__thumb" src={pkg.images[0]} alt="Tech-E logo" />
                          <div className="package-card__header-text">
                            <h3 className="package-card__title">{pkg.name}</h3>
                            <span className="package-card__status">${pkg.price}</span>
                          </div>
                        </div>
                        <ul className="card__description">
                          {pkg.description.split('\n').map((point, index) => (
                            <li key={index} className="bulletPoint">{point}</li>
                          ))}
                        </ul>

                        <button className="package-card__go-btn" onClick={() => handleGoClick(pkg)}>
                          GO
                        </button>
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <p className="no-packages-message">No packages available</p>
              )}
            </ul>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
