
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StartHiring from './StartHiring';

const Welcome = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
const StartHiring = () => {
    navigate('/start-hiring'); // ✅ Replace with your actual route if different
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
            Employee Employer
          </h1>
        </div>

       


   <nav
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
  }}
>
  


{/* About - White Button with Blue Text */}
<button
  onClick={scrollToAbout}
  style={{
    backgroundColor: '#fff',
    border: '2px solid #3498db',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    color: '#3498db',
    cursor: 'pointer',
    minWidth: '120px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 6px 16px rgba(52, 152, 219, 0.4)';
    e.target.style.color = '#2980b9';
    e.target.style.borderColor = '#2980b9';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
    e.target.style.color = '#3498db';
    e.target.style.borderColor = '#3498db';
  }}
>
  About
</button>

{/* Join - White Button with Blue Text */}
<button
  onClick={() => navigate('/login')}
  style={{
    backgroundColor: '#fff',
    border: '2px solid #3498db',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    color: '#3498db',
    cursor: 'pointer',
    minWidth: '120px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 6px 16px rgba(52, 152, 219, 0.4)';
    e.target.style.color = '#2980b9';
    e.target.style.borderColor = '#2980b9';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
    e.target.style.color = '#3498db';
    e.target.style.borderColor = '#3498db';
  }}
>
  Join
</button>
 {/* Hire a Talent Button - White Background, Blue Text */}
    <button
      onClick={() => navigate('/allprofiles')}
      style={{
        backgroundColor: '#fff', // white background
        border: '2px solid #3498db', // blue border
        borderRadius: '20px',
        padding: '0.5rem 1rem',
        color: '#3498db', // blue text
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.0rem',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s',
        minWidth: '180px', // makes buttons equal width on mobile
        textAlign: 'center',
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 6px 16px rgba(52, 152, 219, 0.4)';
        e.target.style.color = '#2980b9';
        e.target.style.borderColor = '#2980b9';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'none';
        e.target.style.color = '#3498db';
        e.target.style.borderColor = '#3498db';
      }}
    >
      All Profiles
    </button>

{/* Post a Project - Purple-Blue Gradient Button */}
<button
  onClick={() => navigate('/post-project')}
  style={{
    backgroundImage: 'linear-gradient(90deg, #8e44ad, #3498db)', // purple to blue gradient
    border: 'none',
    borderRadius: '20px',
    padding: '0.7rem 1.5rem',
    color: '#fff',
    cursor: 'pointer',
    minWidth: '140px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'transform 0.2s, box-shadow 0.2s, background-image 0.2s',
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 6px 16px rgba(142, 68, 173, 0.4)';
    e.target.style.backgroundImage = 'linear-gradient(90deg, #6c3483, #2980b9)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
    e.target.style.backgroundImage = 'linear-gradient(90deg, #8e44ad, #3498db)';
  }}
>
 Post a Project
</button>

</nav>







      </header>

      {/* Welcome Section */}
      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 1rem',
        }}
      >
        <h2 style={{ fontWeight: 'bold', fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to Employee Employer
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>
          The Bridge Between Employers and Employees
        </p>
  


    <button
      onClick={StartHiring}
      style={{
        backgroundColor: '#fff',
        border: '2px solid #3498db',
        borderRadius: '20px',
        padding: '1rem 2rem',
        color: '#3498db',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginBottom: '3rem',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 6px 16px rgba(52, 152, 219, 0.4)';
        e.target.style.color = '#2980b9';
        e.target.style.borderColor = '#2980b9';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'none';
        e.target.style.color = '#3498db';
        e.target.style.borderColor = '#3498db';
      }}
    >
      Start Hiring
    </button>

        {/* Image Highlights */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            padding: '0 2rem',
            marginBottom: '4rem',
            flexWrap: 'wrap',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Team Discussion"
            style={{
              width: '250px',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '1rem',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="Interview"
            style={{
              width: '250px',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '1rem',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
      </main>

{/* Explore Roles Section */}
<section
  style={{
    width: '100%',
    maxWidth: '1200px',
    margin: '2rem auto',
    color: '#333',
    backgroundColor: '#fff',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <h2 style={{
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#1a1a1a'
  }}>
    Understand the Employee and Employer Perspectives
  </h2>
  <p style={{
    marginBottom: '2rem',
    fontSize: '1.1rem',
    textAlign: 'center',
    color: '#555'
  }}>
    Explore different roles through the eyes of employees and employers:
  </p>

  <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      overflowX: 'auto',
      paddingBottom: '1rem',
      scrollSnapType: 'x mandatory',
      scrollbarWidth: 'thin',
    }}
  >
    {[
  {
    title: 'Software Developer',
    employee: 'Seeks growth opportunities, work-life balance, and challenging projects.',
    employer: 'Looks for technical skills, teamwork, and reliability.',
    imgAlt: 'Software Developer',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
  },
  {
    title: 'Marketing Specialist',
    employee: 'Desires creativity, recognition, and clear goals.',
    employer: 'Values data-driven strategies, communication skills, and results.',
    imgAlt: 'Marketing Specialist',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
  },
  {
    title: 'Human Resources',
    employee: 'Wants a supportive environment and career development.',
    employer: 'Needs strong interpersonal skills and policy enforcement.',
    imgAlt: 'Human Resources',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/3099/3099086.png',
  },
  {
    title: 'Project Manager',
    employee: 'Aims for clear leadership roles and achievable deadlines.',
    employer: 'Seeks organization, risk management, and communication.',
    imgAlt: 'Project Manager',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
  },
  {
    title: 'Customer Support',
    employee: 'Looks for empathy, job stability, and growth.',
    employer: 'Values patience, problem-solving, and communication.',
    imgAlt: 'Customer Support',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/2099/2099079.png',
  },
  {
    title: 'Sales Executive',
    employee: 'Wants incentives, autonomy, and recognition.',
    employer: 'Focuses on targets, negotiation skills, and relationship building.',
    imgAlt: 'Sales Executive',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
  },
  {
    title: 'UI/UX Designer',
    employee: 'Seeks creative freedom, user-centric design challenges, and collaboration.',
    employer: 'Looks for attention to detail, usability expertise, and iterative design thinking.',
    imgAlt: 'UI/UX Designer',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/1822/1822969.png',
  },
  {
    title: 'Data Analyst',
    employee: 'Wants impactful projects, clear KPIs, and opportunities for insights-driven growth.',
    employer: 'Seeks accuracy, storytelling with data, and strategic thinking.',
    imgAlt: 'Data Analyst',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/4149/4149636.png',
  },
   {
    title: 'Frontend Developer',
    employee: 'Wants to work with design systems, user interactions, and modern frameworks.',
    employer: 'Looks for expertise in HTML, CSS, JavaScript, and responsive design.',
    imgAlt: 'Frontend Developer',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/1822/1822920.png',
  },
  {
    title: 'Backend Developer',
    employee: 'Desires autonomy, robust architecture challenges, and scalability problems.',
    employer: 'Seeks strong logic, API design, and database management skills.',
    imgAlt: 'Backend Developer',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
  },
  {
    title: 'Full Stack Developer',
    employee: 'Wants variety in tasks, continuous learning, and end-to-end responsibility.',
    employer: 'Looks for versatility across front and back-end, problem-solving, and adaptability.',
    imgAlt: 'Full Stack Developer',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
  },
  {
    title: 'DevOps Engineer',
    employee: 'Seeks automation opportunities, cross-team collaboration, and deployment challenges.',
    employer: 'Looks for CI/CD expertise, infrastructure knowledge, and reliability engineering.',
    imgAlt: 'DevOps Engineer',
    imgSrc: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png',
  }
].map(({ title, employee, employer, imgAlt, imgSrc }) => (
  <div
    key={title}
    style={{
      backgroundColor: '#f9f9f9',
      borderRadius: '1rem',
      padding: '1.5rem 1rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      textAlign: 'center',
      minWidth: '220px',
      flex: '0 0 auto',
      scrollSnapAlign: 'start',
      transition: 'transform 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      style={{ width: '60px', height: '60px', marginBottom: '1rem' }}
    />
    <h3 style={{ color: '#2575fc', marginBottom: '1rem', fontSize: '1.1rem' }}>{title}</h3>
    <p style={{ fontSize: '0.9rem', color: '#444' }}>{employee}</p>
    <p style={{ fontSize: '0.9rem', color: '#444', marginTop: '0.5rem' }}>{employer}</p>
  </div>
))}

  </div>
</section>

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
    About Us
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


{/* Join Us Section */}
<section
  style={{
    backgroundColor: '#f9fafb',
    color: '#111',
    padding: '4rem 2rem',
    textAlign: 'center',
  }}
>
  <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
    Join Us
  </h2>
  <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
    Whether you're an employer seeking exceptional talent or an employee looking for the perfect role, <strong>Employee Employer</strong> is your gateway to success.
  </p>
  <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
    Build your profile, connect with the right opportunities, and join a network where both sides grow together through smart matching and meaningful work.
  </p>
  <button
    onClick={() => navigate('/login')}
    style={{
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '1rem 2rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
    }}
  >
    Join the Platform
  </button>
</section>



      {/* Footer */}
       <footer
        ref={footerRef}
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
          <p>Hyderabad, Telangana - 50000.</p>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem' }}>📧</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Mailbox</h3>
          <p>@gmail.com</p>
          <div style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>
            <a href="#" aria-label="Twitter" style={{ margin: '0 0.5rem', color: '#fff' }}>𝕏</a>
            <a href="#" aria-label="Facebook" style={{ margin: '0 0.5rem', color: '#fff' }}>📘</a>
            <a href="#" aria-label="Instagram" style={{ margin: '0 0.5rem', color: '#fff' }}>📸</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem' }}>📞</div>
          <h3 style={{ marginTop: '0.5rem' }}>Our Phone</h3>
          <p>+91 </p>
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
          Copyright © 2025 . All Rights Reserved. | Designed by
          
        </p>
      </div>
    </div>
  );
};

export default Welcome;