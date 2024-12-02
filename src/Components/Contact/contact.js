import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './contactModal.css';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrl =  "https://tech-e-website-backend.vercel.app"

export default function ContactModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({}); // To track field validation errors

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Display errors
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({}); // Clear errors
        handleClose();
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="contact-modal">
        <Modal.Header closeButton className="modal-header">
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit} className="contact-form">
            <Modal.Title className="contact-head">Contact Us</Modal.Title>

            <Form.Group controlId="name">
              <Form.Label className="form-label-contact">Name</Form.Label>
              <Form.Control
                type="text"
                className={`form-control-contact ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label className="form-label-contact">Email</Form.Label>
              <Form.Control
                type="email"
                className={`form-control-contact ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </Form.Group>

            <Form.Group controlId="phone" className="mt-3">
              <Form.Label className="form-label-contact">Phone</Form.Label>
              <Form.Control
                type="tel"
                className={`form-control-contact ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </Form.Group>

            <Form.Group controlId="message" className="mt-3">
              <Form.Label className="form-label-contact">Message</Form.Label>
              <Form.Control
                as="textarea"
                className={`form-control-contact ${errors.message ? 'is-invalid' : ''}`}
                rows={3}
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </Form.Group>

            <Button className="mt-3 contact-button" variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
