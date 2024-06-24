import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Welcome from '../../components/welcome/Welcome';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import { loginUserAPI } from '../../api/loginregisterAPI';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/userSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function LoginPage() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!validateEmail(email)) {
      setSnackbar({ open: true, message: 'Invalid email format.', severity: 'error' });
      return;
    }

    if (!validatePassword(password)) {
      setSnackbar({ open: true, message: 'Password must be alphanumeric.', severity: 'error' });
      return;
    }

    try {
      const res = await loginUserAPI(email, password);

      localStorage.setItem('token', res.data.accessToken);
      dispatch(loginUser(res.data.user));
      setSnackbar({ open: true, message: 'Login successful', severity: 'success' });
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'Invalid Credentials....';
      if (error.response) {
        if (error.response.data.message === 'Auth failed, Invalid credentials') {
          errorMessage = 'Invalid Credentials....';
        } else if (error.response.data.message === 'Auth failed, Wrong password, please try again') {
          errorMessage = 'Invalid Credentials....';
        }
      } else {
        errorMessage = error.message;
      }
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginpage">
      <div className="loginleft">
        <Welcome />
        <form onSubmit={handleSubmit}>
          <div className="logininput">
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your mail"
            />
            <input
              type="password"
              required
              name="password"
              placeholder="Enter your Password"
            />
          </div>
          <Link to={'/forgotPassword'}>Forget password?</Link>
          <div className="loginbuttonContainer">
            <button className="loginbutton">Log in</button>
          </div>
          <div className="loginline"></div>
          <span className="signupLink">
            Don't have an account? <Link to={'/register'}>Sign Up</Link>
          </span>
        </form>
      </div>
      <WelcomeRight />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}