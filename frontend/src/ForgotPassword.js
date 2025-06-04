import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState('employee'); // default role
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/forgot-password", {
        email,
        newPassword,
        role,
      });

      if (res.data.status === "success") {
        setMessage("Password reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("Something went wrong. Try again later.");
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

        {/* Close Button */}
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
          aria-label="Close Login Form"
          title="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1"><strong>New Password</strong></label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1"><strong>Role</strong></label>
            <select
              className="form-control rounded-0"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option>Select a Role</option>
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
  Submit
</button>

          {message && (
            <p className="text-center text-sm text-danger mt-3">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
