import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
const Welcome = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            EMPLOYEE EMPLOYER
          </h1>
        </div>

        <nav>
          <button
            onClick={() => navigate('/welcome')}
            style={{
              marginRight: '1rem',
              backgroundColor: '#ff6b6b',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#4ecdc4',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Join
          </button>
        </nav>
      </header>

{/* About Section */}
<section
  ref={aboutRef}
  id="about"
  style={{
    scrollMarginTop: '100px',
    padding: '4rem 2rem',
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'center',
  }}
>
  <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>
    About us
  </h2>
  <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', marginBottom: '3rem' }}>
    At <strong>Employee Employer</strong>, we strive to connect talented individuals with the
    right employers. Our mission is to create meaningful opportunities for growth, success, and
    collaboration in the workplace.
  </p>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
    }}
  >
    {[
      {
        title: 'For Employees',
        text: 'Find jobs that align with your skills and career goals.',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      },
      {
        title: 'For Employers',
        text: 'Find and hire top talent easily using smart tools.',
        icon: 'https://cdn-icons-png.flaticon.com/512/10368/10368193.png',
      },
      {
        title: 'Smart Matching',
        text: 'Our intelligent platform connects the right people to the right roles.',
        icon: 'https://cdn-icons-png.flaticon.com/512/5974/5974636.png',
      },
    ].map(({ title, text, icon }) => (
      <div
        key={title}
        style={{
          padding: '1.5rem',
          borderRadius: '1rem',
          backgroundColor: '#f3f4f6',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <img src={icon} alt={title} style={{ width: '60px', marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p>{text}</p>
      </div>
    ))}
  </div>

  {/* Learn more link */}
  <p style={{ textAlign: 'center', marginTop: '2rem' }}>
    <a
      href="/home"
      style={{
        color: '#6C33FF',
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: '1rem',
      }}
    >
      Learn more about us
    </a>
  </p>
</section>
       {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '2rem 1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '1.5rem' }}>🌐</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Address</h3>
          <p>Manikonda, Hyderabad, Telangana - 500089.</p>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem' }}>📧</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Mailbox</h3>
          <p>gkrcasting@gmail.com</p>
          <div style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>
            <a href="#" aria-label="Twitter" style={{ margin: '0 0.5rem', color: '#fff' }}>𝕏</a>
            <a href="#" aria-label="Facebook" style={{ margin: '0 0.5rem', color: '#fff' }}>📘</a>
            <a href="#" aria-label="Instagram" style={{ margin: '0 0.5rem', color: '#fff' }}>📸</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem' }}>📞</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Phone</h3>
          <p>+91 9392281533</p>
        </div>
      </footer>

      <div
        style={{
          backgroundColor: '#111',
          color: '#aaa',
          textAlign: 'center',
          padding: '1rem',
          fontSize: '0.9rem',
        }}
      >
        <p>
          Copyright © 2025 GKR CASTING. All Rights Reserved. | Designed by
          Avniya Cloud Solutions
        </p>
      </div>
    </div>
  );
};

export default Welcome;