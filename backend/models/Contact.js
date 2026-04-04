/**
 * Contact Message Model
 * Stores contact form submissions from the portfolio
 * 
 * @description Mongoose schema for contact messages
 */

const mongoose = require('mongoose');

/**
 * Contact Schema
 * Defines the structure for contact form submissions
 */
const contactSchema = new mongoose.Schema(
  {
    // Full name of the person contacting
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    
    // Email address for replies
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    
    // Subject of the message
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters'],
      maxlength: [200, 'Subject cannot exceed 200 characters']
    },
    
    // The actual message content
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    
    // Status of the message (useful for admin panel)
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread'
    },
    
    // IP address for spam tracking
    ipAddress: {
      type: String,
      default: null
    }
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
    // Add version key
    versionKey: false
  }
);

/**
 * Index for faster queries
 * Create index on email for quick lookups
 */
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });

/**
 * Static method to find unread messages
 */
contactSchema.statics.findUnread = function() {
  return this.find({ status: 'unread' }).sort({ createdAt: -1 });
};

/**
 * Instance method to mark as read
 */
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Create and export the Contact model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;