import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/api';
import './Projects.css';
import GTourImage from '../../assets/GTour.png';
import BLJImage from '../../assets/BLJ.png';
import ArduinoImage from '../../assets/Arduino.jpg';

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

const categories = ['All', 'Fullstack', 'Frontend', 'Backend', 'Hardware'];

const Projects = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState(sampleProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await getProjects();
        if (response.success && response.data.length > 0) {
          setProjects(response.data);
          setFilteredProjects(response.data);
        }
      } catch (err) {
        console.log('Using sample projects:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())
    );
  }, [activeCategory, projects]);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="section-header">
          <h3>My Projects</h3>
          <p className="section-subtitle">Some things I've built</p>
        </div>

        <div className="projects-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="projects-loading">
            {[1, 2, 3].map(n => (
              <div key={n} className="project-skeleton">
                <div className="skeleton-image skeleton"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title skeleton"></div>
                  <div className="skeleton-text skeleton"></div>
                  <div className="skeleton-text skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="projects-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <article key={project._id} className="project-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 ... z"/>
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.shortDescription}</p>
                  <div className="project-tech">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-tag more">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                </div>

                {project.featured && (
                  <div className="featured-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Featured
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="projects-cta">
          <a href="https://github.com/ImJadeIGuess" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;