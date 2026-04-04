import React from 'react';
import './About.css';
import profileImage from '../../assets/Jade.png';

//const data

// Technologies used
const TECHNOLOGIES = [
  'JavaScript',
  'MongoDB Atlas',
  'Express.js',
  'React.js',
  'Node.js',
  'HTML & CSS',
  'Git & GitHub',
  'REST APIs',
  'Python',
  'SQL',
];

// Timeline history
const TIMELINE_DATA = [
  {
    year: 'Present',
    role: 'IT Student',
    organization: 'Western Institute of Technology',
    description:
      "Currently pursuing Bachelor's in IT, focusing on web & game development (considering Cybersecurity or Software Engineering).",
  },
  {
    year: '2020',
    role: 'Senior High School Student',
    organization: 'Western Institute of Technology',
    description: 'Started learning HTML, CSS, and JavaScript.',
  },
  {
    year: '2018',
    role: 'Junior High School Student',
    organization: 'Balanti-an National High School',
    description: 'My very first "Hello World!".',
  },
];

/* minor component */

// Tech list item
const TechItem = ({ tech }) => (
  <li className="tech-item">
    <span className="tech-icon">▹</span> {tech}
  </li>
);

// Timeline item
const TimelineItem = ({ item }) => (
  <div className="timeline-item">
    <div className="timeline-marker">
      <span className="timeline-year">{item.year}</span>
    </div>

    <div className="timeline-content">
      <h4 className="timeline-role">{item.role}</h4>
      <p className="timeline-org">{item.organization}</p>
      <p className="timeline-desc">{item.description}</p>
    </div>
  </div>
);

/* main component*/

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">

        {/*header*/}
        <div className="section-header">
          <h3>About Me</h3>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        {/* about+content */}
        <div className="about-content">

          {/* from the left + text */}
          <div className="about-text">
            <div className="about-intro">
              <p>
                Hello! My name is <span className="highlight">Jaderick Bordones Bolivar</span>, 
                and I'm a passionate <span className="highlight">Game Developer</span>.
              </p>

              <p>
                I specialize in building responsive web applications using the 
                <span className="highlight"> MERN stack</span>.
              </p>

              <p>
                I enjoy exploring new technologies, contributing to projects, 
                and continuously improving my skills.
              </p>
            </div>

            {/* ==techstack== */}
            <div className="about-tech">
              <h3 className="tech-title">Technologies I work with:</h3>

              <ul className="tech-list">
                {TECHNOLOGIES.map((tech) => (
                  <TechItem key={tech} tech={tech} />
                ))}
              </ul>
            </div>
          </div>

          {/* image from the right + stats */}
          <div className="about-image">
            <div className="image-wrapper">
              <div className="image-container">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                <div className="image-overlay" />
              </div>
            </div>

            {/*stats*/}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Projects</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">1.5+</span>
                <span className="stat-label">Years Coding</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">15</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>
          </div>
        </div>

        {/* == timeline ==*/}
        <div className="about-timeline">
          <h3 className="timeline-title">My Journey</h3>

          <div className="timeline-container">
            {TIMELINE_DATA.map((item) => (
              <TimelineItem key={item.year} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;