import React, { useRef, useState } from 'react';
import Welcome from '../../components/welcome/Welcome';
import './ForgetPassword.css';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import { Link, useNavigate } from 'react-router-dom';
import {
  confirmPassword,
  setOTPAPI,
} from '../../api/forgetpasswordAPI';
export default function ForgetPassword() {
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    newPassword: '',
    otp: '',
  });
  const [passStatus, setPassStatus] = useState(false);
  const inputRefs = useRef([]);
  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputChange = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    focusNextInput(index);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleOtp = async () => {
    try {
      console.log(data.email);
      if (data.email) {
        const res = await setOTPAPI(data.email);
        setPassStatus(true);
        setError('');
      } else {
        setError('Please Enter Mail');
      }
    } catch (error) {
      if (error.response.message === 'Failed to send OTP') {
        setError('Please try again....');
      }
    }
  };
  const handleConfirmPassword = async () => {
    try {
      const otp = otpInputs.join(''); // Combine OTP inputs into a single string

      // Check if OTP, email, and password are provided
      if (otp !== '' && data.email !== '' && data.password !== '') {
        // Update data object with OTP
        data.otp = otp;
        setData({ ...data, otp });

        // Call the confirmPassword function with the updated data
        const res = await confirmPassword(data);

        // Clear any previous error messages
        setError('');

        // Navigate to the login page on success
        navigate('/login');
      } else {
        // Set error if any field is missing
        setError('Please fill all the fields');
      }
    } catch (error) {
      console.log(error);

      // Check if the error has a response property
      if (error.response) {
        const message = error.response.message;
        if (message === 'Invalid OTP') {
          setError('Please use correct OTP.');
        } else if (message === 'Failed to confirm OTP') {
          setError('Failed to confirm OTP, please try again.');
        } else {
          setError('Something went wrong, please try again.');
        }
      } else {
        // Set a generic error message for unexpected errors
        setError('Something went wrong, please try again.');
      }
    }
  };
  return (
    <div className="forgetpassword">
      <div className="fpleft">
        <Welcome />
        <div className="fpinputContainer">
          <input
            className="fpinput"
            type="text"
            name="email"
            value={data.email}
            onChange={handleOnchange}
            placeholder="Enter your mail"
          />
          {
            <div className="otpContainer">
              {passStatus &&
                otpInputs.map((digit, index) => (
                  <input
                    className="otpinput"
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value)
                    }
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
            </div>
          }
          {passStatus && (
            <input
              className="fpinput"
              type="password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleOnchange}
              placeholder="Enter your Password"
            />
          )}
        </div>
        {!passStatus ? (
          <button className="fpbutton" onClick={handleOtp}>
            Send OTP
          </button>
        ) : (
          <button
            className="fpbutton"
            onClick={handleConfirmPassword}
          >
            Confirm Password
          </button>
        )}
        {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
        <div className="loginline"></div>
        <span className="signupLink">
          Dont have Account? <Link to={'/register'}>Sign Up</Link>
        </span>
      </div>
      <WelcomeRight />
    </div>
  );
}
