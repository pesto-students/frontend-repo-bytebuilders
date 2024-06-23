import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Welcome from '../../components/welcome/Welcome';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import { loginUserAPI } from '../../api/loginregisterAPI';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/userSlice';
export default function LoginPage() {
  const [error, setError] = useState('');
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');

    const password = formData.get('password');

    try {
      const res = await loginUserAPI(email, password);

      localStorage.setItem('token', res.data.accessToken);
      console.log('res', res.data);
      dispatch(loginUser(res.data.user));
      setError('');
      console.log('In Login');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        if (
          error.response.message ===
          'Auth failed, Invalid credentials'
        ) {
          setError('Invalid Credentials....');
        } else if (
          error.response.message ===
          'Auth failed, Wrong password, please try again'
        ) {
          setError('Invalid Credentials....');
        } else {
          setError('Invalid Credentials....');
        }
      } else {
        setError(error.message);
      }
    }
  };
  const verifyIsAuthentivcated = () => {};
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, []);
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
          <Link to={'/forgotPassword'}>forget password</Link>
          <div className="loginbuttonContainer">
            <button className="loginbutton">Log in</button>
          </div>
          {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
          <div className="loginline"></div>
          <span className="signupLink">
            Dont have Account? <Link to={'/register'}>Sign Up</Link>
          </span>
        </form>
      </div>
      <WelcomeRight />
    </div>
  );
}
