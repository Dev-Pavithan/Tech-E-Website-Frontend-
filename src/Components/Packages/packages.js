import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TechE from './Logo version04.png';
import './userPackage.css';
import Payment from '../Payment/Payment.js';

// Fetching the backend URL from environment variables
// const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrl =  "https://tech-e-website-backend.vercel.app"


export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedPackage, setSelectedPackage] = useState(null); // Store selected package details
  const navigate = useNavigate();

  // Check session storage for modal state after page reload
  useEffect(() => {
    const modalState = sessionStorage.getItem('showModal');
    const packageData = sessionStorage.getItem('selectedPackage');

    if (modalState === 'true' && packageData) {
      setShowModal(true);
      setSelectedPackage(JSON.parse(packageData));
    }

    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      // Using the dynamic backend URL from the environment variable
      const response = await axios.get(`${backendUrl}/api/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handlePackageClick = (pkg) => {
    const selectedPackageId = pkg._id;
    const paymentAmount = pkg.price * 100;
    const selectedPackageName = pkg.name;
    const selectedPackageDescription = pkg.description;

    sessionStorage.setItem('selectedPackageId', selectedPackageId);
    sessionStorage.setItem('paymentAmount', paymentAmount);
    sessionStorage.setItem('selectedPackageName', selectedPackageName);
    sessionStorage.setItem('selectedPackageDescription', selectedPackageDescription);

    const userEmail = localStorage.getItem('userEmail');
    const userPackages = JSON.parse(localStorage.getItem('userPackages') || '[]');

    const packageExists = userPackages.includes(selectedPackageId);

    if (!userEmail) {
      toast.info("You need to log in to access this package.");
    } else if (packageExists) {
      // Package already purchased, redirect based on payment amount
      if (paymentAmount === 1000) {
        window.location.href = 'https://tech-e-voice-frontend-1srb.vercel.app/';
      } else if (paymentAmount === 4999) {
        window.location.href = 'https://tech-e-voice-frontend.vercel.app/';
      } else if (paymentAmount === 10000) {
        window.location.href = 'http://localhost:5173';
      } else {
        window.location.href = '/'; // Default redirect
      }
    } else {
      // Package not purchased, open the payment modal
      toast.success("Proceeding to payment.");
      setSelectedPackage(pkg);
      setShowModal(true); // Show the modal

      // Save modal state in sessionStorage
      sessionStorage.setItem('showModal', 'true');
      sessionStorage.setItem('selectedPackage', JSON.stringify(pkg));

      // Refresh the page after modal is set
      window.location.reload();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedPackage(null); // Clear selected package
    sessionStorage.removeItem('showModal');
    sessionStorage.removeItem('selectedPackage');
  };

  return (
    <div className="appContainer">
      <div className="pricing-container">
        <ul className="cards">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <li key={pkg._id}>
                <a href="#" className="packagecard" onClick={(e) => { e.preventDefault(); handlePackageClick(pkg); }}>
                  <img src={pkg.images[0]} className="card__image" alt="" />
                  <div className="card__overlay">
                    <div className="card__header">
                      <svg className="card__arc" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                        <path fill="var(--surface-color)" d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" />
                      </svg>
                      <img className="card__thumb" src={TechE} alt="Tech-E logo" />
                      <div className="card__header-text">
                        <h3 className="card__title">{pkg.name}</h3>
                        <span className="card__status">${pkg.price}</span>
                      </div>
                    </div>
                    <ul className="card__description">
                      {pkg.description.split('\n').map((point, index) => (
                        <li key={index} className="bulletPoint">{point}</li>
                      ))}
                    </ul>
                    <button className="btn btn-primary-pu mt-3" onClick={() => handlePackageClick(pkg)}>
                      Purchase
                    </button>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <p className="noPackages">No packages available</p>
          )}
        </ul>
      </div>

      {/* Show the Payment modal if showModal is true */}
      {showModal && (
        <Payment onClose={handleCloseModal} />
      )}
    </div>
  );
}
