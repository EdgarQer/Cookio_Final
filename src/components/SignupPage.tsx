import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const SignupPage: React.FC = () => {
  const [user, setUser] = useState<User>({ firstName: '', lastName: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "user",
        password: user.password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/auth/login'), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setErrorMessage("Unable to connect to the server. Please try again.");
      }
      console.error(err);
    }
  };
  return (
    <div className="signup-page">
      <h1>Sign Up for Cookio</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={user.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default SignupPage;