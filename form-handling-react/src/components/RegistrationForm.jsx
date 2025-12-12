import React, { useState } from 'react';
import './RegistrationForm.css'; // Optional styling file

const RegistrationForm = () => {
  // State for individual form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'username':
        setUsername(value);
        if (errors.username) setErrors({...errors, username: ''});
        break;
      case 'email':
        setEmail(value);
        if (errors.email) setErrors({...errors, email: ''});
        break;
      case 'password':
        setPassword(value);
        if (errors.password) setErrors({...errors, password: ''});
        break;
      default:
        break;
    }
  };

  // Validation function with EXACT requested patterns
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check if fields are empty - using EXACT requested patterns
    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Optional email format validation
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      // Optional password length validation
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted successfully:', { username, email, password });
      
      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
      setErrors({
        username: '',
        email: '',
        password: ''
      });
      setIsSubmitted(true);
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } else {
      console.log('Form validation failed');
    }
  };

  // Handle form reset
  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setErrors({
      username: '',
      email: '',
      password: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="registration-form-container">
      <h2>User Registration</h2>
      
      {isSubmitted && (
        <div className="success-message">
          Registration successful! ✅
        </div>
      )}
      
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            className={errors.username ? 'error' : ''}
            placeholder="Enter your username"
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Register
          </button>
          <button type="reset" className="reset-btn">
            Clear
          </button>
        </div>
      </form>
      
      {/* Display form data for debugging (optional) */}
      <div className="form-data-preview">
        <h4>Current Form Data:</h4>
        <p>
          <strong>Username:</strong> {username || '(empty)'}<br />
          <strong>Email:</strong> {email || '(empty)'}<br />
          <strong>Password:</strong> {password ? '••••••' : '(empty)'}
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;