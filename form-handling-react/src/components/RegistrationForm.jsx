import React, { useState } from 'react';
import './RegistrationForm.css'; // Optional styling file

const RegistrationForm = () => {
  // State for individual form fields (as requested)
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
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Clear error when user starts typing
    if (errors.username) {
      setErrors({
        ...errors,
        username: ''
      });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({
        ...errors,
        email: ''
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({
        ...errors,
        password: ''
      });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check if fields are empty
    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Basic email format validation (optional)
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      // Additional password validation (optional)
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
      const formData = {
        username,
        email,
        password
      };
      
      console.log('Form submitted successfully:', formData);
      
      // In a real application, you would send data to an API here
      // Example: await api.register(formData);
      
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
            value={username}  // Required value attribute
            onChange={handleUsernameChange}
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
            value={email}  // Required value attribute
            onChange={handleEmailChange}
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
            value={password}  // Required value attribute
            onChange={handlePasswordChange}
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