import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (vals) => {
    const errs = {};
    if (!vals.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(vals.email)) errs.email = 'Email is invalid';

    if (!vals.password) errs.password = 'Password is required';
    else if (vals.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (!vals.role) errs.role = 'Role is required';

    return errs;
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:5000/login', values)
        .then((res) => {
          if (res.data.status === 'success') {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('role', values.role); // optionally store role

            alert('Login successful!');
            if (values.role === 'employee') {
              navigate('/employee-profile');
            } else {
              navigate('/employer-dashboard');
            }
          } else {
            alert('Invalid credentials. Please try again.');
          }
        })
        .catch((err) => {
          console.error('Login error:', err);
          alert('Something went wrong. Please try again.');
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

      <div className="bg-white p-4 rounded w-25 position-relative">

        <button
          onClick={() => navigate('/')}
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
          aria-label="Close Login Form"
          title="Close"
        >
          &times;
        </button>

        <h2 className="mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleInput}
              className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleInput}
              className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Role Dropdown */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label"><strong>Role</strong></label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleInput}
              className={`form-select rounded-0 ${errors.role ? 'is-invalid' : ''}`}
            >

              <option  value="Select a Role">Select a role</option>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Submit Button */}
      
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
  Log in
</button>


          <p className="text-center small">
            By logging in, you agree to our terms and conditions.
          </p>


           {/* Forgot Password Link */}
        <div className="mb-3 d-flex justify-content-center">
  <Link to="/forgot-password" className="small text-decoration-none text-primary">
    Forgot Password?
  </Link>
</div>

          <Link to="/signup" className="btn btn-outline-secondary w-100 rounded-0">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
