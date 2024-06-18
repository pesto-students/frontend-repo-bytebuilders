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
    } catch (error) {}
  };
  const handleConfirmPassword = async () => {
    try {
      console.log(otpInputs);
      const otp = otpInputs.join('');
      if (otp.length == 4 && data.email && data.password) {
        setData({ ...data, otp });
        const res = await confirmPassword(data);

        setError('');
      } else {
        setError('Please Fill All the Field');
      }
    } catch (error) {}
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
