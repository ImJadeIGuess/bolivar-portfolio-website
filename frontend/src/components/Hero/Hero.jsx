import React, { useEffect, useState } from 'react';
import './Hero.css';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/ImJadeIGuess',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jaderick-bolivar-58785b373/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  },
  {
    name: 'Twitter',
    url: 'https://x.com/quartz_bj12309',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/xytoneproto',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2l-2 5v15h6v4h4l4-4h4l6-6V2H4zm16 10.586l-4 4h-5.586L6 19.414V4h14v8.586zM15 7h2v5h-2V7zm-4 0h2v5h-2V7z"/>
      </svg>
    )
  },
  {
  
    name: 'YouTube',
    url: 'https://www.youtube.com/@xytune7933',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-1.695-.5-8.615-.5-8.615-.5s-6.92 0-8.615.5c-1.735.514-1.905 1.896-1.905 4.816v4c0 2.92.17 4.302 1.905 4.816 1.695.5 8.615.5 8.615.5s6.92 0 8.615-.5c1.735-.514 1.905-1.896 1.905-4.816v-4c0-2.92-.17-4.302-1.905-4.816zm-10.615 9.816v-6l5 3-5 3z"/>
      </svg>
        )
  },
  {

    name: 'Email',
    url: 'bolivar.jaderick.bordones11b@gmail.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  }
];

const titles = ['Web Developer', 'MERN Stack Developer', 'Problem Solver', 'Tech Enthusiast'];

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentTitleIndex]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container container">
        <div className="hero-socials">
          {socialLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={link.name}
              style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            >
              {link.icon}
            </a>
          ))}
          <div className="social-line"></div>
        </div>

        <div className="hero-content">
          <p className="hero-greeting slide-up" style={{ animationDelay: '0.1s' }}>Hi, my name is</p>
          <h1 className="hero-name slide-up" style={{ animationDelay: '0.2s' }}>Jaderick Bordones Bolivar</h1>
          <h2 className="hero-subtitle slide-up" style={{ animationDelay: '0.3s' }}>
            I'm a <span className="typing-text">{currentText}<span className="cursor">|</span></span>
          </h2>
          <p className="hero-description slide-up" style={{ animationDelay: '0.4s' }}>
            I'm a 2nd year IT student passionate about building modern web applications. I specialize in creating responsive, user-friendly interfaces using the MERN stack. Currently focusing on expanding my skills in full-stack development and learning new technologies to solve real-world problems.
          </p>
          <div className="hero-cta slide-up" style={{ animationDelay: '0.5s' }}>
            <button className="btn btn-primary btn-lg" onClick={() => scrollToSection('projects')}>
              View My Work
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => scrollToSection('contact')}>Get In Touch</button>
          </div>
        </div>

        <div className="hero-email">
          <a href="mailto:bolivar.jaderick.bordones11b@gmail.com" className="email-link">bolivar.jaderick.bordones11b@gmail.com</a>
          <div className="email-line"></div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"><div className="wheel"></div></div>
          <span>Scroll down</span>
        </div>
      </div>

      <div className="hero-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </section>
  );
};

export default Hero;