import React, { useState } from 'react';
import './Skills.css';

const skillsData = {
  frontend: {
    title: 'Frontend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: 'HTML5', icon: 'https://fa2png.app/images/icons/html5/ffffff/100/0.png' },
      { name: 'CSS', icon: 'https://fa2png.app/images/icons/css3/ffffff/100/0.png' },
      { name: 'JavaScript', icon: 'https://fa2png.app/images/icons/javascript/ffffff/100/0.png' },
      { name: 'React.js', icon: 'https://fa2png.app/images/icons/react/ffffff/100/0.png' },
      { name: 'Tailwind CSS', icon: 'https://fa2png.app/images/icons/tailwindcss/ffffff/100/0.png' },
      { name: 'Bootstrap', icon: 'https://fa2png.app/images/icons/bootstrap/ffffff/100/0.png' }
    ]
  },
  backend: {
    title: 'Backend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    skills: [
      { name: 'Node.js', icon: 'https://fa2png.app/images/icons/nodejs/ffffff/100/0.png' },
      { name: 'Express.js', icon: null },
      { name: 'MongoDB', icon: 'https://fa2png.app/images/icons/mongodb/ffffff/100/0.png' },
      { name: 'REST APIs', icon: null },
      { name: 'Python', icon: 'https://fa2png.app/images/icons/python/ffffff/100/0.png' },
      { name: 'SQL', icon: null }
    ]
  },
  tools: {
    title: 'Tools & Others',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      { name: 'Git & GitHub', icon: 'https://fa2png.app/images/icons/github/ffffff/100/0.png' },
      { name: 'VS Code', icon: null },
      { name: 'Postman', icon: null },
      { name: 'npm', icon: 'https://fa2png.app/images/icons/npm/ffffff/100/0.png' },
      { name: 'Figma', icon: 'https://fa2png.app/images/icons/figma/ffffff/100/0.png' },
      { name: 'Linux', icon: null }
    ]
  }
};

const categories = ['All', 'Frontend', 'Backend', 'Tools & Others'];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const displaySkills = () => {
    if (activeCategory === 'All') return Object.entries(skillsData);
    const key = activeCategory.toLowerCase().replace(' & others', '');
    return [[key, skillsData[key]]];
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-header">
          <h3>Skills & Technologies</h3>
          <p className="section-subtitle">Technologies I've been working with</p>
        </div>

        <div className="skills-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {displaySkills().map(([key, data]) => (
            <div key={key} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{data.icon}</span>
                <h3 className="category-title">{data.title}</h3>
              </div>

              <div className="skills-list">
                {data.skills.map((skill, idx) => (
                  <div
                    key={skill.name}
                    className="skill-card"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {skill.icon && (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="skill-icon"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    )}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-note">
          <p>
            I'm currently learning <span className="highlight">React.js</span>, 
            <span className="highlight"> Node + Express</span>, and 
            <span className="highlight"> MongoDB</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;