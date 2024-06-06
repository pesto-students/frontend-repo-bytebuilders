import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Welcome from '../../components/welcome/Welcome';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import apiRequest from '../../api/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { userdata } from '../../dummyData/dummyUser';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/userSlice';
export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { updateUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');

    const password = formData.get('password');
    //console.log(email, password);
    //await updateUser(userdata);
    try {
      const res = await apiRequest.post('login', {
        email,
        password,
      });
      //console.log(res.data.refreshToken);
      localStorage.setItem('token', res.data.refreshToken);
      dispatch(loginUser(res.data.user));
      navigate('/dashboard');
    } catch (error) {}
  };
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
