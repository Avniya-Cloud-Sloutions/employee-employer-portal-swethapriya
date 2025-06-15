import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // added role with default value
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    setSuccessMsg('');

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:5000/signup', values)
        .then(res => {
          console.log(res.data);
          if (res.data.status === "success") {
            setSuccessMsg('Signup successful! Redirecting...');
            setTimeout(() => {
              navigate('/welcome');
            }, 1500);
          } else {
            alert("Signup failed");
          }
        })
        .catch(err => {
          console.error(err);
          alert("Error during signup");
        });
    }
  };

  return (
        <div
  className="d-flex justify-content-center align-items-center vh-100"
  style={{
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
  }}
>






<div className="bg-white p-4 rounded w-20 w-sm-30 w-md-50 w-lg-125 position-relative">


        {/* Cross Button */}
        <button
          onClick={() => navigate('/welcome')}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#333',
          }}
          aria-label="Close Signup Form"
          title="Close"
        >
          &times;
        </button>

        <h2 className="mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              name="name"
              className="form-control rounded-0"
              value={values.name}
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              className="form-control rounded-0"
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control rounded-0"
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              className="form-control rounded-0"
              value={values.confirmPassword}
              onChange={handleInput}
            />
            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
          </div>

          {/* Role selection dropdown */}
          <div className="mb-3">
            <label htmlFor="role"><strong>Role</strong></label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleInput}
              className="form-select rounded-0"
            >
              <option>Select a role</option>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
          </div>

                  <button
  type="submit"
  className="w-100 mb-3 text-white border-0"
  style={{
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    padding: '10px',
    borderRadius: '4px',
    fontWeight: 'bold',
  }}
>
  Sign Up
</button>

 {successMsg && <p className="text-success text-center">{successMsg}</p>}

          <p className="text-center small">
            Already have an account?{' '}
            <Link to="/login" className="btn btn-outline-secondary w-100 rounded-0 text-decoration-none">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
