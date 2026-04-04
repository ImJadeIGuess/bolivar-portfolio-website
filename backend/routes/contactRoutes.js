/**
 * Contact Routes
 * Defines all routes for contact form operations
 * 
 * @description Express router for contact endpoints
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import controller
const contactController = require('../controllers/contactController');

/**
 * Validation rules for contact form submission
 * Used to validate and sanitize input data
 */
const contactValidation = [
  // Name validation
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(), // Escape HTML entities

  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(), // Normalize email (lowercase, etc.)

  // Subject validation
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters')
    .escape(),

  // Message validation
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape()
];

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact message
 * @access  Public
 */
router.post('/', contactValidation, contactController.submitContact);

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (with pagination)
 * @access  Private (would require auth)
 */
router.get('/', contactController.getAllContacts);

/**
 * @route   GET /api/contact/:id
 * @desc    Get a single contact message
 * @access  Private (would require auth)
 */
router.get('/:id', contactController.getContactById);

/**
 * @route   PUT /api/contact/:id
 * @desc    Update contact status
 * @access  Private (would require auth)
 */
router.put('/:id', contactController.updateContactStatus);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete a contact message
 * @access  Private (would require auth)
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;