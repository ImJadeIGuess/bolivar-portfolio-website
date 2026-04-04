/**
 * Project Routes
 * Defines all routes for project operations
 * 
 * @description Express router for project endpoints
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import controller
const projectController = require('../controllers/projectController');

/**
 * Validation rules for project creation/update
 */
const projectValidation = [
  // Title validation
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  // Short description validation
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),

  // Full description validation
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),

  // Technologies validation (optional array)
  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),

  // Category validation
  body('category')
    .optional()
    .isIn(['fullstack', 'frontend', 'backend', 'mobile', 'other'])
    .withMessage('Invalid category'),

  // URLs validation (optional)
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be a valid URL'),

  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL')
];

/**
 * @route   GET /api/projects
 * @desc    Get all projects (with optional filters)
 * @access  Public
 */
router.get('/', projectController.getAllProjects);

/**
 * @route   GET /api/projects/featured
 * @desc    Get featured projects
 * @access  Public
 */
router.get('/featured', projectController.getFeaturedProjects);

/**
 * @route   GET /api/projects/stats
 * @desc    Get project statistics
 * @access  Public
 */
router.get('/stats', projectController.getProjectStats);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Public
 */
router.get('/:id', projectController.getProjectById);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (would require auth)
 */
router.post('/', projectValidation, projectController.createProject);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private (would require auth)
 */
router.put('/:id', projectValidation, projectController.updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project (soft delete)
 * @access  Private (would require auth)
 */
router.delete('/:id', projectController.deleteProject);

module.exports = router;