/**
 * Project Model
 * Stores portfolio project information
 * 
 * @description Mongoose schema for projects showcase
 */

const mongoose = require('mongoose');

/**
 * Project Schema
 * Defines the structure for portfolio projects
 */
const projectSchema = new mongoose.Schema(
  {
    // Project title
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    
    // Short description (for cards)
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters']
    },
    
    // Full detailed description
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    
    // Technologies used (array of strings)
    technologies: [{
      type: String,
      trim: true
    }],
    
    // Tech stack categories for filtering
    category: {
      type: String,
      enum: ['fullstack', 'frontend', 'backend', 'mobile', 'other'],
      default: 'fullstack'
    },
    
    // Project image URL
    image: {
      type: String,
      default: 'https://via.placeholder.com/800x600'
    },
    
    // Additional images (gallery)
    images: [{
      type: String
    }],
    
    // External links
    liveUrl: {
      type: String,
      trim: true,
      default: null
    },
    
    githubUrl: {
      type: String,
      trim: true,
      default: null
    },
    
    // Project status
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'archived'],
      default: 'completed'
    },
    
    // Is this a featured project?
    featured: {
      type: Boolean,
      default: false
    },
    
    // Order for display (lower number = higher priority)
    displayOrder: {
      type: Number,
      default: 0
    },
    
    // Completion date
    completedAt: {
      type: Date,
      default: Date.now
    },
    
    // Soft delete flag
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/**
 * Indexes for better performance
 */
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ displayOrder: 1 });
projectSchema.index({ isActive: 1 });

/**
 * Static method to get featured projects
 */
projectSchema.statics.getFeatured = function() {
  return this.find({ featured: true, isActive: true })
    .sort({ displayOrder: 1 })
    .limit(6);
};

/**
 * Static method to get all active projects
 */
projectSchema.statics.getActive = function() {
  return this.find({ isActive: true })
    .sort({ displayOrder: 1, createdAt: -1 });
};

/**
 * Static method to get projects by category
 */
projectSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true })
    .sort({ displayOrder: 1, createdAt: -1 });
};

/**
 * Pre-save middleware
 * Ensure technologies array is unique
 */
projectSchema.pre('save', function(next) {
  if (this.technologies && this.technologies.length > 0) {
    // Remove duplicates and empty strings
    this.technologies = [...new Set(this.technologies.filter(tech => tech.trim()))];
  }
  next();
});

// Create and export the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;