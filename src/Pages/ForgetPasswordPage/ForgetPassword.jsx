import React, { useRef, useState } from 'react';
import Welcome from '../../components/welcome/Welcome';
import './ForgetPassword.css';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import { Link } from 'react-router-dom';
export default function ForgetPassword() {
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
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

  const handleOtp = () => {
    setPassStatus(true);
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
              name="password"
              placeholder="Enter your Password"
            />
          )}
        </div>
        {!passStatus ? (
          <button className="fpbutton" onClick={handleOtp}>
            Send OTP
          </button>
        ) : (
          <button className="fpbutton">Confirm Password</button>
        )}
        <div className="loginline"></div>
        <span className="signupLink">
          Dont have Account? <Link to={'/register'}>Sign Up</Link>
        </span>
      </div>
      <WelcomeRight />
    </div>
  );
}
