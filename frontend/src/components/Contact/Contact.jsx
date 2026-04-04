/**
 * Contact Component
 * Handles user input, validation, and submission
 */

import React, { useState } from 'react';
import { submitContactForm } from '../../services/api';
import './Contact.css';

/* ========= CONSTANTS ========= */

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const FORM_FIELDS = ['name', 'email', 'subject', 'message'];

/* ========= VALIDATION ========= */

const validateForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Minimum 2 characters required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.length < 3) {
    errors.subject = 'Minimum 3 characters required';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.length < 10) {
    errors.message = 'Minimum 10 characters required';
  }

  return errors;
};

/* ========= COMPONENT ========= */

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  /* ===== HANDLERS ===== */

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user edits field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputBlur = ({ target }) => {
    const { name } = target;

    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    setErrors(validateForm(formData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // Mark all fields as touched
    setTouchedFields(
      FORM_FIELDS.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      setFormData(INITIAL_FORM_STATE);
      setTouchedFields({});
      setErrors({});

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');

      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===== RENDER HELPERS ===== */

  const renderInputField = (field) => {
    const isMessage = field === 'message';
    const hasError = touchedFields[field] && errors[field];

    const commonProps = {
      id: field,
      name: field,
      value: formData[field],
      onChange: handleInputChange,
      onBlur: handleInputBlur,
      disabled: isSubmitting,
      className: `${isMessage ? 'form-textarea' : 'form-input'} ${
        hasError ? 'error' : ''
      }`,
    };

    return (
      <div className="form-group" key={field}>
        <label htmlFor={field} className="form-label">
          {field.charAt(0).toUpperCase() + field.slice(1)}{' '}
          <span className="required">*</span>
        </label>

        {isMessage ? (
          <textarea {...commonProps} rows={5} placeholder="Your message..." />
        ) : (
          <input
            {...commonProps}
            type={field === 'email' ? 'email' : 'text'}
            placeholder={`Your ${field}`}
          />
        )}

        {hasError && <span className="form-error">{errors[field]}</span>}
      </div>
    );
  };

  /* ===== JSX ===== */

  return (
    <section id="contact" className="contact section">
      <div className="container">

        {/* HEADER */}
        <div className="section-header">
          <h3>Get In Touch</h3>
          <p className="section-subtitle">
            Let's work together on your next project
          </p>
        </div>

        <div className="contact-content">

          {/* LEFT SIDE */}
          <div className="contact-info">
            <h3>Let's Connect!</h3>
            <p>
              Open for internships, freelance work, or just a friendly chat.
            </p>

            {/* (kept original UI structure unchanged) */}
          </div>

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>

            {submitStatus === 'success' && (
              <div className="form-status success">
                Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-status error">
                Something went wrong.
              </div>
            )}

            {FORM_FIELDS.map(renderInputField)}

            <button
              type="submit"
              className="btn btn-primary btn-lg submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;