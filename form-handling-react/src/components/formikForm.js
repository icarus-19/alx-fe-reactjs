import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './formikForm.css';

const FormikForm = () => {
  // Define initial values
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    terms: false
  };

  // Define validation schema using Yup with string().required() for each field
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    
    age: Yup.number()
      .min(18, 'You must be at least 18 years old')
      .max(100, 'Age must be 100 or less')
      .required('Age is required'),
    
    gender: Yup.string()
      .required('Gender is required'),
    
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions')
  });

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    
    // Simulate API call
    setTimeout(() => {
      alert('Form submitted successfully!');
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="formik-form-container">
      <h2>User Registration Form (Formik)</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                className={`form-control ${errors.username && touched.username ? 'error' : ''}`}
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email && touched.email ? 'error' : ''}`}
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password && touched.password ? 'error' : ''}`}
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            {/* Age Field */}
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <Field
                type="number"
                id="age"
                name="age"
                className={`form-control ${errors.age && touched.age ? 'error' : ''}`}
                placeholder="Enter age"
              />
              <ErrorMessage name="age" component="div" className="error-message" />
            </div>

            {/* Gender Field (Select Dropdown) */}
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className={`form-control ${errors.gender && touched.gender ? 'error' : ''}`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="error-message" />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <Field
                  type="checkbox"
                  name="terms"
                  className={`checkbox-input ${errors.terms && touched.terms ? 'error' : ''}`}
                />
                I agree to the Terms and Conditions
              </label>
              <ErrorMessage name="terms" component="div" className="error-message" />
            </div>

            {/* Form Buttons */}
            <div className="form-buttons">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button type="reset" className="reset-btn">
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;