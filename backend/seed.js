/**
 * Database Seeding Script
 * Populates the database with sample projects
 * 
 * @description Run with: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Contact = require('./models/Contact');

// Sample projects data
const sampleProjects = [
  {
       _id: '1',
       title: 'GTour Website',
       shortDescription: 'Tourism Website for Guimaras Island',
       description: 'Interactive website for tourists and locals. Features maps, guides, and event updates with smooth UX and modern design.',
       technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
       category: 'fullstack',
       image: GTourImage,
       liveUrl: 'https://example.com',
       githubUrl: null,
       featured: true
     },
     {
       _id: '2',
       title: 'BLJ Study Hub & Cafe System',
       shortDescription: 'Management system for sales and inventory',
       description: 'A complete solution for managing cafe sales, inventory, and student study hub operations. Built with efficiency and user-friendliness in mind.',
       technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP 8.1+', 'MySQL (MariaDB)', 'Chart.js'],
       category: 'fullstack',
       image: BLJImage,
       githubUrl: 'https://github.com/Lawrencejay22/BLJ-CAFE-STUDY-HUB',
       featured: true
     },
     {
       _id: '3',
       title: 'Ultrasonic Radar Detection System',
       shortDescription: 'Arduino project with ultrasonic sensor & servo motor',
       description: 'This system detects obstacles using an HC-SR04 ultrasonic sensor and Servo Motor. Ideal for learning electronics and IoT concepts.',
       technologies: ['Arduino', 'Ultrasonic Sensor', 'Servo Motor', 'IoT'],
       category: 'hardware',
       image: ArduinoImage,
       liveUrl: null,
       githubUrl: null,
       featured: false
     },
   ];
   

// Sample contact messages
const sampleContacts = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Great portfolio!',
    message: 'I really liked your portfolio design. Would love to collaborate on a project.',
    status: 'read'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Job Opportunity',
    message: 'We have an opening for a junior developer position. Would you be interested?',
    status: 'unread'
  }
];

/**
 * Seed the database
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Contact.deleteMany({});

    // Insert sample projects
    console.log('📦 Inserting sample projects...');
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    // Insert sample contacts
    console.log('📧 Inserting sample contacts...');
    const insertedContacts = await Contact.insertMany(sampleContacts);
    console.log(`✅ Inserted ${insertedContacts.length} contacts`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('----------------------------------------');
    console.log(`Projects: ${insertedProjects.length}`);
    console.log(`Contacts: ${insertedContacts.length}`);
    console.log('----------------------------------------');

    // Close connection
    await mongoose.connection.close();
    console.log('👋 MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();